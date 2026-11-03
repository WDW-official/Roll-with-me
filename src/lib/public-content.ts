import type { Opportunity, Story, Guide } from "./types";

// Explicit public projections prevent internal release, review and staff references
// from entering React Server Component payloads sent to a browser.
export function publicStory(s: Story): Story {
  return {
    slug: s.slug,
    title: s.title,
    series: s.series,
    excerpt: s.excerpt,
    duration: s.duration,
    type: s.type,
    theme: s.theme,
    art: s.art,
    contentNote: s.contentNote,
    paragraphs: s.paragraphs,
    reflection: s.reflection,
    opportunitySlug: s.opportunitySlug,
    demo: s.demo,
    status: s.status
  };
}
export function publicOpportunity(o: Opportunity): Opportunity {
  return {
    slug: o.slug,
    title: o.title,
    category: o.category,
    borough: o.borough,
    zone: o.zone,
    description: o.description,
    ageBands: o.ageBands,
    cost: o.cost,
    date: o.date,
    time: o.time,
    venue: o.venue,
    provider: o.provider,
    accessibility: o.accessibility,
    capacity: o.capacity,
    booked: o.booked,
    guardianConsent: o.guardianConsent,
    holiday: o.holiday,
    transport: o.transport,
    officialUrl: o.officialUrl,
    lastChecked: o.lastChecked,
    verified: o.verified,
    demo: o.demo,
    status: o.status,
    art: o.art
  };
}
export function publicGuide(g: Guide): Guide {
  return {
    slug: g.slug,
    title: g.title,
    category: g.category,
    summary: g.summary,
    sections: g.sections,
    sources: g.sources,
    jurisdiction: g.jurisdiction,
    reviewer: g.reviewer,
    reviewedAt: g.reviewedAt,
    nextReviewAt: g.nextReviewAt,
    status: g.status,
    demo: g.demo
  };
}
