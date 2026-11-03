import mongoose from "mongoose";
import { connectDB } from "../src/lib/db";
import { Content, Area } from "../src/lib/models";
import { opportunities, stories, guides, boroughs } from "../src/lib/data";
async function main() {
  await connectDB();
  let inserted = 0;
  for (const [kind, items] of [["opportunity", opportunities], ["story", stories], ["guide", guides]] as const) {
    for (const item of items) {
      const result = await Content.updateOne({
        slug: item.slug
      }, {
        $setOnInsert: {
          kind,
          slug: item.slug,
          title: item.title,
          status: "draft",
          demo: true,
          data: item
        }
      }, {
        upsert: true,
        runValidators: true
      });
      inserted += result.upsertedCount;
    }
  }
  for (const [zone, names] of Object.entries(boroughs)) for (const borough of names) await Area.updateOne({
    borough
  }, {
    $setOnInsert: {
      borough,
      zones: [zone]
    }
  }, {
    upsert: true,
    runValidators: true
  });
  console.log(`Seed complete: ${inserted} new demo drafts. Nothing verified or published. Existing records preserved.`);
}
main().catch(e => {
  console.error(e instanceof Error ? e.message : "Seed failed");
  process.exitCode = 1;
}).finally(() => mongoose.disconnect());
