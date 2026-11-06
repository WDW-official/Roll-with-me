import Link from "next/link";
import { PageIntro, ButtonLink } from "@/components/ui";
import { currentUser } from "@/lib/auth";
import { ActionButton } from "@/components/forms";
export const dynamic = "force-dynamic";
export default async function Account() {
  const user = await currentUser();
  return (
    <div className="page-width page-content">
      <PageIntro
        label="YOUR SPACE / PRIVATE BY DESIGN"
        title={
          user
            ? `YOUR MOVE, ${user.displayName.toUpperCase()}.`
            : "A LITTLE SPACE FOR YOU."
        }
        description="Your bookings. Your choices. No public profiles, direct messages or hidden reports about your activity."
      />
      {user ? (
        <>
          <div className="account-links">
            <Link href="/account/bookings">Your bookings ↗</Link>
            <Link href="/account/consents">Consent & preferences ↗</Link>
            <Link href="/opportunities">Find your next move ↗</Link>
          </div>
          <span className="status-label">{user.role.replaceAll("_", " ")}</span>
          {user.role === "parent_pending" && (
            <p className="notice">
              Your adult account awaits manual verification. Forum posting and
              guardian consent remain locked.
            </p>
          )}
          <div className="mt-8">
            <ActionButton
              endpoint="/api/auth/sign-out"
              payload={{}}
              label="Sign out"
              onDone={undefined}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/sign-in">Sign in</ButtonLink>
          <ButtonLink secondary href="/sign-up">
            Create your space
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
