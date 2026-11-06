import { SwipeFeed } from "@/components/swipe-feed";
import { getGuides } from "@/lib/content";
export const metadata = {
  title: "Know the Rules",
};
export default async function Rules() {
  return <SwipeFeed kind="rules" guides={await getGuides()} />;
}
