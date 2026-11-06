import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { SectionNav } from "@/components/structure-ui";
import { SupportForm } from "@/components/support-form";
import { env, isDemo } from "@/lib/env";
import { boroughs } from "@/lib/data";
import {
  supportContextById,
  supportTopics,
  type SupportTopic,
} from "@/lib/structure";
export const metadata = {
  title: "Ask RWM — a question or a next step",
};
export default async function Ask({
  searchParams,
}: {
  searchParams: Promise<{
    topic?: string;
    context?: string;
    requester?: string;
  }>;
}) {
  const query = await searchParams;
  const context = supportContextById(query.context ?? "general");
  const initialTopic: SupportTopic = supportTopics.some(
    (t) => t.value === query.topic,
  )
    ? (query.topic as SupportTopic)
    : query.topic === "opportunities"
      ? "activities"
      : query.topic === "safety"
        ? "wellbeing"
        : context.topic;
  const intakeOpen = !isDemo && env.INTAKE_ENABLED === "true";
  return (
    <div className="page-width page-content">
      <PageIntro
        label="ASK RWM / A HUMAN ROUTE FORWARD"
        title="LET’S FIND THE RIGHT NEXT STEP."
        description="Ask for yourself or as a parent/carer on someone’s behalf. No public profile is needed. Keep the first message general; the right next step can be discussed with you."
      />
      <SectionNav
        links={[
          {
            title: "Find a trusted service",
            href: `/support/services?topic=${initialTopic}`,
          },
          {
            title: "Urgent help",
            href: "/support/urgent",
          },
          {
            title: "How we use your information",
            href: "/privacy",
          },
        ]}
      />
      <div className="emergency">
        <div>
          <h2>IMMEDIATE DANGER? CALL 999.</h2>
          <p>
            RWM is not an emergency service and is not monitored 24/7.
            <br />
            Under 19? Childline: 0800 1111.{" "}
            <Link href="/help" className="underline">
              More trusted support
            </Link>
            .
          </p>
        </div>
        <a href="tel:999">999 ↗</a>
      </div>
      {!intakeOpen && (
        <div className="notice">
          <p>
            {isDemo
              ? "CONTACT PREVIEW / Nothing entered here will be submitted or saved. You can explore the form, or use the trusted support links above."
              : "Questions aren’t open yet. Please use the trusted support routes above."}
          </p>
        </div>
      )}
      <div className="article-layout">
        <div>
          <SupportForm
            initialTopic={initialTopic}
            context={context.id}
            contextLabel={context.label}
            onBehalf={query.requester === "parent_carer"}
            demo={isDemo}
            intakeOpen={intakeOpen}
            boroughs={Object.values(boroughs).flat().sort()}
          />
        </div>
        <aside>
          <h3>HOW A REQUEST MOVES.</h3>
          <ol className="support-steps">
            <li>Received with a request reference.</li>
            <li>Reviewed by a designated human.</li>
            <li>Routed to the appropriate approved team.</li>
            <li>A safe reply or referral is discussed.</li>
          </ol>
          <p>
            Legal information, learning paths, activity questions and
            safeguarding needs take different routes. No referral is
            automatically completed by submitting this form.
          </p>
          <h3 className="mt-8">WHO CAN READ IT?</h3>
          <p>
            Restricted, assigned safeguarding staff handle initial intake. They
            do not publish it or give a parent, funder or partner default
            access.
          </p>
          <p>
            General intake retention is reviewed after 90 days. Some
            safeguarding records may need a different lawful retention period.
          </p>
          <h3 className="mt-8">REPLIES & HOURS.</h3>
          <p>
            {env.SUPPORT_HOURS ||
              "Operating hours and response targets will be published when the service is staffed. No response time is promised in this preview."}
          </p>
          {env.SUPPORT_EMAIL && (
            <>
              <h3 className="mt-8">EMAIL THE TEAM.</h3>
              <p>
                For general enquiries only. Leave out sensitive details and
                private documents.
              </p>
              <a
                className="text-link break-all"
                href={`mailto:${env.SUPPORT_EMAIL}?subject=RWM%20general%20enquiry`}
              >
                {env.SUPPORT_EMAIL}
              </a>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
