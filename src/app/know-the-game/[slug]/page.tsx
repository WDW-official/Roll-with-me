import { notFound } from "next/navigation";
import { getGuides } from "@/lib/content";
import { legalSources } from "@/lib/data";
import { PageIntro, DemoNotice, ButtonLink } from "@/components/ui";
export default async function GuideDetail({
  params
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const {
    slug
  } = await params;
  const guide = (await getGuides()).find(g => g.slug === slug);
  if (!guide) notFound();
  return <div className="page-width page-content"><PageIntro label={`${guide.category} / ${guide.jurisdiction}`} title={guide.title} description={guide.summary} />{guide.demo && <DemoNotice legal />}<div className="article-layout"><article className="prose">{guide.sections.map(s => <section key={s.title}><h2>{s.title.toUpperCase()}</h2><p>{s.body}</p></section>)}<h2>GO TO THE SOURCE.</h2><ul>{guide.sources.map(id => legalSources.find(s => s.id === id)).filter(s => !!s).map(s => <li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a></li>)}</ul><p>These are authoritative source links, not a claim that this draft has been verified against current law. Check the linked source and seek advice for your situation.</p><ButtonLink href={`/ask-rwm?topic=correction`}>Suggest a correction</ButtonLink></article><aside><h3>REVIEW RECORD.</h3><p>Jurisdiction: <strong>{guide.jurisdiction}</strong></p><p>Status: <strong>{guide.demo ? "DEMO / requires lawyer review" : guide.status}</strong></p><p>Qualified reviewer: {guide.reviewer ?? "Not yet appointed"}</p><p>Reviewed: {guide.reviewedAt ?? "Not reviewed"}</p><p>Next review: {guide.nextReviewAt ?? "Required before publication"}</p><p>Version: 1 / Initial draft</p><hr className="my-5 border-[var(--line)]" /><p>This is general information, not advice from a solicitor. Case outcomes depend on the facts.</p><ButtonLink href="/help">Get support</ButtonLink></aside></div></div>;
}
