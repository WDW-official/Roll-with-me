import { z } from "zod";
import { validSupportContext } from "./structure";
import { boroughs } from "./data";
import { supportContactIssues } from "./support-policy";
export const ageBand = z.enum(["13–15", "16–17", "18–20"]);
const text = (max = 2000) => z.string().trim().min(1).max(max);
export const authSchema = z.object({
  email: z
    .email()
    .max(254)
    .transform((v) => v.toLowerCase()),
  password: z.string().min(12).max(128),
});
export const signupSchema = authSchema.extend({
  displayName: text(40),
  ageBand: z.enum(["13–15", "16–17", "18–20", "adult"]),
  privacyAccepted: z.literal(true),
});
export const askSchema = z
  .object({
    topic: z.enum([
      "general",
      "rules",
      "pathways",
      "activities",
      "wellbeing",
      "story",
      "correction",
      "opportunities",
      "safety",
    ]),
    requester: z.enum(["self", "parent_carer"]).default("self"),
    relationship: z
      .enum(["parent", "guardian", "carer", "trusted_adult", ""])
      .default(""),
    context: z
      .string()
      .max(180)
      .refine(validSupportContext, "Choose a valid public topic.")
      .default("general"),
    borough: z
      .string()
      .trim()
      .max(100)
      .refine(
        (v) => v === "" || Object.values(boroughs).flat().includes(v),
        "Choose a London borough or leave it out.",
      )
      .default(""),
    ageBand: z.enum(["13–15", "16–17", "18–20", "adult", "prefer_not_to_say"]),
    message: text(3000),
    replyEmail: z.union([z.email().max(254), z.literal("")]).default(""),
    replyRequested: z.boolean().default(false),
    safeToEmail: z.boolean().default(false),
    contactNote: z.string().trim().max(300).default(""),
    privacyAccepted: z.literal(true),
    publicationConsent: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    for (const issue of supportContactIssues(data))
      ctx.addIssue({
        code: "custom",
        path: [issue.path],
        message: issue.message,
      });
  });
export const providerSchema = z.object({
  name: text(120),
  officialUrl: z
    .url()
    .refine((v) => v.startsWith("https://"), "HTTPS required"),
  contactEmail: z.email(),
  policyUrl: z.url().refine((v) => v.startsWith("https://")),
  description: text(3000),
  privacyAccepted: z.literal(true),
});
export const bookingInput = z.object({
  slug: text(120),
  emergencyName: text(80),
  emergencyPhone: z.string().regex(/^\+?[\d ()-]{8,24}$/),
  noticeAccepted: z.literal(true),
});
export const forumInput = z.object({
  title: text(120),
  category: z.enum(["activities", "support", "local-ideas", "parenting"]),
  body: text(2000),
  rulesAccepted: z.literal(true),
});
export const questionSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9_]{0,39}$/),
  type: z.enum(["single", "multiple", "likert", "scale", "narrative"]),
  label: text(300),
  options: z.array(text(150)).max(12).default([]),
  required: z.boolean(),
  showIf: z
    .object({
      questionId: z.string(),
      equals: z.string(),
    })
    .optional(),
});
export const studyInput = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]{3,100}$/),
    title: text(160),
    category: z.enum(["anonymous_feedback", "research"]),
    protocol: text(5000),
    purpose: text(3000),
    lawfulBasis: text(2000),
    ethicsReview: text(2000),
    ageBands: z.array(ageBand).min(1),
    guardianRequired: z.boolean(),
    retentionDays: z.number().int().min(1).max(365),
    withdrawalPolicy: text(2000),
    samplingPlan: text(2000),
    participantInformation: text(5000),
    conflicts: text(2000),
    methodology: text(3000),
    readingCheck: text(2000),
    draftQuestions: z.array(questionSchema).min(1).max(30),
  })
  .superRefine((s, ctx) => {
    const ids = new Set<string>();
    s.draftQuestions.forEach((q, i) => {
      if (ids.has(q.id))
        ctx.addIssue({
          code: "custom",
          message: "Question IDs must be unique",
          path: ["draftQuestions", i],
        });
      if (q.showIf && !ids.has(q.showIf.questionId))
        ctx.addIssue({
          code: "custom",
          message: "Branches must reference an earlier question",
          path: ["draftQuestions", i],
        });
      if (
        ["single", "multiple", "likert"].includes(q.type) &&
        q.options.length < 2
      )
        ctx.addIssue({
          code: "custom",
          message: "At least two options required",
          path: ["draftQuestions", i],
        });
      ids.add(q.id);
    });
  });
export type SurveyQuestion = z.infer<typeof questionSchema>;
export function visibleQuestions(
  questions: SurveyQuestion[],
  answers: Record<string, unknown>,
) {
  return questions.filter(
    (q) => !q.showIf || answers[q.showIf.questionId] === q.showIf.equals,
  );
}
export function validateAnswers(questions: SurveyQuestion[], input: unknown) {
  const answers = z.record(z.string(), z.unknown()).parse(input);
  const clean: Record<string, unknown> = {};
  for (const q of visibleQuestions(questions, answers)) {
    const value = answers[q.id];
    if (
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      if (q.required) throw new Error("Please answer every required question.");
      continue;
    }
    if (q.type === "single" || q.type === "likert")
      clean[q.id] = z
        .string()
        .refine((v) => q.options.includes(v))
        .parse(value);
    else if (q.type === "multiple")
      clean[q.id] = z
        .array(z.string().refine((v) => q.options.includes(v)))
        .max(q.options.length)
        .transform((v) => [...new Set(v)])
        .parse(value);
    else if (q.type === "scale")
      clean[q.id] = z.number().int().min(1).max(5).parse(value);
    else clean[q.id] = z.string().max(1000).parse(value);
  }
  return clean;
}
