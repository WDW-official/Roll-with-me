import mongoose from "mongoose";
import { randomBytes } from "node:crypto";
import { Booking, Content, Provider } from "./models";
import { audit, hash, encrypt, HttpError } from "./security";
import {
  ageNeedsGuardian,
  consentVersion,
  publishableOpportunity,
} from "./policy";
export async function bookEvent(
  user: {
    id: string;
    ageBand: string;
  },
  input: {
    slug: string;
    emergencyName: string;
    emergencyPhone: string;
  },
) {
  if (user.ageBand === "adult")
    throw new HttpError(400, "This session is for ages 13–20.");
  const token = randomBytes(24).toString("hex");
  let result: {
    status: string;
    consentCode?: string;
  } = {
    status: "",
  };
  await mongoose.connection.transaction(async (session) => {
    const event = await Content.findOne({
      slug: input.slug,
      kind: "opportunity",
    }).session(session);
    const provider = event
      ? await Provider.findById(event.data.providerId).session(session)
      : null;
    if (
      !event ||
      !publishableOpportunity({
        ...event.toObject(),
        ...event.data,
        providerVerified: provider?.verified,
      })
    )
      throw new HttpError(
        409,
        "This session is not currently open for booking.",
      );
    if (!event.data.ageBands.includes(user.ageBand))
      throw new HttpError(400, "This session is not for your age band.");
    if (new Date(event.data.date) < new Date())
      throw new HttpError(409, "Registration has closed.");
    const guardian = ageNeedsGuardian(user.ageBand);
    let status = "pending_consent";
    if (!guardian) {
      const updated = await Content.findOneAndUpdate(
        {
          _id: event._id,
          $expr: {
            $lt: ["$data.booked", "$data.capacity"],
          },
        },
        {
          $inc: {
            "data.booked": 1,
          },
        },
        {
          session,
          new: true,
        },
      );
      status = updated ? "confirmed" : "waiting";
    }
    await Booking.create(
      [
        {
          eventId: event._id,
          userId: user.id,
          status,
          ageBand: user.ageBand,
          consentNoticeVersion: consentVersion,
          emergencyContactEncrypted: encrypt(
            JSON.stringify({
              name: input.emergencyName,
              phone: input.emergencyPhone,
            }),
          ),
          ...(guardian
            ? {
                consentTokenHash: hash(token),
                consentTokenExpiresAt: new Date(Date.now() + 86400000),
              }
            : {}),
        },
      ],
      {
        session,
      },
    );
    result = {
      status,
      ...(guardian
        ? {
            consentCode: token,
          }
        : {}),
    };
  });
  await audit(user.id, "booking.created", "booking", input.slug);
  return result;
}
export async function consentToBooking(guardianId: string, code: string) {
  let status = "";
  await mongoose.connection.transaction(async (session) => {
    const booking = await Booking.findOne({
      consentTokenHash: hash(code),
      consentTokenExpiresAt: {
        $gt: new Date(),
      },
      status: "pending_consent",
    }).session(session);
    if (!booking)
      throw new HttpError(404, "That consent code is invalid or has expired.");
    if (String(booking.userId) === guardianId)
      throw new HttpError(403, "A separate verified guardian is required.");
    const event = await Content.findById(booking.eventId).session(session);
    const provider = event
      ? await Provider.findById(event.data.providerId).session(session)
      : null;
    if (
      !event ||
      !publishableOpportunity({
        ...event.toObject(),
        ...event.data,
        providerVerified: provider?.verified,
      }) ||
      new Date(event.data.date) < new Date()
    )
      throw new HttpError(409, "Registration is not open.");
    const updated = await Content.findOneAndUpdate(
      {
        _id: event._id,
        $expr: {
          $lt: ["$data.booked", "$data.capacity"],
        },
      },
      {
        $inc: {
          "data.booked": 1,
        },
      },
      {
        session,
        new: true,
      },
    );
    status = updated ? "confirmed" : "waiting";
    booking.status = status as "confirmed" | "waiting";
    booking.guardianUserId = new mongoose.Types.ObjectId(guardianId);
    booking.guardianConsentAt = new Date();
    booking.guardianConsentVersion = consentVersion;
    booking.consentTokenHash = undefined;
    await booking.save({
      session,
    });
  });
  await audit(
    guardianId,
    "booking.guardian_consented",
    "booking",
    "consent-code-redacted",
  );
  return {
    status,
  };
}
