import Link from "next/link";
import { ArrowUpRight, BookOpen, Compass, MapPin, Play } from "lucide-react";
export function PillarLauncher() {
  return <section className="pillar-launcher page-width" aria-label="Choose one of RWM’s four sections"><div className="pillar-launcher-intro"><span className="mono">FOUR WAYS IN. ONE MOVEMENT.</span><h2>WHERE WILL YOU START?</h2><p>Pick a section. Swipe. Find your next move.</p></div><div className="pillar-launcher-grid">{[{
        name: "KNOW THE RULES.",
        description: "Your rights. Real situations.",
        href: "/know-the-rules",
        Icon: BookOpen,
        number: "01",
        type: "rules"
      }, {
        name: "CHOOSE A PATH.",
        description: "Tech. Sport. Practical skills.",
        href: "/choose-a-path",
        Icon: Compass,
        number: "02",
        type: "paths"
      }, {
        name: "ROLL WITH ME.",
        description: "Your area. Things to get into.",
        href: "/roll-with-me",
        Icon: MapPin,
        number: "03",
        type: "local"
      }, {
        name: "THE REAL.",
        description: "Stories. Turns. Other routes.",
        href: "/the-real",
        Icon: Play,
        number: "04",
        type: "real"
      }].map(p => <Link href={p.href} key={p.href} className={`pillar-launcher-card pillar-${p.type}`}><div><p.Icon size={21} /><span className="mono">{p.number}</span></div><h3>{p.name}</h3><p>{p.description}</p><ArrowUpRight className="pillar-launcher-arrow" size={19} /></Link>)}</div></section>;
}
