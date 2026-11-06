import { notFound } from "next/navigation";
import { getStories } from "@/lib/content";
import { storyThemeSlug } from "@/lib/structure";
import { PageIntro } from "@/components/ui";
import { StoryExplorer } from "@/components/discovery";
import { SectionNav } from "@/components/structure-ui";
export default async function ThemePage({
  params,
}: {
  params: Promise<{
    theme: string;
  }>;
}) {
  const { theme } = await params;
  const stories = (await getStories()).filter(
    (s) => storyThemeSlug(s.theme) === theme,
  );
  if (!stories.length) notFound();
  return (
    <div className="page-width page-content">
      <SectionNav
        links={[
          {
            title: "All themes",
            href: "/the-real/themes",
          },
          {
            title: "The Real",
            href: "/the-real",
          },
        ]}
      />
      <PageIntro
        label="THE REAL / STORY THEME"
        title={stories[0].theme.toUpperCase()}
        description="Different perspectives and possible turning points. Open a story at your own pace."
      />
      {stories.every((s) => s.demo) && (
        <div className="content-note">
          Fictional editorial examples. No real person’s testimony is
          represented.
        </div>
      )}
      <StoryExplorer stories={stories} />
    </div>
  );
}
