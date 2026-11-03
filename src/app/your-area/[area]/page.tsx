import Link from "next/link";
import { notFound } from "next/navigation";
import { boroughs, zones } from "@/lib/data";
import { getOpportunities } from "@/lib/content";
import { isDemo } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { Area } from "@/lib/models";
import { PageIntro, DemoNotice } from "@/components/ui";
import { Discovery } from "@/components/discovery";
const slugify = (s: string) => s.toLowerCase().replaceAll(" ", "-");
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
  let assignments = Object.entries(boroughs).flatMap(([zone, bs]) => bs.map(borough => ({
    borough,
    zones: [zone]
  })));
  if (!isDemo) {
    await connectDB();
    assignments = await Area.find().select("borough zones -_id").lean();
  }
  const zone = zones.find(z => z.toLowerCase() === area);
  const entry = assignments.find(a => slugify(a.borough) === area);
  if (!zone && !entry) notFound();
  const name = zone ? `${zone.toUpperCase()} LONDON.` : `${entry!.borough.toUpperCase()}.`;
  const bs = zone ? assignments.filter(a => a.zones.includes(zone)).map(a => a.borough) : [];
  return <div className="page-width page-content"><PageIntro label="YOUR AREA / LONDON" title={name} description={`Find sport, creativity, skills and new possibilities ${zone ? "across " + zone + " London" : "in " + entry!.borough}. Your area is a starting point, not a limit.`} />{zone && <div className="borough-links">{bs.map(b => <Link key={b} href={`/your-area/${slugify(b)}`}>{b} ↗</Link>)}</div>}{isDemo && <DemoNotice />}<Discovery items={await getOpportunities()} initialZone={zone ?? ""} initialBorough={entry?.borough ?? ""} /></div>;
}
