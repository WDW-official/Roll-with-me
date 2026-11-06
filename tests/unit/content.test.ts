import { describe, it, expect } from "vitest";
import { opportunities, guides, stories, boroughs } from "../../src/lib/data";
import { validateContent } from "../../src/lib/content-validation";
import { publicStory, publicOpportunity } from "../../src/lib/public-content";
describe("safe launch data", () => {
  it("does not expose internal release, staff or provider identifiers in public payloads", () => {
    const story = {
      ...stories[0],
      permissionReference: "private-release",
      guardianConsentReference: "private-consent",
      safeguardingReviewer: "staff-id",
    };
    const listing = {
      ...opportunities[0],
      providerId: "internal-provider-id",
      safeguardingReviewer: "staff-id",
    };
    expect(publicStory(story)).not.toHaveProperty("permissionReference");
    expect(publicStory(story)).not.toHaveProperty("guardianConsentReference");
    expect(publicStory(story)).not.toHaveProperty("safeguardingReviewer");
    expect(publicOpportunity(listing)).not.toHaveProperty("providerId");
    expect(publicOpportunity(listing)).not.toHaveProperty(
      "safeguardingReviewer",
    );
  });
  it("labels every seeded activity and prevents real availability claims", () => {
    expect(
      opportunities.every(
        (o) =>
          o.demo &&
          !o.verified &&
          o.status === "draft" &&
          o.lastChecked === null,
      ),
    ).toBe(true);
  });
  it("does not invent qualified legal reviews", () => {
    expect(
      guides.every(
        (g) =>
          g.demo &&
          g.status === "pending_review" &&
          !g.reviewer &&
          !g.reviewedAt,
      ),
    ).toBe(true);
  });
  it("contains no real-person demo testimonies", () => {
    expect(
      stories.every(
        (s) =>
          s.demo &&
          ["Scripted composite", "Animation concept"].includes(s.type),
      ),
    ).toBe(true);
  });
  it("includes every borough and the City exactly once in initial shortcuts", () => {
    const all = Object.values(boroughs).flat();
    expect(all.length).toBe(33);
    expect(new Set(all).size).toBe(33);
  });
  it("requires complete listing fields before a live draft can be saved", () =>
    expect(() =>
      validateContent("opportunity", {
        title: "Missing details",
      }),
    ).toThrow());
});
