import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, DemoNotice } from "@/components/ui";
import { Coordinate, RouteMotif } from "@/components/icons";
import { zones } from "@/lib/data";
import { isDemo } from "@/lib/env";
export const metadata = {
  title: "Your area",
};
export default function YourArea() {
  return (
    <div className="page-width page-content">
      <PageIntro
        label="LONDON / YOUR AREA"
        title={"YOUR CORNER.\nMORE POSSIBILITIES."}
        description="You don’t need to share your location. Choose a part of London, then a borough, and explore at your own pace."
      />
      <div className="zone-grid">
        {zones.map((z) => (
          <Link
            className="zone-card"
            key={z}
            href={`/your-area/${z.toLowerCase()}`}
          >
            <Coordinate className="zone-icon" />
            <ArrowUpRight className="zone-arrow" />
            <h2>
              {z.toUpperCase()}
              <br />
              LONDON.
            </h2>
            <p className="mono">EXPLORE YOUR AREA ↗</p>
          </Link>
        ))}
      </div>
      {isDemo && <DemoNotice />}
      <div className="prose">
        <h2>LONDON DOESN’T FIT IN A BOX.</h2>
        <p>
          Areas overlap. These directions are browsing shortcuts, not fixed
          identities or official boundaries. Borough assignments can be updated
          by RWM staff with local input.
        </p>
        <Link href="/opportunities">See all London activities ↗</Link>
      </div>
      <RouteMotif className="w-52 mt-8 text-[var(--orange-ink)]" />
    </div>
  );
}
