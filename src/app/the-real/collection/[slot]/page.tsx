import { notFound } from "next/navigation";
import { storySlots } from "@/lib/structure";
import { PageIntro } from "@/components/ui";
import { SectionNav } from "@/components/structure-ui";
export default async function StorySlot({
  params
}: {
  params: Promise<{
    slot: string;
  }>;
}) {
  const {
    slot
  } = await params;
  const item = storySlots.find(s => s.slug === slot);
  if (!item) notFound();
  return <div className="page-width page-content"><SectionNav links={[{
      title: "The collection",
      href: "/the-real/collection"
    }, {
      title: "The Real",
      href: "/the-real"
    }]} /><PageIntro label={`THE REAL / ${item.id} / MATERIAL AWAITED`} title="THIS STORY STARTS WITH ITS VOICE." description="This is a reserved story space. No account, identity, event or outcome is being invented for it." /><div className="prose"><h2>WHAT WILL BELONG HERE?</h2><p>An approved introduction, the experience and its context, a turning point, consequences and learning. A full story will include appropriate content notes and a text equivalent for any media.</p><h2>PERMISSION COMES FIRST.</h2><p>The contributor’s permissions, age-appropriate consent and editorial/safeguarding review are needed before publication. Final themes and titles will follow the actual material.</p><h2>A WAY FORWARD.</h2><p>Each story will connect to relevant help, a learning path or a verified activity. Private reflection will be optional, with no public youth comments.</p></div></div>;
}
