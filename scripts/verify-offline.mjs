// Dependency-free checks for policy and editorial data. This does not replace a full build.
import assert from "node:assert/strict";
import {
  publishableGuide,
  publishableOpportunity,
  ageNeedsGuardian,
  csvCell,
  hasRole,
} from "../src/lib/policy.ts";
import { opportunities, stories, guides, boroughs } from "../src/lib/data.ts";
import { pathLessons } from "../src/lib/paths.ts";
import { publicStory, publicOpportunity } from "../src/lib/public-content.ts";
import {
  ruleBranches,
  ruleTopics,
  ruleTopicHref,
  pathBranches,
  pathFields,
  pathFieldHref,
  storySlots,
  discoveryState,
  discoveryHref,
  activityCategories,
  activityMatchesCategory,
  supportHref,
  supportTeam,
  supportContextById,
  validSupportContext,
} from "../src/lib/structure.ts";
import {
  supportContactIssues,
  referralRecordError,
} from "../src/lib/support-policy.ts";
import { imageSlots } from "../src/lib/image-plan.ts";
const now = new Date("2026-10-31T12:00:00Z");
let checks = 0;
const check = (fn) => {
  fn();
  checks++;
};
const legal = {
  status: "published",
  reviewer: "reviewer-id",
  reviewerQualified: true,
  reviewedAt: "2026-10-01",
  nextReviewAt: "2027-01-01",
  sourceIds: ["gov-knives"],
};
check(() => assert.equal(publishableGuide(legal, now), true));
for (const change of [
  { reviewer: null },
  { reviewerQualified: false },
  { reviewedAt: null },
  { reviewedAt: "2027-01-01" },
  { nextReviewAt: "2026-01-01" },
  { sourceIds: [] },
  { status: "pending_review" },
])
  check(() =>
    assert.equal(publishableGuide({ ...legal, ...change }, now), false),
  );
const listing = {
  status: "published",
  verified: true,
  riskAssessmentApproved: true,
  providerVerified: true,
  lastChecked: "2026-10-01",
  demo: false,
};
check(() => assert.equal(publishableOpportunity(listing, now), true));
for (const change of [
  { demo: true },
  { verified: false },
  { providerVerified: false },
  { riskAssessmentApproved: false },
  { lastChecked: null },
  { lastChecked: "2026-01-01" },
  { lastChecked: "2027-01-01" },
])
  check(() =>
    assert.equal(publishableOpportunity({ ...listing, ...change }, now), false),
  );
for (const age of ["13–15", "16–17"])
  check(() => assert.equal(ageNeedsGuardian(age), true));
check(() => assert.equal(ageNeedsGuardian("18–20"), false));
check(() => assert.equal(hasRole("admin", ["safeguarding"]), false));
for (const value of ["=1+1", "+SUM(A1:A2)", "-2+2", "@SUM(1)", "  =1", "\t=1"])
  check(() => assert.ok(csvCell(value).startsWith("\"'")));
check(() => assert.equal(csvCell('a,"b"\nc'), '"a,""b""\nc"'));
check(() =>
  assert.ok(
    opportunities.every(
      (o) =>
        o.demo && !o.verified && o.status === "draft" && o.lastChecked === null,
    ),
  ),
);
check(() =>
  assert.ok(
    guides.every(
      (g) =>
        g.demo && g.status === "pending_review" && !g.reviewer && !g.reviewedAt,
    ),
  ),
);
check(() => assert.ok(stories.every((s) => s.demo)));
check(() => assert.equal(new Set(Object.values(boroughs).flat()).size, 33));
check(() =>
  assert.deepEqual(
    [...new Set(pathLessons.map((l) => l.category))],
    ["Tech", "Sports", "Vocation"],
  ),
);
check(() =>
  assert.equal(
    new Set(pathLessons.map((l) => l.slug)).size,
    pathLessons.length,
  ),
);
check(() =>
  assert.ok(pathLessons.every((l) => l.steps.length === 3 && l.takeaway)),
);
check(() =>
  assert.ok(
    [
      "Violence & knives",
      "Drugs & exploitation",
      "Consent & relationships",
      "Police & rights",
      "Online & everyday",
    ].every((c) => guides.some((g) => g.category === c)),
  ),
);
const restrictedStory = {
  ...stories[0],
  permissionReference: "private",
  guardianConsentReference: "private",
  safeguardingReviewer: "staff",
};
const restrictedOpportunity = {
  ...opportunities[0],
  providerId: "private",
  safeguardingReviewer: "staff",
};
for (const field of [
  "permissionReference",
  "guardianConsentReference",
  "safeguardingReviewer",
])
  check(() => assert.equal(field in publicStory(restrictedStory), false));
for (const field of ["providerId", "safeguardingReviewer"])
  check(() =>
    assert.equal(field in publicOpportunity(restrictedOpportunity), false),
  );
