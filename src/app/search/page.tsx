import { PageIntro } from "@/components/ui";
import { SiteSearch } from "@/components/discovery";
import { getOpportunities, getStories, getGuides } from "@/lib/content";
export const metadata = {
  title: "Search",
};
export default async function Search() {
  const [opportunities, stories, guides] = await Promise.all([
    getOpportunities(),
    getStories(),
    getGuides(),
  ]);
  return (
    <div className="page-width page-content">
      <PageIntro
        label="FIND YOUR WAY / RWM"
        title="WHAT’S YOUR MOVE?"
        description="Search the stories, discover activities and find your way to clearer information."
      />
      <SiteSearch
        opportunities={opportunities}
        stories={stories}
        guides={guides}
      />
    </div>
  );
}
