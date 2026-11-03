import { notFound } from "next/navigation";
import Link from "next/link";
import { ruleTopics, ruleBranches, ruleTopicHref } from "@/lib/structure";
import { getGuides } from "@/lib/content";
import { legalSources } from "@/lib/data";
import { PageIntro, DemoNotice } from "@/components/ui";
import { EditorialArt } from "@/components/editorial-art";
import { OutlineNotice, SectionNav, LearningSections } from "@/components/structure-ui";
export async function generateMetadata({
  params
}: {
  params: Promise<{
    branch: string;
    topic: string;
  }>;
}) {
  const p = await params;
  return {
    title: ruleTopics.find(t => t.branch === p.branch && t.slug === p.topic)?.title ?? "Know the Rules"
  };
}
export default async function RuleTopicPage({
  params
}: {
  params: Promise<{
    branch: string;
    topic: string;
  }>;
}) {
  const {
    branch,
    topic
  } = await params;
  const item = ruleTopics.find(t => t.branch === branch && t.slug === topic);
  if (!item) notFound();
  const guides = branch === "the-law" ? (await getGuides()).filter(g => item.guideSlugs.includes(g.slug)) : [];
  const related = ruleTopics.filter(t => t.branch === branch && t.slug !== topic).slice(0, 3);
  return <div className="page-width page-content structure-detail"><SectionNav links={[{
      title: "Know the Rules",
      href: "/know-the-rules"
    }, {
      title: ruleBranches.find(b => b.slug === branch)!.title,
      href: `/know-the-rules/${branch}`
    }, {
      title: "Facts, Context & Myths",
      href: "/know-the-rules/facts-and-myths"
    }]} /><PageIntro label={`KNOW THE RULES / ${branch === "the-law" ? "THE LAW" : "THE TERRAIN"}`} title={item.title} description={item.purpose} />{!guides.length ? <OutlineNotice legal={branch === "the-law"} /> : guides.some(g => g.demo) ? <DemoNotice legal /> : <div className="notice"><p>Reviewed general information for England and Wales. An individual case needs advice from a qualified solicitor.</p></div>}<div className="article-hero structure-hero"><EditorialArt slot={branch === "the-law" ? "rules-law-banner" : "terrain-banner"} kind={item.art} /></div><div className="article-layout"><article>{guides.map(g => <section className="prose reviewed-guide" key={g.slug}><span className="status-label">{g.demo ? "ILLUSTRATIVE DRAFT" : `REVIEWED ${g.reviewedAt}`}</span>{g.sections.map((s, i) => <section key={i}><h2>{s.title.toUpperCase()}</h2><p>{s.body}</p></section>)}<h3>OFFICIAL SOURCES.</h3><ul>{g.sources.map(id => legalSources.find(s => s.id === id)).filter(s => !!s).map(s => <li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a></li>)}</ul><p className="guide-review-record">{g.demo ? "Qualified legal review has not taken place." : `Reviewer: ${g.reviewer}. Next review: ${g.nextReviewAt}.`}</p></section>)}<LearningSections questions={item.questions} /></article><aside><h3>YOUR RIGHTS. YOUR CHOICES.</h3><p>Law, practical suggestions and personal values should be clearly distinguished. No appearance or communication style determines whether you deserve safety.</p><h3 className="mt-8">ANOTHER PART OF THE PICTURE.</h3>{related.map(t => <Link className="aside-topic-link" href={ruleTopicHref(t)} key={t.slug}>{t.title} ↗</Link>)}<p>Immediate danger in the UK? Call <a href="tel:999">999</a>.</p></aside></div></div>;
}
