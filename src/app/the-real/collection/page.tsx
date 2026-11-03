import { storySlots } from "@/lib/structure";
import { PageIntro } from "@/components/ui";
import { SectionNav, TopicCard } from "@/components/structure-ui";
export const metadata = {
  title: "The first ten stories"
};
export default function Collection() {
  return <div className="page-width page-content"><PageIntro label="THE REAL / THE COLLECTION" title="TEN SPACES. REAL POSSIBILITIES." description="The first ten story spaces are reserved. Their titles, voices and themes will come from the material contributed and reviewed with permission." /><div className="content-note">No real story material has been supplied for these spaces. They are planning slots, not published testimony. Fictional design examples remain clearly separated.</div><SectionNav links={[{
      title: "The Real",
      href: "/the-real"
    }, {
      title: "Story themes",
      href: "/the-real/themes"
    }, {
      title: "Express an interest in sharing",
      href: "/the-real/share-your-story"
    }]} /><div className="story-slot-grid">{storySlots.map(s => <TopicCard key={s.id} title={s.title} purpose="A title, experience and turning point will be developed with the contributor after permission and review." href={`/the-real/collection/${s.slug}`} caption={`${s.id} / MATERIAL AWAITED`} />)}</div></div>;
}
