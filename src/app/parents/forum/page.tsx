import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { ParentForum } from "@/components/community";
import { currentUser } from "@/lib/auth";
import { isDemo } from "@/lib/env";
export const dynamic = "force-dynamic";
export default async function Forum() {
  const user = await currentUser();
  return (
    <div className="page-width page-content">
      <PageIntro
        label="PARENTS & CARERS / MODERATED COMMUNITY"
        title="YOU HAVE A CIRCLE TOO."
        description="A separate space for verified adults to exchange general support, ideas and useful experiences. Every post is reviewed before publication."
      />
      <div className="content-note">
        No children’s names, diagnoses, precise locations, allegations of
        offences or private disclosures. No adult-to-child messaging. Use
        confidential support routes for concerns about a child.
      </div>
      <p className="text-xs">
        <Link href="/safety" className="text-link">
          Community rules & safeguarding ↗
        </Link>{" "}
        <Link href="/ask-rwm" className="text-link ml-4">
          Ask for support ↗
        </Link>
      </p>
      <ParentForum demo={isDemo} verified={user?.role === "parent_verified"} />
    </div>
  );
}
