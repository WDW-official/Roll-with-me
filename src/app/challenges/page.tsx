import { PageIntro, DemoNotice, OpportunityCard } from "@/components/ui";
import { getOpportunities } from "@/lib/content";
import { isDemo } from "@/lib/env";
export const metadata = {
  title: "Challenges",
};
export default async function Challenges() {
  const items = (await getOpportunities()).filter((o) =>
    ["Football", "Athletics", "Coding & tech"].includes(o.category),
  );
  return (
    <div className="page-width page-content">
      <PageIntro
        label="CHALLENGES / PROGRESS IS PERSONAL"
        title="WHAT WILL YOU TRY?"
        description="A first website. A better free kick. Your own personal best. Supervised challenges built around learning and participation."
      />
      {isDemo && <DemoNotice />}
      <div className="cards-grid">
        {items.map((o) => (
          <OpportunityCard key={o.slug} item={o} />
        ))}
      </div>
      <div className="prose mt-10">
        <h2>YOUR PROGRESS. YOUR PACE.</h2>
        <p>
          No public youth leaderboards or location trails. Before any live
          challenge opens, staff must approve its age bands, supervision, risk
          assessment, entry conditions and accessibility. No prizes or real
          availability are promised in this preview.
        </p>
      </div>
    </div>
  );
}
