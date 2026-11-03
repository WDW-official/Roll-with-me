import { PageIntro } from "@/components/ui";
import { SectionNav, OutlineNotice } from "@/components/structure-ui";
export const metadata = {
  title: "Facts, Context & Myths"
};
export default function Facts() {
  return <div className="page-width page-content"><SectionNav links={[{
      title: "The Law",
      href: "/know-the-rules/the-law"
    }, {
      title: "The Terrain",
      href: "/know-the-rules/the-terrain"
    }]} /><PageIntro label="KNOW THE RULES / CHECK THE CONTEXT" title="FACTS. CONTEXT. BETTER QUESTIONS." description="A number needs an explanation. This resource is being prepared to help you ask what a claim means, where it came from and what it cannot tell you." /><OutlineNotice /><div className="prose"><h2>WHAT IS BEING MEASURED?</h2><p>Being harmed, being stopped, being suspected and being convicted are different things. A figure about one should not be presented as a figure about another.</p><h2>WHERE AND WHEN?</h2><p>Every future statistics card needs the place, time period, source and definition. Comparisons need suitable denominators and an explanation of missing information.</p><h2>A PERSON IS MORE THAN A CATEGORY.</h2><p>Population patterns cannot tell you what a particular person has done or will do. This resource will not use offender-look images or turn race, clothing or a postcode into a judgement about an individual.</p><h2>WHAT WILL APPEAR HERE?</h2><p>Reviewed source notes, myth/fact explainers and clear limitations. No new demographic statistics are being claimed in this outline.</p><h2>GO TO THE SOURCE.</h2><p><a href="https://www.college.police.uk/app/stop-and-search/fair" target="_blank" rel="noopener noreferrer">College of Policing — fair use of stop and search ↗</a></p><p><a href="https://www.gov.uk/government/publications/pace-code-a-december-2023/pace-code-a-2023-accessible" target="_blank" rel="noopener noreferrer">PACE Code A — official reference ↗</a></p></div></div>;
}
