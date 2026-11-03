/** Checks record completeness; a human must establish whether a referral is appropriate. */
export function supportContactIssues(input: {
  requester: string;
  relationship: string;
  replyRequested: boolean;
  replyEmail: string;
  safeToEmail: boolean;
}) {
  const issues: {
    path: string;
    message: string;
  }[] = [];
  if (input.requester === "parent_carer" && !input.relationship) issues.push({
    path: "relationship",
    message: "Tell us your relationship to the person."
  });
  if (input.replyRequested && !input.replyEmail) issues.push({
    path: "replyEmail",
    message: "An email address is needed for an email reply."
  });
  if (input.replyRequested && !input.safeToEmail) issues.push({
    path: "safeToEmail",
    message: "Confirm that this is a safe address for a general reply."
  });
  return issues;
}
export function referralRecordError(input: {
  partnerName?: string;
  referralBasis?: string;
  consentConfirmed?: boolean;
  notes?: string;
}) {
  if (!input.partnerName?.trim() || !["participant_consent", "safeguarding_duty"].includes(input.referralBasis ?? "") || !input.notes?.trim()) return "A named recipient, lawful basis and reviewed action note are required.";
  if (input.referralBasis === "participant_consent" && input.consentConfirmed !== true) return "Record the participant’s informed consent to this named referral before proceeding.";
  return null;
}
