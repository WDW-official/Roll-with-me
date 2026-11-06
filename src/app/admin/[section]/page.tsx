import { notFound } from "next/navigation";
import { adminSections } from "@/lib/data";
import { AdminPage } from "@/components/admin-page";
export const dynamic = "force-dynamic";
export default async function Page({
  params,
}: {
  params: Promise<{
    section: string;
  }>;
}) {
  const { section } = await params;
  if (![...adminSections, "attendance"].includes(section)) notFound();
  return <AdminPage key={section} section={section} />;
}
