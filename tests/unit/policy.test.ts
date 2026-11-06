import { describe, it, expect } from "vitest";
import {
  publishableGuide,
  publishableOpportunity,
  csvCell,
  ageNeedsGuardian,
  hasRole,
} from "../../src/lib/policy";
const now = new Date("2026-10-30T12:00:00Z");
describe("legal publication gate", () => {
  const reviewed = {
    status: "published",
    reviewer: "qualified-id",
    reviewerQualified: true,
    reviewedAt: "2026-10-01",
    nextReviewAt: "2027-01-01",
    sourceIds: ["gov-knives"],
  };
  it("requires a real designation, qualification and a current review", () => {
    expect(publishableGuide(reviewed, now)).toBe(true);
    for (const partial of [
      {
        reviewer: null,
      },
      {
        reviewerQualified: false,
      },
      {
        reviewedAt: null,
      },
      {
        reviewedAt: "2027-01-01",
      },
      {
        nextReviewAt: "2026-01-01",
      },
      {
        sourceIds: [],
      },
      {
        status: "pending_review",
      },
    ])
      expect(
        publishableGuide(
          {
            ...reviewed,
            ...partial,
          },
          now,
        ),
      ).toBe(false);
  });
});
describe("opportunity publication gate", () => {
  const verified = {
    status: "published",
    verified: true,
    riskAssessmentApproved: true,
    providerVerified: true,
    lastChecked: "2026-10-01",
    demo: false,
  };
  it("blocks demo, stale, future-dated and unverified entries", () => {
    expect(publishableOpportunity(verified, now)).toBe(true);
    for (const partial of [
      {
        demo: true,
      },
      {
        verified: false,
      },
      {
        providerVerified: false,
      },
      {
        riskAssessmentApproved: false,
      },
      {
        lastChecked: null,
      },
      {
        lastChecked: "2026-01-01",
      },
      {
        lastChecked: "2027-01-01",
      },
    ])
      expect(
        publishableOpportunity(
          {
            ...verified,
            ...partial,
          },
          now,
        ),
      ).toBe(false);
  });
});
describe("privacy boundaries", () => {
  it("requires guardian consent for both under-18 bands", () => {
    expect(ageNeedsGuardian("13–15")).toBe(true);
    expect(ageNeedsGuardian("16–17")).toBe(true);
    expect(ageNeedsGuardian("18–20")).toBe(false);
  });
  it("does not give admins automatic access to safeguarding", () => {
    expect(hasRole("admin", ["safeguarding"])).toBe(false);
    expect(hasRole("safeguarding", ["safeguarding"])).toBe(true);
  });
});
describe("CSV export safety", () => {
  it("quotes and escapes narrative values", () =>
    expect(csvCell('a,"b"\nc')).toBe('"a,""b""\nc"'));
  it.each([
    '=HYPERLINK("bad")',
    "+SUM(A1:A4)",
    "-5+1",
    "@SUM(1)",
    "  =1+1",
    "\t=1",
  ])("neutralises formula input %s", (value) =>
    expect(csvCell(value)).toBe("\"'" + value.replaceAll('"', '""') + '"'),
  );
});
