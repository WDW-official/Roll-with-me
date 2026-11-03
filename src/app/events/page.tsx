import { PageIntro, DemoNotice } from "@/components/ui";
import { Discovery } from "@/components/discovery";
import { getOpportunities } from "@/lib/content";
import { isDemo } from "@/lib/env";
export const metadata = {
  title: "What’s on"
};
export default async function Events() {
  return <div className="page-width page-content"><PageIntro label="WHAT’S ON / YOUR CALENDAR" title="GOOD DAYS START HERE." description="Holiday sessions, skill challenges and something to look forward to. Find an age-appropriate session in your corner of London." />{isDemo && <DemoNotice />}<Discovery items={await getOpportunities()} event /></div>;
}
