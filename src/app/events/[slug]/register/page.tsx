import { notFound } from "next/navigation";
import { PageIntro, DemoNotice, ButtonLink } from "@/components/ui";
import { getOpportunities } from "@/lib/content";
import { currentUser } from "@/lib/auth";
import { RwmForm } from "@/components/forms";
import { LocalContext } from "@/components/local-context";
export default async function Register({
  params,
  searchParams
}: {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const {
    slug
  } = await params;
  const item = (await getOpportunities()).find(o => o.slug === slug);
  if (!item) notFound();
  const user = await currentUser();
  const query = await searchParams;
  return <div className="page-width page-content"><LocalContext query={query} /><PageIntro label="REGISTRATION / YOUR NEXT MOVE" title={item.title} description="Your booking is private. Operational staff can access emergency information when needed for running the session." />{item.demo ? <><DemoNotice /><p className="prose">No registration is open for this illustrative session.</p></> : !user ? <ButtonLink href="/sign-in">Sign in to register</ButtonLink> : <><div className="notice"><p>Under 18? Your request stays pending until a separate verified guardian gives event-specific consent. You will receive a private one-time code to share with them. No other account activity is shared. A waiting list applies if the session fills up.</p></div><RwmForm endpoint="/api/bookings" extra={{
        slug
      }} submitLabel="Request a place" fields={[{
        name: "emergencyName",
        label: "Emergency contact name",
        required: true,
        maxLength: 80
      }, {
        name: "emergencyPhone",
        label: "Emergency contact phone",
        type: "tel",
        required: true,
        maxLength: 24
      }, {
        name: "noticeAccepted",
        label: "I understand how booking, emergency contact and guardian consent information will be used, and I have permission to share this contact.",
        type: "checkbox",
        required: true
      }]} /></>}</div>;
}
