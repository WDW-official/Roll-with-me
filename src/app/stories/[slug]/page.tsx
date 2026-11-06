import { notFound } from "next/navigation";
import Link from "next/link";
import { getStories } from "@/lib/content";
import { PageIntro, ButtonLink } from "@/components/ui";
import { TileArt } from "@/components/art";
export default async function StoryDetail({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const story = (await getStories()).find((s) => s.slug === slug);
  if (!story) notFound();
  return (
    <article className="page-width page-content">
      <PageIntro
        label={`${story.series} / ${story.duration}`}
        title={story.title}
        description={story.excerpt}
      />
      <div className="content-note">
        <strong>BEFORE YOU READ / </strong>
        {story.contentNote}
      </div>
      <div className="article-hero">
        <TileArt kind={story.art} />
      </div>
      <div className="article-layout">
        <div className="prose">
          <span className="status-label">
            {story.type}
            {story.demo ? " / demo" : ""}
          </span>
          {story.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="reflection">
            <h3>A MOMENT FOR YOU.</h3>
            <p>{story.reflection}</p>
            <label htmlFor="reflection" className="field-label">
              Your private reflection (stays on this page, never submitted)
            </label>
            <textarea
              id="reflection"
              placeholder="You can also just think about it. No answer is required."
              maxLength={2000}
            />
          </div>
          <Link href="/stories">← More stories</Link>
        </div>
        <aside>
          <h3>MAKE YOUR NEXT MOVE.</h3>
          <p>
            Find a new routine, a new skill or a place where you can be
            yourself.
          </p>
          <ButtonLink href={`/opportunities/${story.opportunitySlug}`}>
            Explore the activity
          </ButtonLink>
          <h3 className="mt-8">NEED SOMEONE?</h3>
          <p>
            If this brought something up, you don’t have to handle it alone.
          </p>
          <Link className="text-link" href="/help">
            Trusted help & support ↗
          </Link>
          <p>
            Immediate danger? Call <a href="tel:999">999</a>.
          </p>
        </aside>
      </div>
    </article>
  );
}
