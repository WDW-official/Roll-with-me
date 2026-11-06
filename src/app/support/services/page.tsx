import { PageIntro } from "@/components/ui";
import { SectionNav } from "@/components/structure-ui";
import { supportServices } from "@/lib/services";
export const metadata = {
  title: "Find a trusted service",
};
export default async function Services({
  searchParams,
}: {
  searchParams: Promise<{
    topic?: string;
  }>;
}) {
  const { topic } = await searchParams;
  const selected =
    topic && topic !== "general"
      ? supportServices.filter((s) => s.topics.includes(topic))
      : supportServices;
  const services = selected.length ? selected : supportServices;
  return (
    <div className="page-width page-content">
      <PageIntro
        label="HELP / OFFICIAL CONTACT ROUTES"
        title="A PLACE TO START."
        description="Choose a route that fits what you need. These are independent official services, not a claim of an RWM partnership. Check each service’s current age eligibility, coverage, hours and privacy information."
      />
      <SectionNav
        links={[
          {
            title: "Ask RWM",
            href: "/ask-rwm",
          },
          {
            title: "Ask as a parent or carer",
            href: "/ask-rwm?requester=parent_carer",
          },
          {
            title: "Urgent help",
            href: "/support/urgent",
          },
        ]}
      />
      <div className="emergency">
        <div>
          <h2>IMMEDIATE DANGER?</h2>
          <p>Call 999 in the UK. Do not wait for a website response.</p>
        </div>
        <a href="tel:999">999 ↗</a>
      </div>
      <div className="help-grid">
        {services.map((s) => (
          <article className="help-card" key={s.id}>
            <span className="mono">{s.audience.toUpperCase()}</span>
            <h2>{s.name}</h2>
            <p>{s.purpose}</p>
            {s.phone && (
              <>
                <a href={`tel:${s.phone}`}>{s.displayPhone}</a>
                <br />
              </>
            )}
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              Official website ↗
            </a>
            <p className="service-check-note">
              Use the official site to confirm current details. No live
              availability is checked here.
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
