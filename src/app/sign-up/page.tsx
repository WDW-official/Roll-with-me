import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { RwmForm } from "@/components/forms";
import { ageOptions } from "@/lib/form-fields";
export const metadata = {
  title: "Create your space",
};
export default function SignUp() {
  return (
    <div className="page-width page-content">
      <PageIntro
        label="YOUR SPACE / YOUR CHOICE"
        title="MAKE YOURSELF AT HOME."
        description="For young people aged 13–20 and adult parents or carers. No public profile. No direct messages. No activity reports sent to your parents."
      />
      <RwmForm
        endpoint="/api/auth/sign-up"
        submitLabel="Create your space"
        fields={[
          {
            name: "displayName",
            label: "A name to use privately",
            required: true,
            maxLength: 40,
            helper: "A nickname is fine. It is not a public profile.",
          },
          {
            name: "ageBand",
            label: "Your age band",
            type: "select",
            required: true,
            options: [
              ...ageOptions,
              {
                value: "adult",
                label: "21+ / parent or carer (verification required)",
              },
            ],
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
          },
          {
            name: "password",
            label: "Choose a password",
            type: "password",
            required: true,
            minLength: 12,
            maxLength: 128,
            helper:
              "Use at least 12 characters. A unique passphrase is a good start.",
          },
          {
            name: "privacyAccepted",
            label:
              "I am at least 13 and have read the privacy notice and terms for creating an account.",
            type: "checkbox",
            required: true,
          },
        ]}
      />
      <p className="mt-6 text-xs">
        <Link href="/privacy" className="text-link">
          Read the privacy notice ↗
        </Link>{" "}
        <Link href="/terms" className="text-link ml-4">
          Terms ↗
        </Link>
      </p>
    </div>
  );
}
