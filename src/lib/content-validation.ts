import { z } from "zod";
import { ageBand } from "./validation";
const art = z.enum(["court", "code", "boxing", "football", "film", "robot", "sprint", "maker", "route"]);
const base = {
  title: z.string().min(3).max(200),
  art
};
export const opportunityData = z.object({
  ...base,
  description: z.string().min(20).max(5000),
  category: z.string().min(2).max(80),
  providerId: z.string().regex(/^[a-f0-9]{24}$/i),
  provider: z.string().min(2).max(200),
  borough: z.string().min(2).max(100),
  zone: z.enum(["North", "South", "East", "West"]),
  venue: z.string().min(5).max(300),
  ageBands: z.array(ageBand).min(1),
  cost: z.number().min(0).max(10000),
  date: z.iso.date(),
  time: z.string().min(5).max(80),
  accessibility: z.array(z.string().max(120)).max(20),
  capacity: z.number().int().min(1).max(500),
  guardianConsent: z.boolean(),
  holiday: z.boolean(),
  transport: z.string().max(1000),
  officialUrl: z.url().refine(s => s.startsWith("https://")),
  lastChecked: z.iso.datetime()
});
export const storyData = z.object({
  ...base,
  series: z.string().min(2).max(80),
  excerpt: z.string().min(10).max(500),
  duration: z.string().min(3).max(40),
  type: z.enum(["Scripted composite", "Animation concept", "First-person account", "Anonymised voice", "Positive journey"]),
  theme: z.string().min(2).max(80),
  contentNote: z.string().min(10).max(1000),
  paragraphs: z.array(z.string().min(5).max(8000)).min(1).max(30),
  reflection: z.string().min(10).max(500),
  opportunitySlug: z.string().max(120),
  permissionReference: z.string().min(5).max(200),
  transcript: z.string().min(10).max(15000),
  sourceConfidence: z.string().min(3).max(500),
  storytellerAgeBand: z.string().min(2).max(80),
  guardianConsentReference: z.string().min(3).max(200),
  translationStatus: z.string().min(3).max(200)
});
export const guideData = z.object({
  title: z.string().min(3).max(200),
  category: z.string().min(2).max(80),
  summary: z.string().min(10).max(500),
  jurisdiction: z.literal("England and Wales"),
  sections: z.array(z.object({
    title: z.string().min(3).max(150),
    body: z.string().min(10).max(5000)
  })).min(1).max(20),
  sourceIds: z.array(z.string().min(2).max(100)).min(1).max(20)
});
export function validateContent(kind: string, value: unknown) {
  if (kind === "opportunity") return opportunityData.parse(value);
  if (kind === "story") return storyData.parse(value);
  if (kind === "guide") return guideData.parse(value);
  throw new Error("Standalone events and challenges use opportunity records in V1.");
}
