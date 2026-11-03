import { PageIntro, ButtonLink } from "@/components/ui";
import { currentUser } from "@/lib/auth";
import { Booking, Content } from "@/lib/models";
export const dynamic = "force-dynamic";
export default async function Impact() {
  const user = await currentUser();
  const allowed = user && ["admin", "researcher"].includes(user.role);
  return <div className="page-width page-content"><PageIntro label="IMPACT / RESTRICTED PARTNER ENVIRONMENT" title="MEANINGFUL CHANGE. HONEST EVIDENCE." description="Governance, methodology and appropriately aggregated outcomes. Attendance counts alone don’t demonstrate a reduction in violence or establish causation." />{allowed ? <div className="metric-grid"><div className="metric"><strong>{await Booking.countDocuments({
            status: "attended"
          })}</strong><span>COMPLETED ATTENDANCE</span></div><div className="metric"><strong>{await Content.countDocuments({
            kind: "opportunity",
            status: "published",
            demo: false
          })}</strong><span>PUBLISHED ACTIVITIES</span></div></div> : <><div className="notice"><p>Authorised staff access is required for internal reporting. There are no invented impact figures or raw participant records in this preview.</p></div><ButtonLink href="/sign-in">Authorised sign in</ButtonLink></>}<div className="prose mt-10"><h2>PROPORTIONATE REPORTING.</h2><p>Future partner reports must suppress small groups, explain sampling and disclose limitations. Sponsors do not receive individual activity trails or sensitive submissions. This build provides operational counts only; no public research findings or funder dashboard is claimed.</p></div></div>;
}
