import { AdminPage } from "@/components/admin-page";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Staff workspace",
  robots: {
    index: false,
    follow: false,
  },
};
export default function Page() {
  return <AdminPage section="overview" />;
}
