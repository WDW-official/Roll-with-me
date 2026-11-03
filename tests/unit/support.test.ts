import { describe, it, expect } from "vitest";
import { askSchema } from "../../src/lib/validation";
import { referralRecordError } from "../../src/lib/support-policy";
const base = {
  topic: "pathways",
  requester: "self",
  context: "paths",
  ageBand: "16–17",
  message: "I would like help choosing a learning route.",
  privacyAccepted: true
};
describe("support intake", () => {
  it("permits a general no-account request without contact details", () => expect(askSchema.safeParse(base).success).toBe(true));
  it("requires relationship for an on-behalf request", () => {
    expect(askSchema.safeParse({
      ...base,
      requester: "parent_carer"
    }).success).toBe(false);
    expect(askSchema.safeParse({
      ...base,
      requester: "parent_carer",
      relationship: "parent"
    }).success).toBe(true);
  });
  it("requires an email and safe-contact acknowledgement when a reply is requested", () => {
    expect(askSchema.safeParse({
      ...base,
      replyRequested: true
    }).success).toBe(false);
    expect(askSchema.safeParse({
      ...base,
      replyRequested: true,
      replyEmail: "parent@example.org"
    }).success).toBe(false);
    expect(askSchema.safeParse({
      ...base,
      replyRequested: true,
      replyEmail: "parent@example.org",
      safeToEmail: true
    }).success).toBe(true);
  });
  it("rejects arbitrary location and private-page context", () => {
    expect(askSchema.safeParse({
      ...base,
      borough: "A private street address"
    }).success).toBe(false);
    expect(askSchema.safeParse({
      ...base,
      context: "admin/case-123"
    }).success).toBe(false);
  });
});
describe("manual named-referral records", () => {
  it("cannot record a routine referral without a named recipient and explicit consent", () => {
    expect(referralRecordError({
      referralBasis: "participant_consent",
      consentConfirmed: true,
      notes: "Reviewed"
    })).not.toBeNull();
    expect(referralRecordError({
      partnerName: "Reviewed service",
      referralBasis: "participant_consent",
      notes: "Reviewed"
    })).not.toBeNull();
    expect(referralRecordError({
      partnerName: "Reviewed service",
      referralBasis: "participant_consent",
      consentConfirmed: true,
      notes: "Reviewed participant agreement"
    })).toBeNull();
  });
  it("requires a reasoned human record for a safeguarding exception", () => {
    expect(referralRecordError({
      partnerName: "Appropriate authority",
      referralBasis: "safeguarding_duty"
    })).not.toBeNull();
    expect(referralRecordError({
      partnerName: "Appropriate authority",
      referralBasis: "safeguarding_duty",
      notes: "Reviewed duty and proportional disclosure recorded"
    })).toBeNull();
  });
});
