import { notFound } from "next/navigation";
import { SwipeFeed } from "@/components/swipe-feed";
import { ruleBranches } from "@/lib/structure";
import { getGuides } from "@/lib/content";
export default async function RuleBranchPage({
  params
}: {
  params: Promise<{
    branch: string;
  }>;
}) {
  const {
    branch
  } = await params;
  const item = ruleBranches.find(b => b.slug === branch);
  if (!item) notFound();
  return <SwipeFeed key={branch} kind="rules" initialFilter={branch} title={item.title} description={item.purpose} guides={await getGuides()} />;
}
