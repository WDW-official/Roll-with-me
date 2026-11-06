import { PageIntro } from "@/components/ui";
import { StoryExplorer } from "@/components/discovery";
import { getStories } from "@/lib/content";
export const metadata = {
  title: "The stories",
};
export default async function Stories() {
  return (
    <div className="page-width page-content">
      <PageIntro
        label="STORIES / THE REAL"
        title={"DIFFERENT STARTS.\nOPEN ENDINGS."}
        description="New perspectives, turning points and the people we become along the way. There’s always more to the story."
      />
      <StoryExplorer stories={await getStories()} />
    </div>
  );
}
