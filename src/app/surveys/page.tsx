import Link from "next/link";
import { PageIntro, EmptyState } from "@/components/ui";
import { isDemo } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { Study } from "@/lib/models";
export const dynamic = "force-dynamic";
export default async function Surveys() {
  let studies: {
    slug: string;
    title: string;
    purpose: string;
  }[] = [];
  if (!isDemo) {
    await connectDB();
    studies = await Study.find({
      status: "published",
      category: {
        $ne: "evidence"
      }
    }).select("title slug purpose").lean();
  }
  return <div className="page-width page-content"><PageIntro label="YOUR VOICE / FEEDBACK & RESEARCH" title={"WHAT MATTERS TO YOU\nMATTERS HERE."} description="Taking part is always your choice. Every live study needs a clear purpose, reviewed questions and a plain-English explanation of how information will be used." />{isDemo ? <><div className="notice"><p>Research preview only. No live studies are open and no responses are being collected. The sample below shows how a voluntary, versioned questionnaire will work.</p></div><Link href="/surveys/your-next-move" className="guide-card block"><span className="mono">ANONYMOUS FEEDBACK DESIGN / DEMO</span><h2>WHAT WOULD YOU LIKE TO TRY?</h2><p>A short, optional questionnaire about activity interests and barriers. Explore the form without sharing personal details.</p><div className="guide-footer mono">PREVIEW QUESTIONNAIRE / VERSION 1 / NO LIVE COLLECTION ↗</div></Link></> : studies.length ? <div className="guide-grid">{studies.map(s => <Link className="guide-card" key={s.slug} href={`/surveys/${s.slug}`}><h2>{s.title}</h2><p>{s.purpose}</p><span className="text-link mt-5">Read participant information ↗</span></Link>)}</div> : <EmptyState title="NO OPEN STUDIES RIGHT NOW." description="You can still help shape RWM through general ideas and community feedback when intake opens." />}<div className="prose mt-10"><h2>THREE CLEAR BOUNDARIES.</h2><p><strong>Feedback:</strong> no direct identifiers by default. We explain the limits of anonymity and avoid asking for traumatic detail.</p><p><strong>Research:</strong> a reviewed protocol, purpose, eligibility, consent information, retention and withdrawal policy. Questionnaire versions stay fixed once live.</p><p><strong>Potential legal evidence:</strong> a separate restricted process, disabled pending legal and safeguarding review. Ordinary survey answers are not automatically representative, legally certified or court-admissible.</p></div></div>;
}
