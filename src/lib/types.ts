export type AgeBand = "13–15" | "16–17" | "18–20";
export type Zone = "North" | "South" | "East" | "West";
export type Role =
  | "participant"
  | "parent_pending"
  | "parent_verified"
  | "editor"
  | "provider"
  | "moderator"
  | "safeguarding"
  | "legal_reviewer"
  | "researcher"
  | "operations"
  | "admin";
export type Status = "draft" | "pending_review" | "published" | "expired";
export interface Opportunity {
  canonicalCategory?: import("./structure").ActivityCategorySlug;
  catchments?: Zone[];
  boroughs?: string[];
  tags?: string[];
  vocation?: string;
  providerVerified?: boolean;
  riskAssessmentApproved?: boolean;
  slug: string;
  title: string;
  category: string;
  borough: string;
  zone: Zone;
  description: string;
  ageBands: AgeBand[];
  cost: number;
  date: string;
  time: string;
  venue: string;
  provider: string;
  accessibility: string[];
  capacity: number;
  booked: number;
  guardianConsent: boolean;
  holiday: boolean;
  transport: string;
  officialUrl: string;
  lastChecked: string | null;
  verified: boolean;
  demo: boolean;
  status: Status;
  art: string;
}
export interface Story {
  slug: string;
  title: string;
  series: string;
  excerpt: string;
  duration: string;
  type:
    | "Scripted composite"
    | "Animation concept"
    | "First-person account"
    | "Anonymised voice"
    | "Positive journey";
  theme: string;
  art: string;
  contentNote: string;
  paragraphs: string[];
  reflection: string;
  opportunitySlug: string;
  demo: boolean;
  status: Status;
}
export interface Guide {
  slug: string;
  title: string;
  category: string;
  summary: string;
  sections: {
    title: string;
    body: string;
  }[];
  sources: string[];
  jurisdiction: string;
  reviewer: string | null;
  reviewedAt: string | null;
  nextReviewAt: string | null;
  status: Status;
  demo: boolean;
}
export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  colour: string;
  sizes: string[];
  kind: "hoodie" | "tee" | "crew";
}
