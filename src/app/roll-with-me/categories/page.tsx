import { activityCategories, discoveryState, discoveryQuery } from "@/lib/structure";
import { PageIntro } from "@/components/ui";
import { TopicCard, SectionNav } from "@/components/structure-ui";
export const metadata = {
  title: "Local activity categories"
};
export default async function Categories({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const state = discoveryState(await searchParams);
  return <div className="page-width page-content"><PageIntro label="ROLL WITH ME / CHOOSE YOUR THING" title="WHAT WILL YOU GET INTO?" description="Choose a category, then explore your area. Your area and age choices travel with you in the page link." /><SectionNav links={[{
      title: "Back to local discovery",
      href: `/roll-with-me?${discoveryQuery(state)}`
    }, {
      title: "Help joining",
      href: "/ask-rwm?topic=activities&context=local"
    }]} /><div className="structure-grid">{activityCategories.map(c => <TopicCard key={c.slug} title={c.title} purpose={c.purpose} art={c.art} href={`/roll-with-me/categories/${c.slug}?${discoveryQuery({
        ...state,
        category: c.slug
      })}`} />)}</div></div>;
}
