import type { Role } from "./types";
export function hasRole(actual: Role, allowed: Role[]) {
  return allowed.includes(actual);
}
export function publishableGuide(
  g: {
    status: string;
    reviewer?: unknown;
    reviewerQualified?: boolean;
    reviewedAt?: unknown;
    nextReviewAt?: unknown;
    sourceIds?: unknown[];
  },
  now = new Date(),
) {
  return (
    g.status === "published" &&
    !!g.reviewer &&
    g.reviewerQualified === true &&
    !!g.reviewedAt &&
    new Date(String(g.reviewedAt)) <= now &&
    !!g.nextReviewAt &&
    new Date(String(g.nextReviewAt)) > now &&
    !!g.sourceIds?.length
  );
}
export function publishableOpportunity(
  o: {
    status: string;
    verified?: boolean;
    riskAssessmentApproved?: boolean;
    providerVerified?: boolean;
    lastChecked?: unknown;
    demo?: boolean;
  },
  now = new Date(),
) {
  const checked = o.lastChecked ? new Date(String(o.lastChecked)).getTime() : 0;
  return (
    o.status === "published" &&
    o.verified === true &&
    o.providerVerified === true &&
    o.riskAssessmentApproved === true &&
    o.demo !== true &&
    checked <= now.getTime() &&
    checked > now.getTime() - 90 * 86400000
  );
}
export function csvCell(value: unknown) {
  let v = String(value ?? "");
  if (/^[\s]*[=+\-@\t\r]/.test(v)) v = "'" + v;
  return '"' + v.replaceAll('"', '""') + '"';
}
export function ageNeedsGuardian(band: string) {
  return band !== "18–20";
}
export const consentVersion = "2026-10-30.v1";
