import { isDemo } from "./env";
import { opportunities, stories, guides, boroughs } from "./data";
import { connectDB } from "./db";
import { Content, Provider, User, Area } from "./models";
import { publishableGuide, publishableOpportunity } from "./policy";
import type { Opportunity, Story, Guide } from "./types";
import { publicOpportunity, publicStory, publicGuide } from "./public-content";
import { connection } from "next/server";
export async function getOpportunities(): Promise<Opportunity[]> {
  await connection();
  if (isDemo) return opportunities;
  await connectDB();
  const docs = await Content.find({
    kind: "opportunity",
    status: "published",
    demo: false,
  }).lean();
  const providers = await Provider.find({
    verified: true,
  }).distinct("_id");
  return docs
    .filter((d) =>
      publishableOpportunity({
        ...d,
        ...d.data,
        providerVerified: providers.some(
          (p) => String(p) === String(d.data.providerId),
        ),
      }),
    )
    .map((d) =>
      publicOpportunity({
        ...d.data,
        slug: d.slug,
        status: d.status,
        demo: false,
        providerVerified: true,
      } as Opportunity),
    );
}
export async function getStories(): Promise<Story[]> {
  await connection();
  if (isDemo) return stories;
  await connectDB();
  const docs = await Content.find({
    kind: "story",
    status: "published",
    "data.editorialApproved": true,
    "data.safeguardingApproved": true,
    "data.releaseApproved": true,
    demo: false,
  }).lean();
  return docs.map((d) =>
    publicStory({
      ...d.data,
      slug: d.slug,
      status: d.status,
      demo: false,
    } as Story),
  );
}
export async function getGuides(): Promise<Guide[]> {
  await connection();
  if (isDemo) return guides;
  await connectDB();
  const docs = await Content.find({
    kind: "guide",
    status: "published",
    demo: false,
  }).lean();
  const reviewed = docs.filter((d) =>
    publishableGuide({
      ...d,
      ...d.data,
    }),
  );
  const reviewers = await User.find({
    _id: {
      $in: reviewed.map((d) => d.data.reviewer),
    },
    role: "legal_reviewer",
    qualificationVerified: true,
    disabledAt: {
      $exists: false,
    },
  })
    .select("displayName")
    .lean();
  return reviewed
    .filter((d) =>
      reviewers.some((r) => String(r._id) === String(d.data.reviewer)),
    )
    .map((d) =>
      publicGuide({
        ...d.data,
        slug: d.slug,
        status: d.status,
        reviewer: reviewers.find(
          (r) => String(r._id) === String(d.data.reviewer),
        )!.displayName,
        demo: false,
      } as Guide),
    );
}
export async function getAreaBoroughs(): Promise<Record<string, string[]>> {
  await connection();
  if (isDemo) return boroughs;
  await connectDB();
  const areas = await Area.find().select("borough zones -_id").lean();
  const result: Record<string, string[]> = {
    North: [],
    East: [],
    West: [],
    South: [],
  };
  for (const area of areas)
    for (const zone of area.zones)
      if (result[zone]) result[zone].push(area.borough);
  for (const zone of Object.keys(result)) result[zone].sort();
  return result;
}
