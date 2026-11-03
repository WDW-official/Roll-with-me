import { PageIntro, ButtonLink } from "./ui";
import { policies } from "@/lib/policies";
export function PolicyPage({
  name
}: {
  name: string;
}) {
  const p = policies[name];
  return <div className="page-width page-content"><PageIntro label={p.label} title={p.title} description={p.intro} /><article className="prose">{p.sections.map(s => <section key={s.title}><h2>{s.title.toUpperCase()}</h2>{s.body.map((b, i) => <p key={i}>{b}</p>)}</section>)}<p className="mono">NOTICE VERSION: 2026-10-30.v1 / DRAFT FOR PRE-LAUNCH REVIEW</p></article><div className="mt-8"><ButtonLink href="/help">Find help & support</ButtonLink></div></div>;
}
