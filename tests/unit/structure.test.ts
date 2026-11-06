import { describe, it, expect } from "vitest";
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
  activityMatchesCategory,
  supportHref,
  supportTeam,
  supportContextById,
  validSupportContext,
} from "../../src/lib/structure";
import { pathLessons } from "../../src/lib/paths";
describe("the agreed page tree", () => {
  it("provides two rule branches, three learning branches and unique routable leaf pages", () => {
    expect(ruleBranches.map((b) => b.slug)).toEqual(["the-law", "the-street"]);
    expect(pathBranches).toHaveLength(3);
    const routes = [
      ...ruleTopics.map(ruleTopicHref),
      ...pathFields.map(pathFieldHref),
    ];
    expect(new Set(routes).size).toBe(routes.length);
    expect(ruleTopics).toHaveLength(17);
    expect(pathFields).toHaveLength(18);
  });
  it("links only to existing introductory lessons", () => {
    for (const f of pathFields)
      for (const slug of f.lessonSlugs)
        expect(pathLessons.some((l) => l.slug === slug)).toBe(true);
  });
  it("reserves ten story slots without inventing testimony", () => {
    expect(storySlots).toHaveLength(10);
    expect(storySlots[0].id).toBe("ST01");
    expect(storySlots[9].id).toBe("ST10");
    expect(storySlots.every((s) => s.status === "awaiting_material")).toBe(
      true,
    );
  });
});
describe("manual discovery and contextual help", () => {
  it("keeps old topic references valid after renaming the branch", () => {
    const oldContext = "rules/the-terrain/read-the-situation";
    expect(validSupportContext(oldContext)).toBe(true);
    expect(supportContextById(oldContext)).toEqual({
      id: "rules/the-street/read-the-situation",
      label: "READ THE SITUATION.",
      topic: "rules",
    });
  });
  it("sanitises URL input and retains explicit discovery choices", () => {
    const s = discoveryState({
      area: "east",
      borough: "Hackney",
      age: "16–17",
      category: "sport-movement",
    });
    expect(s.area).toBe("East");
    expect(discoveryHref(s)).toContain("borough=Hackney");
    expect(
      discoveryState({
        area: "elsewhere",
        age: "12",
        category: "malicious",
        borough: "<script>",
      }),
    ).toEqual({
      area: "",
      borough: "",
      age: "",
      category: "",
    });
  });
  it("assigns a stable canonical category rather than using holiday tags as another home", () => {
    expect(
      activityMatchesCategory(
        {
          category: "Basketball",
        },
        "sport-movement",
      ),
    ).toBe(true);
    expect(
      activityMatchesCategory(
        {
          category: "Basketball",
        },
        "creative",
      ),
    ).toBe(false);
    expect(
      activityMatchesCategory(
        {
          category: "Basketball",
        },
        "holidays-challenges",
      ),
    ).toBe(false);
  });
  it("does not attach private route IDs or browsing history to support", () => {
    expect(supportHref("/admin/safeguarding/private-case", true)).toBe(
      "/ask-rwm?topic=general&context=general&requester=parent_carer",
    );
    expect(
      supportHref("/choose-a-path/tech-engineering/robotics-automation"),
    ).toContain("context=paths%2Ftech-engineering%2Frobotics-automation");
    expect(validSupportContext("/account/private")).toBe(false);
    expect(supportContextById("__proto__").id).toBe("general");
    expect(supportContextById("constructor").id).toBe("general");
  });
  it("provides a triage category without external disclosure", () => {
    expect(supportTeam("rules")).toBe("legal_information");
    expect(supportTeam("pathways")).toBe("careers_pathways");
    expect(supportTeam("wellbeing")).toBe("safeguarding");
  });
});
