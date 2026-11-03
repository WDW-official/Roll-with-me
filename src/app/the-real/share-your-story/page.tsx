import { PageIntro, ButtonLink } from "@/components/ui";
import { SectionNav } from "@/components/structure-ui";
export const metadata = {
  title: "An interest in sharing a story"
};
export default function ShareStory() {
  return <div className="page-width page-content"><SectionNav links={[{
      title: "The Real",
      href: "/the-real"
    }, {
      title: "The collection",
      href: "/the-real/collection"
    }]} /><PageIntro label="THE REAL / YOUR CHOICE" title="A STORY TO TALK ABOUT?" description="Start with an expression of interest. You do not need to give the story itself, identify other people or describe a difficult experience here." /><div className="prose"><h2>A CONVERSATION BEFORE A PUBLICATION.</h2><p>A human team would discuss the format, support, privacy and permissions with you before any story is developed. Expressing an interest is not a publication release or a guarantee that a story will be used.</p><h2>KEEP THE FIRST MESSAGE GENERAL.</h2><p>You could say that you are interested in sharing a turning point, a creative journey or an experience of finding support. Avoid names, detailed allegations, traumatic descriptions or uploads of private material.</p><h2>YOU CAN ASK ON SOMEONE’S BEHALF.</h2><p>A parent or carer can ask about the process. That does not replace the contributor’s appropriate permissions and choices.</p></div><div className="support-link-row mt-8"><ButtonLink href="/ask-rwm?topic=story&context=stories">Express an interest</ButtonLink><ButtonLink secondary href="/ask-rwm?topic=story&context=stories&requester=parent_carer">Ask as a parent or carer</ButtonLink></div></div>;
}
