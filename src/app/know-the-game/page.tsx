import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, DemoNotice, EmptyState } from "@/components/ui";
import { getGuides } from "@/lib/content";
import { isDemo } from "@/lib/env";
export const metadata = {
  title: "Know your rights",
};
export default async function Legal() {
  const guides = await getGuides();
  return (
    <div className="page-width page-content">
      <PageIntro
        label="KNOW THE GAME / ENGLAND & WALES"
        title={"KNOW MORE.\nMOVE SMARTER."}
        description="Your rights, real consequences and everyday decisions. Clear information, trusted sources and a way to get support."
      />
      {isDemo && <DemoNotice legal />}
      <div className="guide-grid">
        {guides.map((g, i) => (
          <Link
            className="guide-card"
            href={`/know-the-game/${g.slug}`}
            key={g.slug}
          >
            <span className="mono">
              0{i + 1} / {g.category.toUpperCase()}
            </span>
            <ArrowUpRight className="guide-arrow" size={24} />
            <h2>{g.title}</h2>
            <p>{g.summary}</p>
            <div className="guide-footer mono">
              {g.demo
                ? "DRAFT / REQUIRES QUALIFIED LEGAL REVIEW"
                : `REVIEWED ${g.reviewedAt} / ENGLAND & WALES`}
            </div>
          </Link>
        ))}
      </div>
      {!guides.length && (
        <EmptyState
          title="PROPERLY CHECKED. BEFORE IT’S SHARED."
          description="Legal guides will appear after qualified review. Visit GOV.UK for official guidance or speak with a solicitor about your situation."
        />
      )}
      <div className="prose mt-8">
        <h2>YOUR SITUATION IS YOURS.</h2>
        <p>
          General information can’t tell you the outcome of an individual case.
          Facts, evidence and circumstances matter. If you need advice, speak to
          a qualified solicitor.
        </p>
        <p>
          Future topics include online harassment, exploitation, school rights,
          apprenticeships, personal finance and conflict resolution. These
          guides are not published yet.
        </p>
      </div>
    </div>
  );
}
