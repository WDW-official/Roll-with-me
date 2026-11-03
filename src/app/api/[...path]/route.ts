import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";
import mongoose from "mongoose";
import { z } from "zod";
import { api, body, live } from "@/lib/http";
import { requireUser, createSession } from "@/lib/auth";
import { User, Session, Intake, Provider, Content, Booking, ForumPost, Study, SurveyResponse, Audit, Area, Media, Grant } from "@/lib/models";
import { audit, checkPassword, passwordHash, encrypt, decrypt, hash, rateLimit, HttpError } from "@/lib/security";
import { authSchema, signupSchema, askSchema, providerSchema, bookingInput, forumInput, studyInput, ageBand } from "@/lib/validation";
import { consentVersion, publishableGuide, publishableOpportunity } from "@/lib/policy";
import { bookEvent, consentToBooking } from "@/lib/bookings";
import { publishStudy, respondToStudy, exportStudy } from "@/lib/surveys";
import { signUpload, completeUpload, deleteMedia, mediaDelivery } from "@/lib/media";
import { legalSources } from "@/lib/data";
import { validateContent } from "@/lib/content-validation";
import type { Role } from "@/lib/types";
import { env } from "@/lib/env";
import { supportTeam, supportNoticeVersion } from "@/lib/structure";
import { referralRecordError } from "@/lib/support-policy";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const objectId = z.string().regex(/^[a-f\d]{24}$/i);
type Context = {
  params: Promise<{
    path: string[];
  }>;
};
async function post(req: Request, path: string[]) {
  const input = await body(req);
  await live();
  const route = path.join("/");
  if (route === "auth/sign-up") {
    const data = signupSchema.parse(input);
    await rateLimit("signup-global", 50);
    await rateLimit("signup:" + data.email, 3);
    if (await User.exists({
      email: data.email
    })) throw new HttpError(409, "Unable to create an account with those details. Try signing in.");
    const user = await User.create({
      email: data.email,
      passwordHash: passwordHash(data.password),
      displayName: data.displayName,
      ageBand: data.ageBand,
      role: data.ageBand === "adult" ? "parent_pending" : "participant",
      consents: [{
        purpose: "account_privacy_notice",
        version: consentVersion,
        granted: true,
        at: new Date()
      }]
    });
    await createSession(String(user._id));
    await audit(String(user._id), "account.created", "user", String(user._id));
    return {
      message: "Your account is ready.",
      redirect: "/account"
    };
  }
  if (route === "auth/sign-in") {
    const data = authSchema.parse(input);
    await rateLimit("signin-global", 500);
    await rateLimit("signin:" + data.email, 10);
    const user = await User.findOne({
      email: data.email,
      disabledAt: {
        $exists: false
      }
    }).select("+passwordHash");
    const valid = checkPassword(data.password, user?.passwordHash ?? "dummy-salt:" + "0".repeat(128));
    if (!user || !valid) throw new HttpError(401, "Those details couldn’t be verified.");
    await createSession(String(user._id));
    await audit(String(user._id), "account.signed_in", "user", String(user._id));
    return {
      redirect: "/account"
    };
  }
  if (route === "auth/sign-out") {
    const token = (await cookies()).get("rwm_session")?.value;
    if (token) await Session.deleteOne({
      tokenHash: hash(token)
    });
    (await cookies()).delete("rwm_session");
    return {
      redirect: "/"
    };
  }
  if (route === "ask") {
    if (env.INTAKE_ENABLED !== "true") throw new HttpError(503, "RWM questions are not open yet. Nothing has been submitted. Please use the trusted support routes on our Help page.");
    if (!(await User.exists({
      role: "safeguarding",
      disabledAt: {
        $exists: false
      }
    }))) throw new HttpError(503, "Support intake is currently unavailable. Nothing has been submitted. Please use the trusted support routes on our Help page.");
    const data = askSchema.parse(input);
    await rateLimit("intake-global", 100);
    const reference = `RWM-${randomBytes(6).toString("hex").toUpperCase()}`;
    const record = await Intake.create({
      reference,
      requester: data.requester,
      relationship: data.requester === "parent_carer" ? data.relationship : undefined,
      context: data.context,
      borough: data.borough || undefined,
      targetTeam: supportTeam(data.topic),
      replyRequested: data.replyRequested,
      followUpStatus: data.replyRequested ? "requested" : "no_reply_requested",
      contactPreferencesEncrypted: data.replyRequested ? encrypt(JSON.stringify({
        safeToEmail: data.safeToEmail,
        note: data.contactNote
      })) : undefined,
      topic: data.topic,
      ageBand: data.ageBand,
      messageEncrypted: encrypt(data.message),
      replyEmailEncrypted: data.replyRequested && data.replyEmail ? encrypt(data.replyEmail) : undefined,
      privacyVersion: supportNoticeVersion,
      publicationConsent: data.publicationConsent,
      retentionReviewAt: new Date(Date.now() + 90 * 86400000)
    });
    await audit(undefined, "intake.received", "intake", String(record._id), {
      reference,
      team: supportTeam(data.topic)
    });
    return {
      reference,
      message: data.replyRequested ? "Your request has been received for human review. You asked for an email reply. No response time or completed referral is promised by this receipt. In immediate danger call 999." : "Your request has been received for human review. Without reply details the team cannot contact you directly. In immediate danger call 999."
    };
  }
  if (route === "providers") {
    const user = await requireUser();
    const data = providerSchema.parse(input);
    await rateLimit("provider:" + user._id, 5);
    const provider = await Provider.create({
      name: data.name,
      officialUrl: data.officialUrl,
      contactEmail: data.contactEmail,
      safeguardingPolicyUrl: data.policyUrl,
      description: data.description,
      ownerId: user._id
    });
    await audit(String(user._id), "provider.submitted", "provider", String(provider._id));
    return {
      message: "Your submission is awaiting manual review. It is not publicly listed."
    };
  }
  if (route === "bookings") {
    const user = await requireUser(["participant"]);
    const data = bookingInput.parse(input);
    await rateLimit("booking:" + user._id, 10);
    try {
      return await bookEvent({
        id: String(user._id),
        ageBand: user.ageBand
      }, data);
    } catch (e) {
      if ((e as {
        code?: number;
      }).code === 11000) throw new HttpError(409, "You have already registered for this session.");
      throw e;
    }
  }
  if (route === "consents") {
    const user = await requireUser(["parent_verified"]);
    const data = z.object({
      code: z.string().regex(/^[a-f0-9]{48}$/),
      consentAccepted: z.literal(true)
    }).parse(input);
    return consentToBooking(String(user._id), data.code);
  }
  if (route === "booking-action") {
    const user = await requireUser();
    const data = z.object({
      id: objectId,
      action: z.enum(["cancel", "feedback"]),
      rating: z.number().int().min(1).max(5).optional(),
      comment: z.string().max(1000).optional()
    }).parse(input);
    await mongoose.connection.transaction(async session => {
      const booking = await Booking.findOne({
        _id: data.id,
        userId: user._id
      }).session(session);
      if (!booking) throw new HttpError(404, "Booking not found.");
      if (data.action === "feedback") {
        if (booking.status !== "attended" || !data.rating) throw new HttpError(400, "Feedback is available after attendance.");
        booking.feedback = {
          rating: data.rating,
          comment: data.comment ?? ""
        };
      } else {
        if (!["confirmed", "waiting", "pending_consent"].includes(booking.status)) throw new HttpError(409, "This booking cannot be cancelled.");
        if (booking.status === "confirmed") await Content.updateOne({
          _id: booking.eventId,
          "data.booked": {
            $gt: 0
          }
        }, {
          $inc: {
            "data.booked": -1
          }
        }, {
          session
        });
        booking.status = "cancelled";
        booking.emergencyContactEncrypted = undefined;
        booking.consentTokenHash = undefined;
      }
      await booking.save({
        session
      });
    });
    await audit(String(user._id), "booking." + data.action, "booking", data.id);
    return {
      message: data.action === "cancel" ? "Your booking has been cancelled. Waiting-list promotion requires staff review." : "Thank you. Your feedback is private and has been recorded."
    };
  }
  if (route === "account/consents") {
    const user = await requireUser();
    const data = z.object({
      purpose: z.enum(["research_invites"]),
      granted: z.boolean()
    }).parse(input);
    await User.updateOne({
      _id: user._id
    }, {
      $push: {
        consents: {
          ...data,
          version: consentVersion,
          at: new Date()
        }
      }
    });
    await audit(String(user._id), "consent.updated", "user", String(user._id), data);
    return {
      message: "Your preference has been saved."
    };
  }
  if (route === "account/deletion-request") {
    const user = await requireUser();
    await audit(String(user._id), "account.deletion_requested", "user", String(user._id));
    return {
      message: "Your request has been recorded for staff review. Legal retention duties may affect deletion; no data has been automatically erased."
    };
  }
  if (route === "forum") {
    const user = await requireUser(["parent_verified"]);
    const data = forumInput.parse(input);
    await rateLimit("forum:" + user._id, 10);
    await ForumPost.create({
      authorId: user._id,
      category: data.category,
      title: data.title,
      body: data.body
    });
    return {
      message: "Your post is in the moderation queue. It is not public."
    };
  }
  if (path[0] === "forum" && path.length === 2) {
    const user = await requireUser(["parent_verified"]);
    const id = objectId.parse(path[1]);
    const data = z.object({
      action: z.enum(["report", "block"]),
      reason: z.string().max(500).default("")
    }).parse(input);
    if (data.action === "block") await ForumPost.updateOne({
      _id: id
    }, {
      $addToSet: {
        blockedBy: user._id
      }
    });else await ForumPost.updateOne({
      _id: id
    }, {
      $push: {
        reports: {
          reporterId: user._id,
          reason: data.reason,
          at: new Date()
        }
      }
    });
    return {
      message: data.action === "block" ? "This post is hidden from your view." : "Your report is awaiting human review."
    };
  }
  if (path[0] === "surveys" && path.length === 2) {
    const data = z.object({
      versionId: objectId,
      ageBand,
      answers: z.unknown(),
      consentAccepted: z.literal(true)
    }).parse(input);
    await rateLimit("survey-global:" + path[1], 1000);
    return respondToStudy(path[1], data);
  }
  if (route === "survey-withdrawal") {
    const data = z.object({
      code: z.string().regex(/^[a-f0-9]{48}$/)
    }).parse(input);
    await rateLimit("withdrawal-global", 100);
    await SurveyResponse.updateOne({
      withdrawalTokenHash: hash(data.code)
    }, {
      $set: {
        withdrawalRequestedAt: new Date()
      }
    });
    return {
      message: "If the code matches a response, a withdrawal request has been recorded. Staff will apply the study’s withdrawal and retention policy."
    };
  }
  if (route === "media/sign") {
    const user = await requireUser(["editor", "admin"]);
    const data = z.object({
      consentReference: z.string().min(3).max(200),
      rightsConfirmed: z.literal(true)
    }).parse(input);
    return signUpload(String(user._id), data.consentReference);
  }
  if (route === "media/complete") {
    const user = await requireUser(["editor", "admin"]);
    const data = z.object({
      id: objectId
    }).parse(input);
    return completeUpload(data.id, String(user._id));
  }
  if (route === "checkout") throw new HttpError(503, "Checkout is not enabled. No payment has been taken.");
  if (path[0] === "admin") return adminMutation(path[1], input);
  throw new HttpError(404, "Action not found.");
}
async function adminMutation(section: string, input: unknown) {
  const base = z.object({
    action: z.string(),
    id: objectId.optional()
  }).parse(input);
  if (section === "content" || section === "opportunities") {
    const user = await requireUser(["editor", "admin", "safeguarding", "legal_reviewer"]);
    if (base.action === "save") {
      if (!["editor", "admin"].includes(user.role)) throw new HttpError(403, "Editorial permission is required.");
      const data = z.object({
        id: objectId.optional(),
        kind: z.enum(["story", "opportunity", "guide", "event", "challenge"]),
        slug: z.string().regex(/^[a-z0-9-]{3,120}$/),
        title: z.string().min(3).max(200),
        data: z.record(z.string(), z.unknown()),
        reason: z.string().min(5).max(300)
      }).parse(input);
      const protectedKeys = ["reviewer", "reviewerQualified", "reviewedAt", "nextReviewAt", "editorialApproved", "safeguardingApproved", "releaseApproved", "verified", "riskAssessmentApproved", "booked"];
      const clean: Record<string, unknown> = {
        ...validateContent(data.kind, Object.fromEntries(Object.entries(data.data).filter(([key]) => !protectedKeys.includes(key)))),
        booked: 0
      };
      const values = {
        kind: data.kind,
        slug: data.slug,
        title: data.title,
        data: clean,
        status: "draft",
        demo: false
      };
      const doc = await (async () => {
        if (base.id) {
          const existing = await Content.findById(base.id);
          if (!existing) throw new HttpError(404, "Content not found.");
          if (existing.kind === "opportunity" && existing.data.booked > 0) throw new HttpError(409, "An event with bookings requires an operational change and notification workflow. Editing is locked.");
          existing.set(values);
          existing.revisions.push({
            actor: user._id,
            at: new Date(),
            reason: data.reason,
            snapshotHash: hash(JSON.stringify(values))
          });
          await existing.save();
          return existing;
        }
        return Content.create({
          ...values,
          revisions: [{
            actor: user._id,
            reason: data.reason,
            snapshotHash: hash(JSON.stringify(values))
          }]
        });
      })();
      if (!doc) throw new HttpError(404, "Content not found.");
      await audit(String(user._id), "content.saved", "content", String(doc._id));
      return {
        message: "Draft saved. All approvals have been reset.",
        id: String(doc._id)
      };
    }
    const id = objectId.parse(base.id);
    const doc = await Content.findById(id);
    if (!doc) throw new HttpError(404, "Content not found.");
    if (base.action === "legal-review") {
      if (user.role !== "legal_reviewer" || !user.qualificationVerified || doc.kind !== "guide") throw new HttpError(403, "A verified qualified legal reviewer is required.");
      const data = z.object({
        nextReviewAt: z.iso.datetime()
      }).parse(input);
      if (new Date(data.nextReviewAt) <= new Date()) throw new HttpError(400, "A future review date is required.");
      if (!Array.isArray(doc.data.sourceIds) || !doc.data.sourceIds.length || doc.data.sourceIds.some((s: string) => !legalSources.some(l => l.id === s))) throw new HttpError(400, "Approved legal source registry IDs are required.");
      doc.data = {
        ...doc.data,
        reviewer: String(user._id),
        reviewerQualified: true,
        reviewedAt: new Date().toISOString(),
        nextReviewAt: data.nextReviewAt,
        sources: doc.data.sourceIds
      };
    } else if (base.action === "safeguarding-review") {
      if (user.role !== "safeguarding") throw new HttpError(403, "A safeguarding officer must perform this review.");
      const data = z.object({
        riskAssessmentApproved: z.literal(true),
        releaseApproved: z.boolean().default(false)
      }).parse(input);
      doc.data = {
        ...doc.data,
        safeguardingApproved: true,
        riskAssessmentApproved: data.riskAssessmentApproved,
        releaseApproved: data.releaseApproved,
        verified: doc.kind === "opportunity",
        safeguardingReviewer: String(user._id)
      };
    } else if (base.action === "publish") {
      if (!["editor", "admin", "legal_reviewer"].includes(user.role)) throw new HttpError(403, "Publication permission required.");
      if (doc.kind === "guide" && !publishableGuide({
        status: "published",
        ...doc.data
      })) throw new HttpError(409, "A current qualified legal review and sources are required.");
      if (doc.kind === "opportunity") {
        const provider = await Provider.findById(doc.data.providerId);
        if (!publishableOpportunity({
          status: "published",
          ...doc.data,
          providerVerified: provider?.verified,
          demo: doc.demo
        })) throw new HttpError(409, "Provider, safeguarding, activity risk assessment and recent listing checks are required.");
      }
      if (doc.kind === "story" && (!doc.data.safeguardingApproved || !doc.data.releaseApproved || !doc.data.contentNote || !doc.data.transcript || !doc.data.permissionReference)) throw new HttpError(409, "Story release, safeguarding review, content note, transcript and permission record required.");
      if (doc.kind === "event" || doc.kind === "challenge") throw new HttpError(409, "Use reviewed opportunity records for V1 sessions. Standalone event/challenge publication is disabled.");
      doc.data = {
        ...doc.data,
        editorialApproved: true
      };
      doc.status = "published";
    } else if (base.action === "unpublish") {
      if (!["editor", "admin"].includes(user.role)) throw new HttpError(403, "Editorial permission required.");
      doc.status = "draft";
    } else throw new HttpError(400, "Unknown content action.");
    doc.revisions.push({
      actor: user._id,
      at: new Date(),
      reason: base.action,
      snapshotHash: hash(JSON.stringify(doc.data))
    });
    await doc.save();
    await audit(String(user._id), "content." + base.action, "content", id);
    return {
      message: "Review state updated.",
      status: doc.status
    };
  }
  if (section === "partners") {
    const user = await requireUser(["safeguarding"]);
    const data = z.object({
      id: objectId,
      safeguardingPolicyChecked: z.literal(true),
      riskAssessmentChecked: z.literal(true),
      eligibilityChecks: z.enum(["appropriate_checks_verified", "not_applicable_reviewed"])
    }).parse(input);
    const {
      id,
      ...checks
    } = data;
    const provider = await Provider.findByIdAndUpdate(id, {
      $set: {
        ...checks,
        verified: true,
        reviewedBy: user._id,
        reviewedAt: new Date()
      }
    }, {
      new: true
    });
    if (!provider) throw new HttpError(404, "Provider not found.");
    await audit(String(user._id), "provider.verified", "provider", data.id);
    return {
      message: "Provider verified. Each activity still needs its own approval."
    };
  }
  if (section === "safeguarding") {
    const user = await requireUser(["safeguarding"]);
    const data = z.object({
      id: objectId,
      action: z.enum(["claim", "update", "record-referral"]),
      risk: z.enum(["routine", "concern", "urgent"]).optional(),
      status: z.enum(["triaged", "closed"]).optional(),
      targetTeam: z.enum(["general", "legal_information", "careers_pathways", "activities", "safeguarding", "editorial"]).optional(),
      followUpStatus: z.enum(["requested", "reply_recorded", "referral_discussed"]).optional(),
      partnerName: z.string().trim().min(2).max(200).optional(),
      referralBasis: z.enum(["participant_consent", "safeguarding_duty"]).optional(),
      consentConfirmed: z.boolean().optional(),
      notes: z.string().max(3000).optional()
    }).parse(input);
    const intake = await Intake.findById(data.id);
    if (!intake) throw new HttpError(404, "Case not found.");
    if (data.action === "claim") {
      const claimed = await Intake.findOneAndUpdate({
        _id: data.id,
        assignedTo: null
      }, {
        $set: {
          assignedTo: user._id
        }
      });
      if (!claimed) throw new HttpError(409, "This case is already assigned.");
    } else {
      if (String(intake.assignedTo) !== String(user._id)) throw new HttpError(403, "Only the assigned officer may update this case.");
      if (data.action === "record-referral") {
        const referralError = referralRecordError(data);
        if (referralError) throw new HttpError(400, referralError);
        intake.referralEncrypted = encrypt(JSON.stringify({
          partnerName: data.partnerName,
          basis: data.referralBasis,
          consentConfirmed: data.consentConfirmed === true,
          noticeVersion: supportNoticeVersion,
          recordedBy: String(user._id),
          at: new Date().toISOString()
        }));
        intake.status = "referred";
        intake.followUpStatus = "referral_discussed";
      }
      if (data.risk) intake.risk = data.risk;
      if (data.status && data.action === "update") intake.status = data.status;
      if (data.targetTeam) intake.targetTeam = data.targetTeam;
      if (data.followUpStatus && data.action === "update") intake.followUpStatus = data.followUpStatus;
      intake.actions.push({
        actor: user._id,
        at: new Date(),
        action: data.action === "record-referral" ? "referral_recorded" : data.followUpStatus ?? data.status ?? "note",
        notesEncrypted: encrypt(data.notes ?? "")
      });
      await intake.save();
    }
    await audit(String(user._id), "case." + data.action, "intake", data.id);
    return {
      message: "Case action recorded. This action does not send an email or transmit a referral. Staff must complete the appropriate human follow-up. High-risk cases require escalation outside this site."
    };
  }
  if (section === "moderation") {
    const user = await requireUser(["moderator"]);
    const data = z.object({
      id: objectId,
      status: z.enum(["approved", "rejected", "removed"])
    }).parse(input);
    await ForumPost.updateOne({
      _id: data.id
    }, {
      $set: {
        status: data.status,
        reviewedBy: user._id,
        reviewedAt: new Date()
      }
    });
    await audit(String(user._id), "forum." + data.status, "forum", data.id);
    return {
      message: "Moderation decision recorded."
    };
  }
  if (section === "surveys") {
    const user = await requireUser(["researcher"]);
    if (base.action === "save") {
      const data = studyInput.parse(input);
      const doc = await Study.create({
        ...data,
        status: "draft"
      });
      await audit(String(user._id), "study.created", "study", String(doc._id));
      return {
        message: "Draft study created.",
        id: String(doc._id)
      };
    }
    const id = objectId.parse(base.id);
    if (base.action === "publish") return publishStudy(id, String(user._id));
    if (base.action === "close") {
      await Study.updateOne({
        _id: id
      }, {
        $set: {
          status: "closed"
        }
      });
      await audit(String(user._id), "study.closed", "study", id);
      return {
        message: "Study closed. Published versions remain immutable."
      };
    }
    throw new HttpError(400, "Unknown study action.");
  }
  if (section === "areas") {
    const user = await requireUser(["editor", "admin"]);
    const data = z.object({
      borough: z.string().min(2).max(100),
      zones: z.array(z.enum(["North", "South", "East", "West"])).min(1)
    }).parse(input);
    await Area.updateOne({
      borough: data.borough
    }, {
      $set: {
        ...data,
        editedBy: user._id
      }
    }, {
      upsert: true,
      runValidators: true
    });
    await audit(String(user._id), "area.updated", "area", data.borough);
    return {
      message: "Borough browsing assignments updated."
    };
  }
  if (section === "media") {
    const user = await requireUser(["editor", "admin"]);
    const data = z.object({
      id: objectId,
      action: z.enum(["approve", "reject", "delete"])
    }).parse(input);
    if (data.action === "delete") return deleteMedia(data.id, String(user._id));
    await Media.updateOne({
      _id: data.id,
      status: "pending_review"
    }, {
      $set: {
        status: data.action === "approve" ? "approved" : "rejected",
        reviewedBy: user._id
      }
    });
    await audit(String(user._id), "media." + data.action, "media", data.id);
    return {
      message: "Media review recorded."
    };
  }
  if (section === "grants") {
    const user = await requireUser(["admin"]);
    const data = z.object({
      name: z.string().min(3).max(200),
      funder: z.string().max(200),
      amountPence: z.number().int().nonnegative(),
      restrictedPurpose: z.string().max(2000)
    }).parse(input);
    await Grant.create(data);
    await audit(String(user._id), "grant.created", "grant", data.name);
    return {
      message: "Grant record created."
    };
  }
  if (section === "attendance") {
    const user = await requireUser(["operations"]);
    const data = z.object({
      id: objectId
    }).parse(input);
    const booking = await Booking.findOneAndUpdate({
      _id: data.id,
      status: "confirmed"
    }, {
      $set: {
        status: "attended",
        checkedInBy: user._id,
        checkedInAt: new Date()
      }
    });
    if (!booking) throw new HttpError(409, "Only a confirmed booking can be checked in.");
    await audit(String(user._id), "booking.checked_in", "booking", data.id);
    return {
      message: "Attendance recorded."
    };
  }
  throw new HttpError(404, "Admin action not found.");
}
export async function POST(req: Request, ctx: Context) {
  return api(async () => post(req, (await ctx.params).path));
}
export async function GET(req: Request, ctx: Context) {
  return api(async () => {
    await live();
    const path = (await ctx.params).path;
    const route = path.join("/");
    if (route === "forum") {
      const user = await requireUser(["parent_verified"]);
      const docs = await ForumPost.find({
        status: "approved",
        blockedBy: {
          $ne: user._id
        }
      }).select("+body -reports -blockedBy -authorId").sort({
        createdAt: -1
      }).limit(50).lean();
      return {
        posts: docs
      };
    }
    if (path[0] === "media" && path.length === 2) {
      const doc = await Media.findOne({
        _id: objectId.parse(path[1]),
        status: "approved"
      }).lean();
      if (!doc) throw new HttpError(404, "Media not available.");
      return {
        url: mediaDelivery(doc.publicId)
      };
    }
    if (path[0] === "admin") {
      const section = path[1];
      const permissions: Record<string, Role[]> = {
        overview: ["admin", "editor", "operations", "safeguarding", "moderator", "researcher", "legal_reviewer"],
        content: ["admin", "editor", "legal_reviewer", "safeguarding"],
        opportunities: ["admin", "editor", "operations", "safeguarding"],
        partners: ["admin", "safeguarding"],
        moderation: ["moderator"],
        safeguarding: ["safeguarding"],
        surveys: ["researcher"],
        analytics: ["admin", "researcher"],
        grants: ["admin"],
        audit: ["admin"],
        areas: ["editor", "admin"],
        media: ["editor", "admin"],
        attendance: ["operations"]
      };
      const user = await requireUser(permissions[section] ?? []);
      await audit(String(user._id), "admin.list_accessed", section, section);
      if (section === "safeguarding") {
        if (path[2]) {
          const doc = await Intake.findOne({
            _id: objectId.parse(path[2]),
            assignedTo: user._id
          }).select("+messageEncrypted +replyEmailEncrypted +contactPreferencesEncrypted +referralEncrypted +actions.notesEncrypted").lean();
          if (!doc) throw new HttpError(404, "Assigned case not found.");
          await audit(String(user._id), "case.read", "intake", path[2]);
          return {
            case: {
              ...doc,
              message: decrypt(doc.messageEncrypted),
              replyEmail: doc.replyEmailEncrypted ? decrypt(doc.replyEmailEncrypted) : undefined,
              contactPreferences: doc.contactPreferencesEncrypted ? JSON.parse(decrypt(doc.contactPreferencesEncrypted)) : undefined,
              referral: doc.referralEncrypted ? JSON.parse(decrypt(doc.referralEncrypted)) : undefined,
              contactPreferencesEncrypted: undefined,
              referralEncrypted: undefined,
              messageEncrypted: undefined,
              replyEmailEncrypted: undefined,
              actions: doc.actions.map(a => ({
                ...a,
                notes: a.notesEncrypted ? decrypt(a.notesEncrypted) : "",
                notesEncrypted: undefined
              }))
            }
          };
        }
        return {
          records: await Intake.find({
            $or: [{
              assignedTo: user._id
            }, {
              assignedTo: null
            }]
          }).select("reference topic requester targetTeam ageBand risk status followUpStatus assignedTo createdAt retentionReviewAt").limit(100).lean()
        };
      }
      if (section === "surveys" && path[2] && path[3] === "export") return exportStudy(objectId.parse(path[2]), String(user._id));
      if (section === "analytics") return {
        records: [{
          metric: "Completed attendance",
          value: await Booking.countDocuments({
            status: "attended"
          })
        }, {
          metric: "Published opportunities",
          value: await Content.countDocuments({
            kind: "opportunity",
            status: "published",
            demo: false
          })
        }],
        notice: "Operational counts only. No youth browsing profiles, individual sponsor reports or causal impact claims."
      };
      if (section === "overview") return {
        records: [{
          metric: "Draft content",
          value: await Content.countDocuments({
            status: "draft"
          })
        }, {
          metric: "Pending providers",
          value: await Provider.countDocuments({
            verified: false
          })
        }]
      };
      if (section === "content" || section === "opportunities") return {
        records: await Content.find(section === "opportunities" ? {
          kind: "opportunity"
        } : {}).select("title slug kind status updatedAt").limit(100).lean()
      };
      if (section === "partners") return {
        records: await Provider.find().select("name officialUrl verified eligibilityChecks").limit(100).lean()
      };
      if (section === "moderation") return {
        records: await ForumPost.find({
          status: "pending"
        }).select("+body title category status createdAt").limit(100).lean()
      };
      if (section === "surveys") return {
        records: await Study.find().select("title slug status category liveVersionId").limit(100).lean()
      };
      if (section === "grants") return {
        records: await Grant.find().limit(100).lean()
      };
      if (section === "audit") return {
        records: await Audit.find().sort({
          timestamp: -1
        }).limit(100).lean()
      };
      if (section === "areas") return {
        records: await Area.find().lean()
      };
      if (section === "media") return {
        records: await Media.find().limit(100).lean()
      };
      if (section === "attendance") {
        if (path[2]) {
          const doc = await Booking.findById(objectId.parse(path[2])).select("+emergencyContactEncrypted").lean();
          if (!doc) throw new HttpError(404, "Booking not found.");
          await audit(String(user._id), "booking.emergency_contact_read", "booking", path[2]);
          return {
            contact: doc.emergencyContactEncrypted ? JSON.parse(decrypt(doc.emergencyContactEncrypted)) : null
          };
        }
        return {
          records: await Booking.find({
            status: {
              $in: ["confirmed", "attended"]
            }
          }).select("eventId userId status ageBand checkedInAt").limit(100).lean()
        };
      }
    }
    throw new HttpError(404, "Resource not found.");
  });
}
