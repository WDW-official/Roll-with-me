import type { Metadata } from "next";
import { PageIntro, DemoNotice } from "@/components/ui";
import { Discovery } from "@/components/discovery";
import { getOpportunities } from "@/lib/content";
import { isDemo } from "@/lib/env";
export const metadata: Metadata = {
  title: "Find your thing"
};
export default async function Opportunities() {
  return <div className="page-width page-content"><PageIntro label="YOUR NEXT MOVE / GET INVOLVED" title="FIND YOUR THING." description="From the court to the creative studio. Explore activities, learn something new and find your people." />{isDemo && <DemoNotice />}<Discovery items={await getOpportunities()} /></div>;
}
