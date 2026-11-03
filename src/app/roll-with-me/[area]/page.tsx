import { notFound } from "next/navigation";
import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { SectionNav } from "@/components/structure-ui";
import { getAreaBoroughs } from "@/lib/content";
import { londonAreas, discoveryState, discoveryHref } from "@/lib/structure";
export default async function AreaPage({
  params
}: {
  params: Promise<{
    area: string;
  }>;
}) {
  const {
    area
  } = await params;
  const name = londonAreas.find(a => a.toLowerCase() === area);
  if (!name) notFound();
  const boroughs = (await getAreaBoroughs())[name] ?? [];
  return <div className="page-width page-content"><PageIntro label="ROLL WITH ME / YOUR AREA" title={`${name.toUpperCase()} LONDON.`} description="Choose a borough or explore the whole area. These are browsing shortcuts, not fixed identities or official boundaries." /><SectionNav links={[{
      title: `All ${name} London`,
      href: discoveryHref(discoveryState({
        area: name
      }))
    }, {
      title: "Change area",
      href: "/your-area"
    }]} /><div className="borough-links">{boroughs.map(b => <Link key={b} href={`/roll-with-me/${area}/${b.toLowerCase().replaceAll(" ", "-")}`}>{b} ↗</Link>)}</div></div>;
}
