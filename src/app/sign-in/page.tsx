import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { RwmForm } from "@/components/forms";
export const metadata = {
  title: "Sign in"
};
export default function SignIn() {
  return <div className="page-width page-content"><PageIntro label="YOUR SPACE / WELCOME BACK" title="GOOD TO SEE YOU." description="Sign in to manage your bookings and your choices. You can always read and explore without an account." /><RwmForm endpoint="/api/auth/sign-in" submitLabel="Sign in" fields={[{
      name: "email",
      label: "Email",
      type: "email",
      required: true
    }, {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      minLength: 12,
      maxLength: 128
    }]} /><p className="mt-6 text-xs text-[var(--muted)]">New here? <Link href="/sign-up" className="text-link">Create your space ↗</Link></p><p className="mt-6 text-xs max-w-lg text-[var(--muted)]">Account recovery is not available in this preview. Never share a password with staff. Browse freely while account services are being prepared.</p></div>;
}
