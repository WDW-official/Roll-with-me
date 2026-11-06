import { notFound } from "next/navigation";
import Link from "next/link";
import { pathLessons } from "@/lib/paths";
import { PageIntro, ButtonLink } from "@/components/ui";
import { TileArt } from "@/components/art";
import { pathBranches } from "@/lib/structure";
import { SwipeFeed } from "@/components/swipe-feed";
export default async function PathLesson({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const branch = pathBranches.find((b) => b.slug === slug);
  if (branch)
    return (
      <SwipeFeed
        key={slug}
        kind="paths"
        initialFilter={slug}
        title={branch.title}
        description={branch.purpose}
      />
    );
  const lesson = pathLessons.find((l) => l.slug === slug);
  if (!lesson) notFound();
  return (
    <div className="page-width page-content path-lesson">
      <PageIntro
        label={`CHOOSE A PATH / ${lesson.category.toUpperCase()}`}
        title={lesson.title}
        description={lesson.description}
      />
      <div className="article-hero">
        <TileArt kind={lesson.art} />
      </div>
      <div className="article-layout">
        <article className="prose">
          {lesson.steps.map((s, i) => (
            <section key={s.title}>
              <span className="mono path-step">0{i + 1} / YOUR NEXT STEP</span>
              <h2>{s.title.toUpperCase()}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <div className="reflection">
            <h3>TAKE THIS WITH YOU.</h3>
            <p>{lesson.takeaway}</p>
            <label className="field-label" htmlFor="path-reflection">
              What would you like to try? Private, never submitted.
            </label>
            <textarea
              id="path-reflection"
              maxLength={1000}
              placeholder="One small next step…"
            />
          </div>
          {lesson.slug === "apprenticeships-explained" && (
            <p>
              <a
                href="https://www.gov.uk/become-apprentice"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official apprenticeship information on GOV.UK ↗
              </a>
            </p>
          )}
          <Link href="/choose-a-path">← Back to Choose a Path</Link>
        </article>
        <aside>
          <h3>GIVE IT A GO.</h3>
          <p>
            Find supervised opportunities in your area. Always check who’s
            running a session and what you need before joining.
          </p>
          <ButtonLink href="/roll-with-me">Find a local activity</ButtonLink>
          <p className="mono mt-4">
            DEMO ACTIVITIES ARE NOT VERIFIED OR BOOKABLE.
          </p>
        </aside>
      </div>
    </div>
  );
}
