import { notFound, redirect } from "next/navigation";
import { londonAreas, discoveryHref, discoveryState } from "@/lib/structure";
export default async function AreaPage({ params, searchParams }: {
  params: Promise<{ area: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ area }, query] = await Promise.all([params, searchParams]);
  const name = londonAreas.find(a => a.toLowerCase() === area.toLowerCase());
  if (!name) notFound();
  redirect(discoveryHref(discoveryState({ ...query, area: name })));
}
