import { notFound } from "next/navigation";
import {
  MapPin,
  CalendarDays,
  Users,
  Accessibility,
  ShieldCheck,
  TrainFront,
} from "lucide-react";
import { PageIntro, DemoNotice, ButtonLink } from "@/components/ui";
import { TileArt } from "@/components/art";
import { getOpportunities } from "@/lib/content";
import { LocalContext } from "@/components/local-context";
import {
  activityCategories,
  canonicalActivityCategory,
  discoveryQuery,
} from "@/lib/structure";
import {
  bookableOpportunity,
  eligibleForAge,
  inCatchment,
  localDiscoveryState,
} from "@/lib/local-discovery";
import { getAreaBoroughs } from "@/lib/content";
export default async function OpportunityDetail({
  params,
  searchParams,
}: {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const item = (await getOpportunities()).find((o) => o.slug === slug);
  if (!item) notFound();
  const rawQuery = await searchParams;
  const canonicalCategory = canonicalActivityCategory(item);
  const category = activityCategories.find((c) => c.slug === canonicalCategory);
  const { state } = localDiscoveryState(
    {
      ...rawQuery,
      category: canonicalCategory,
      area: rawQuery.area ?? item.zone,
    },
    await getAreaBoroughs(),
  );
  const query = Object.fromEntries(new URLSearchParams(discoveryQuery(state)));
  const registrationQuery = `?${discoveryQuery(state)}`;
  const matchesArea = inCatchment(item, state.area);
  const matchesAge = eligibleForAge(item, state.age);
  const canRegister = bookableOpportunity(item, state.age) && matchesArea;

  return (
    <div className="page-width page-content">
      <LocalContext query={query} />
      <PageIntro
        label={`${category?.label ?? item.category} / ${item.zone} LONDON`}
        title={item.title}
        description={item.description}
      />
      {item.demo && <DemoNotice />}
      {!matchesArea && (
        <p className="content-note" role="status">
          This listing is in {item.zone} London and is not available in your
          selected area, {state.area || "which has not been chosen"}.
        </p>
      )}
      {!matchesAge && (
        <p className="content-note" role="status">
          This activity is not eligible for your selected age band ({state.age}
          ). Registration is unavailable for this selection.
        </p>
      )}
      <div className="detail-layout">
        <div className="detail-art">
          <TileArt kind={item.art} />
          <div className="prose">
            <h2>MAKE A MOVE.</h2>
            <p>{item.description}</p>
            <h3>Category</h3>
            <p>
              {category?.label ?? "Category awaiting review"} / {item.category}
            </p>
            <h3>Safeguarding</h3>
            <p>
              {!item.demo && item.riskAssessmentApproved
                ? "Activity risk assessment and safeguarding review approved."
                : "Safeguarding review and provider verification are required before registration opens."}
            </p>
            <h3>Before you join</h3>
            <p>
              Sessions are separated by age. You should know who is supervising,
              what to bring, what it costs and how to get help.{" "}
              {item.guardianConsent
                ? "A transparent guardian consent process is required for under-18s."
                : "Check the provider’s eligibility requirements."}
            </p>
            <h3>Getting there</h3>
            <p>{item.transport}</p>
            <h3>Who’s behind it?</h3>
            <p>
              {item.provider}.{" "}
              {!item.demo && item.verified && item.providerVerified
                ? `Provider verified. Listing last checked ${item.lastChecked}.`
                : "DEMO / NOT VERIFIED. No real provider, venue, capacity or session is being advertised."}
            </p>
            {item.officialUrl && (
              <a
                href={item.officialUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Official provider website ↗
              </a>
            )}
          </div>
        </div>
        <aside className="detail-panel">
          <span className="status-label">
            {item.demo
              ? "ILLUSTRATIVE SESSION / NOT BOOKABLE"
              : canRegister
                ? "VERIFIED ACTIVITY"
                : "REGISTRATION UNAVAILABLE"}
          </span>
          <h2 className="mt-5">THE DETAILS.</h2>
          <div className="detail-facts">
            <div>
              <MapPin />
              <p>
                <strong>
                  {item.borough}, {item.zone} London
                </strong>
                {item.venue}
              </p>
            </div>
            <div>
              <CalendarDays />
              <p>
                <strong>
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </strong>
                {item.time}
                {item.demo && " / illustrative date"}
              </p>
            </div>
            <div>
              <Users />
              <p>
                <strong>Ages {item.ageBands.join(" / ")}</strong>
                {item.capacity}{" "}
                {item.demo ? "illustrative places" : "total places"}.{" "}
                {item.demo
                  ? "Availability not confirmed."
                  : `${Math.max(0, item.capacity - item.booked)} currently available.`}
              </p>
            </div>
            <div>
              <Accessibility />
              <p>
                <strong>Access information</strong>
                {item.accessibility.join(", ")}
                {item.demo && " (requires verification)"}
              </p>
            </div>
            <div>
              <ShieldCheck />
              <p>
                <strong>
                  {item.cost === 0 ? "Free" : "£" + item.cost}
                  {item.demo ? " concept" : " session"}
                </strong>
                {item.guardianConsent
                  ? "Guardian consent for under-18s."
                  : "Check eligibility before booking."}
              </p>
            </div>
            <div>
              <TrainFront />
              <p>
                <strong>Transport</strong>
                {item.transport}
              </p>
            </div>
          </div>
          {!canRegister ? (
            <button disabled className="button">
              {item.demo
                ? "Preview — booking not open"
                : "Registration unavailable for this selection"}
            </button>
          ) : (
            <ButtonLink
              href={`/events/${item.slug}/register${registrationQuery}`}
            >
              Register your interest
            </ButtonLink>
          )}
          <p className="mono">NO LIVE LOCATION. NO PUBLIC PARTICIPANT LIST.</p>
        </aside>
      </div>
    </div>
  );
}