check(() =>
  assert.deepEqual(
    ruleBranches.map((b) => b.slug),
    ["the-law", "the-street"],
  ),
);
check(() => assert.equal(ruleTopics.length, 17));
check(() => assert.equal(pathBranches.length, 3));
check(() => assert.equal(pathFields.length, 18));
const topicRoutes = [
  ...ruleTopics.map(ruleTopicHref),
  ...pathFields.map(pathFieldHref),
];
check(() => assert.equal(new Set(topicRoutes).size, 35));
check(() =>
  assert.ok(
    ruleTopics.every((t) => ruleBranches.some((b) => b.slug === t.branch)),
  ),
);
check(() =>
  assert.ok(
    pathFields.every((f) => pathBranches.some((b) => b.slug === f.branch)),
  ),
);
check(() =>
  assert.ok(
    pathFields.every((f) =>
      f.lessonSlugs.every((slug) => pathLessons.some((l) => l.slug === slug)),
    ),
  ),
);
check(() =>
  assert.ok(
    ruleTopics.every((t) =>
      t.guideSlugs.every((slug) => guides.some((g) => g.slug === slug)),
    ),
  ),
);
check(() => assert.equal(storySlots.length, 10));
check(() => assert.equal(storySlots[0].id, "ST01"));
check(() => assert.equal(storySlots[9].id, "ST10"));
check(() =>
  assert.ok(
    storySlots.every(
      (s) => s.status === "awaiting_material" && !("storyteller" in s),
    ),
  ),
);
check(() => assert.equal(new Set(storySlots.map((s) => s.slug)).size, 10));
const selected = discoveryState({
  area: "east",
  borough: "Hackney",
  age: "16–17",
  category: "sport-movement",
});
check(() => assert.equal(selected.area, "East"));
check(() => assert.ok(discoveryHref(selected).includes("borough=Hackney")));
check(() =>
  assert.ok(discoveryHref(selected).includes("category=sport-movement")),
);
check(() =>
  assert.deepEqual(
    discoveryState({
      area: "elsewhere",
      borough: "<script>",
      age: "12",
      category: "bad",
    }),
    { area: "North", borough: "", age: "", category: "" },
  ),
);
check(() => assert.equal(activityCategories.length, 6));
check(() =>
  assert.equal(
    activityMatchesCategory(
      { category: "Basketball", holiday: false },
      "sport-movement",
    ),
    true,
  ),
);
check(() =>
  assert.equal(
    activityMatchesCategory(
      { category: "Basketball", holiday: false },
      "creative",
    ),
    false,
  ),
);
check(() =>
  assert.equal(
    activityMatchesCategory(
      { category: "Basketball", holiday: true },
      "holidays-challenges",
    ),
    true,
  ),
);
check(() =>
  assert.equal(
    supportHref("/admin/safeguarding/private-case", true),
    "/ask-rwm?topic=general&context=general&requester=parent_carer",
  ),
);
check(() =>
  assert.ok(
    supportHref("/choose-a-path/tech-engineering/robotics-automation").includes(
      "context=paths%2Ftech-engineering%2Frobotics-automation",
    ),
  ),
);
for (const id of [
  "__proto__",
  "constructor",
  "admin/case-1",
  "/account/private",
])
  check(() => assert.equal(supportContextById(id).id, "general"));
check(() => assert.equal(validSupportContext("admin/case-1"), false));
check(() =>
  assert.equal(validSupportContext("rules/the-law/police-encounters"), true),
);
check(() => assert.equal(supportTeam("rules"), "legal_information"));
check(() => assert.equal(supportTeam("pathways"), "careers_pathways"));
check(() => assert.equal(supportTeam("wellbeing"), "safeguarding"));
const contact = {
  requester: "self",
  relationship: "",
  replyRequested: false,
  replyEmail: "",
  safeToEmail: false,
};
check(() => assert.equal(supportContactIssues(contact).length, 0));
check(() =>
  assert.ok(
    supportContactIssues({ ...contact, requester: "parent_carer" }).some(
      (i) => i.path === "relationship",
    ),
  ),
);
check(() =>
  assert.ok(
    supportContactIssues({ ...contact, replyRequested: true }).some(
      (i) => i.path === "replyEmail",
    ),
  ),
);
check(() =>
  assert.ok(
    supportContactIssues({
      ...contact,
      replyRequested: true,
      replyEmail: "test@example.org",
    }).some((i) => i.path === "safeToEmail"),
  ),
);
check(() =>
  assert.equal(
    supportContactIssues({
      ...contact,
      replyRequested: true,
      replyEmail: "test@example.org",
      safeToEmail: true,
    }).length,
    0,
  ),
);
check(() =>
  assert.ok(
    referralRecordError({
      referralBasis: "participant_consent",
      notes: "Reviewed",
      consentConfirmed: true,
    }),
  ),
);
check(() =>
  assert.ok(
    referralRecordError({
      partnerName: "Named service",
      referralBasis: "participant_consent",
      notes: "Reviewed",
    }),
  ),
);
check(() =>
  assert.equal(
    referralRecordError({
      partnerName: "Named service",
      referralBasis: "participant_consent",
      consentConfirmed: true,
      notes: "Reviewed informed agreement",
    }),
    null,
  ),
);
check(() =>
  assert.ok(
    referralRecordError({
      partnerName: "Appropriate authority",
      referralBasis: "safeguarding_duty",
    }),
  ),
);
check(() =>
  assert.equal(
    referralRecordError({
      partnerName: "Appropriate authority",
      referralBasis: "safeguarding_duty",
      notes: "Reviewed duty and proportional disclosure",
    }),
    null,
  ),
);
check(() =>
  assert.equal(new Set(imageSlots.map((s) => s.id)).size, imageSlots.length),
);
check(() =>
  assert.equal(imageSlots.filter((s) => s.priority === "first").length, 5),
);
check(() => assert.ok(imageSlots.every((s) => s.fallback && !("url" in s))));
console.log(
  `${checks} policy, content, structure and support checks passed. Full TypeScript, Vitest, Next.js and browser checks require installed dependencies.`,
);
