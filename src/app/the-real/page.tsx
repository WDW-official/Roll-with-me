import { SwipeFeed } from "@/components/swipe-feed";
import { getStories } from "@/lib/content";
export const metadata = {
  title: "The Real — Stories & turning points"
};
export default async function TheReal() {
  return <SwipeFeed kind="stories" stories={await getStories()} />;
}
