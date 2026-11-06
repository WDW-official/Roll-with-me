import { getStories } from "@/lib/content";
import { storyThemeSlug } from "@/lib/structure";
import { PageIntro, EmptyState } from "@/components/ui";
import { SectionNav, TopicCard } from "@/components/structure-ui";
export const metadata = {
  title: "Story themes",
};
export default async function Themes() {
  const stories = await getStories();
  const themes = [...new Set(stories.map((s) => s.theme))];
  return (
    <div className="page-width page-content">
      <PageIntro
        label="THE REAL / DIFFERENT PERSPECTIVES"
        title="MORE TO EVERY STORY."
        description="Themes should follow the stories people choose to share. Existing fictional examples are labelled; the ten real story spaces await material."
      />
      <SectionNav
        links={[
          {
            title: "The Real",
            href: "/the-real",
          },
          {
            title: "The ten-story collection",
            href: "/the-real/collection",
          },
          {
            title: "Share an interest",
            href: "/the-real/share-your-story",
          },
        ]}
      />
      {themes.length ? (
        <div className="structure-grid">
          {themes.map((t) => (
            <TopicCard
              key={t}
              title={t.toUpperCase()}
              purpose={
                stories.filter((s) => s.theme === t).every((s) => s.demo)
                  ? "Explore a clearly labelled fictional editorial example in this theme."
                  : "Explore approved stories connected with this theme."
              }
              href={`/the-real/themes/${storyThemeSlug(t)}`}
              caption={
                stories.filter((s) => s.theme === t).every((s) => s.demo)
                  ? "DEMO THEME"
                  : "STORY THEME"
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="THE THEMES WILL FOLLOW THE STORIES."
          description="No story themes have been published yet."
        />
      )}
    </div>
  );
}
