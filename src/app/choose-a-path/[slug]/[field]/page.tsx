import { notFound } from "next/navigation";
import Link from "next/link";
import {
  pathFields,
  pathBranches,
  pathFieldHref,
  discoveryState,
  discoveryHref,
} from "@/lib/structure";
import { pathLessons } from "@/lib/paths";
import { PageIntro, ButtonLink } from "@/components/ui";
import { EditorialArt } from "@/components/editorial-art";
import { SectionNav, OutlineNotice } from "@/components/structure-ui";
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
    field: string;
  }>;
}) {
  const p = await params;
  return {
    title:
      pathFields.find((f) => f.branch === p.slug && f.slug === p.field)
        ?.title ?? "Choose a Path",
  };
}
export default async function FieldPage({
  params,
}: {
  params: Promise<{
    slug: string;
    field: string;
  }>;
}) {
  const { slug: branch, field } = await params;
  const item = pathFields.find((f) => f.branch === branch && f.slug === field);
  if (!item) notFound();
  const lessons = pathLessons.filter((l) => item.lessonSlugs.includes(l.slug));
  const local = discoveryHref(
    discoveryState({
      category: item.activityCategory,
    }),
  );
  return (
    <div className="page-width page-content structure-detail">
      <SectionNav
        links={[
          {
            title: "Choose a Path",
            href: "/choose-a-path",
          },
          {
            title: pathBranches.find((b) => b.slug === branch)!.label,
            href: `/choose-a-path/${branch}`,
          },
          {
            title: "All fields",
            href: "/choose-a-path/directory",
          },
        ]}
      />
      <PageIntro
        label={`CHOOSE A PATH / ${pathBranches.find((b) => b.slug === branch)!.label.toUpperCase()}`}
        title={item.title}
        description={item.purpose}
      />
      <OutlineNotice />
      <div className="article-hero structure-hero">
        <EditorialArt
          route={pathFieldHref(item)}
          slot={
            branch === "tech-engineering"
              ? "path-tech-banner"
              : branch === "sports"
                ? "path-sports-banner"
                : "path-vocation-banner"
          }
          kind={item.art}
        />
      </div>
      <div className="article-layout">
        <article className="prose">
          <h2>START WITH THE BASICS.</h2>
          <ul>
            {item.basics.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h2>A START THAT FITS YOUR AGE.</h2>
          <div className="age-route-grid">
            <section>
              <h3>13–15</h3>
              <p>
                Explore your interest with school support, suitable resources
                and verified supervised tasters.
              </p>
            </section>
            <section>
              <h3>16–17</h3>
              <p>
                Compare age-appropriate training and supervised experience with
                a careers adviser. Check each provider’s entry requirements.
              </p>
            </section>
            <section>
              <h3>18–20</h3>
              <p>
                Explore recognised training, apprenticeships, further study or
                work as appropriate to this field. Check the details of each
                real offer.
              </p>
            </section>
          </div>
          <h2>ONE SMALL NEXT STEP.</h2>
          <p>
            Choose one of the basics above and write down a question you want to
            understand. A safe first project and reviewed beginner resources for
            this field are being prepared.
          </p>
          {lessons.length > 0 && (
            <section>
              <h2>SOMETHING TO READ NOW.</h2>
              {lessons.map((l) => (
                <Link
                  className="lesson-link"
                  href={`/choose-a-path/${l.slug}`}
                  key={l.slug}
                >
                  <strong>{l.title}</strong>
                  <span>{l.description}</span>
                  <span>Read the introduction ↗</span>
                </Link>
              ))}
            </section>
          )}
          <h2>WATCH & LEARN.</h2>
          <p>
            A checked shortlist of beginner videos will appear here. No
            unreviewed videos, course offers or guaranteed places are being
            promoted.
          </p>
          <h2>FIND A TRUSTED INTRODUCTION.</h2>
          <p>
            A trusted relative, school or college adviser can help you explore.
            Practical work with tools, vehicles, machinery or electricity
            requires suitable supervision, permissions and safety arrangements.
          </p>
          <h2>WHERE COULD THIS LEAD?</h2>
          <p>
            Possible routes include tasters, recognised courses,
            apprenticeships, further study or work. They depend on the field,
            your age and the requirements of a real opportunity.
          </p>
          <div className="reflection">
            <label className="field-label" htmlFor="field-note">
              My first question — private, never submitted
            </label>
            <textarea
              id="field-note"
              maxLength={1500}
              placeholder="One thing I’d like to understand…"
            />
          </div>
        </article>
        <aside>
          <h3>TRY SOMETHING LOCALLY.</h3>
          <p>
            Explore the relevant activity category in your area. Demo sessions
            remain unverified and cannot be booked.
          </p>
          <ButtonLink href={local}>Find a local activity</ButtonLink>
          <h3 className="mt-8">RELATED FIELDS.</h3>
          {pathFields
            .filter((f) => f.branch === branch && f.slug !== field)
            .slice(0, 3)
            .map((f) => (
              <Link
                className="aside-topic-link"
                key={f.slug}
                href={pathFieldHref(f)}
              >
                {f.title} ↗
              </Link>
            ))}
        </aside>
      </div>
    </div>
  );
}
