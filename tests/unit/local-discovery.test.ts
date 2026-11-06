import { describe, it, expect } from "vitest";
import { activityCategories, canonicalActivityCategory, discoveryHref, discoveryState, londonAreas } from "../../src/lib/structure";
import { localDiscoveryState, visibleLocalOpportunities, bookableOpportunity } from "../../src/lib/local-discovery";
import { boroughs, opportunities } from "../../src/lib/data";

describe("location-first activities", () => {
  it("has the same seven ordered categories and artwork in all four catchments", () => {
    expect(activityCategories.map(c => c.slug)).toEqual(["sport-movement", "tech-engineering", "creative", "trades-careers", "mentoring-support", "holidays-challenges", "pick-a-vocation"]);
    expect(activityCategories.slice(0, 6).every(c => c.image && c.driveAssetId && c.imageAlt)).toBe(true);
    expect(activityCategories[6].image).toBeUndefined();
    for (const area of londonAreas) for (const category of activityCategories) {
      const state = discoveryState({ area, category: category.slug, preview: "demo" });
      expect(discoveryHref(state)).toContain(`/roll-with-me/categories/${category.slug}?area=${area}`);
      const results = visibleLocalOpportunities(opportunities, state, true);
      expect(results.every(o => o.zone === area && canonicalActivityCategory(o) === category.slug)).toBe(true);
    }
  });
  it("maps the eight demos to their actual regions and canonical homes", () => {
    const expected = {
      "court-culture": ["East", "sport-movement"], "build-something": ["North", "tech-engineering"],
      "find-your-footwork": ["South", "sport-movement"], "five-a-side": ["West", "sport-movement"],
      "make-your-first-film": ["South", "creative"], "robotics-lab": ["East", "tech-engineering"],
      "fifty-metre-move": ["North", "sport-movement"], "maker-session": ["West", "tech-engineering"]
    };
    for (const [slug, [area, category]] of Object.entries(expected)) {
      const state = discoveryState({ area, category, preview: "demo" });
      expect(visibleLocalOpportunities(opportunities, state, true).some(o => o.slug === slug)).toBe(true);
      expect(bookableOpportunity(opportunities.find(o => o.slug === slug)!)).toBe(false);
    }
  });
  it("requires explicit demo previews and never substitutes another region", () => {
    const state = discoveryState({ area: "North", category: "tech-engineering" });
    expect(visibleLocalOpportunities(opportunities, state, true)).toEqual([]);
    expect(visibleLocalOpportunities(opportunities, { ...state, preview: "demo" }, false)).toEqual([]);
    expect(visibleLocalOpportunities(opportunities, { ...state, preview: "demo", area: "West" }, true).map(o => o.slug)).toEqual(["maker-session"]);
    expect(discoveryState({ area: "unknown" }).area).toBe("");
    expect(discoveryState({}).area).toBe("");
  });
  it("uses the configured borough map, supports slugs and signals invalid filters", () => {
    const valid = localDiscoveryState({ area: "East", borough: "tower-hamlets", age: "16–17", category: "sport-movement" }, boroughs);
    expect(valid.state.borough).toBe("Tower Hamlets");
    expect(valid.boroughCleared).toBe(false);
    const changed = localDiscoveryState({ ...valid.state, area: "West" }, boroughs);
    expect(changed.state).toMatchObject({ area: "West", borough: "", age: "16–17", category: "sport-movement" });
    expect(changed.boroughCleared).toBe(true);
  });
  it("filters age, vocation and locality while requiring provider and safeguarding approval", () => {
    const verified = { ...opportunities[0], demo: false, verified: true, status: "published" as const, providerVerified: true, riskAssessmentApproved: true, lastChecked: new Date().toISOString(), canonicalCategory: "pick-a-vocation" as const, vocation: "carpentry", ageBands: ["16–17" as const] };
    const state = discoveryState({ area: "East", borough: "Hackney", category: "pick-a-vocation", vocation: "carpentry", age: "16–17" });
    expect(visibleLocalOpportunities([verified], state)).toHaveLength(1);
    for (const patch of [{ age: "13–15" }, { vocation: "plumbing" }, { borough: "Newham" }, { area: "West" }]) expect(visibleLocalOpportunities([verified], { ...state, ...patch })).toEqual([]);
    for (const patch of [{ providerVerified: false }, { riskAssessmentApproved: false }, { verified: false }, { guardianConsent: false }, { status: "draft" as const }]) expect(bookableOpportunity({ ...verified, ...patch })).toBe(false);
    expect(bookableOpportunity(verified, "13–15")).toBe(false);
  });
  it("honours explicit multi-catchment associations and keeps secondary tags out of category ownership", () => {
    const multi = { ...opportunities[0], catchments: ["East" as const, "West" as const], tags: ["holidays-challenges"] };
    expect(visibleLocalOpportunities([multi], discoveryState({ area: "West", category: "sport-movement", preview: "demo" }), true)).toHaveLength(1);
    expect(visibleLocalOpportunities([multi], discoveryState({ area: "West", category: "holidays-challenges", preview: "demo" }), true)).toEqual([]);
  });
});
