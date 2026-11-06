import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { RwmForm } from "@/components/forms";
import { privacyField } from "@/lib/form-fields";
export const metadata = {
  title: "Partners & providers",
};
export default function Partners() {
  return (
    <div className="page-width page-content">
      <PageIntro
        label="PARTNERS / BUILD SOMETHING THAT LASTS"
        title={"MORE POSSIBILITIES.\nSHARED RESPONSIBILITY."}
        description="Youth organisations, schools, coaches, local businesses and funders: help create safe, useful opportunities that young people actually want."
      />
      <div className="article-layout">
        <div>
          <div className="prose">
            <h2>BRING AN OPPORTUNITY.</h2>
            <p>
              Sign in before submitting. A submission is a request for review,
              not a public listing or endorsement. No real providers are claimed
              as partners in this preview.
            </p>
          </div>
          <RwmForm
            endpoint="/api/providers"
            submitLabel="Submit for manual review"
            fields={[
              {
                name: "name",
                label: "Organisation name",
                required: true,
                maxLength: 120,
              },
              {
                name: "officialUrl",
                label: "Official website (https://)",
                required: true,
              },
              {
                name: "contactEmail",
                label: "Work contact email",
                type: "email",
                required: true,
              },
              {
                name: "policyUrl",
                label: "Safeguarding policy URL (https://)",
                required: true,
              },
              {
                name: "description",
                label: "Activity, supervision and eligibility overview",
                type: "textarea",
                required: true,
                maxLength: 3000,
                helper: "Do not include young people’s personal information.",
              },
              privacyField,
            ]}
          />
        </div>
        <aside>
          <h3>BEFORE PUBLICATION.</h3>
          <p>Manual provider identity checks.</p>
          <p>Safeguarding policy and designated lead.</p>
          <p>Activity-specific risk assessment.</p>
          <p>
            Appropriate DBS and eligibility checks where required by the
            activity and role.
          </p>
          <p>Age, capacity, access, cost and consent information.</p>
          <p>Regular rechecks and a removal process.</p>
          <Link href="/impact" className="text-link">
            Restricted impact workspace ↗
          </Link>
        </aside>
      </div>
    </div>
  );
}
