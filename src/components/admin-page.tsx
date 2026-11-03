import { AdminWorkspace } from "./admin";
import { PageIntro, ButtonLink } from "./ui";
import { currentUser } from "@/lib/auth";
import { isDemo } from "@/lib/env";
export async function AdminPage({
  section
}: {
  section: string;
}) {
  const user = await currentUser();
  const staff = user && ["admin", "editor", "moderator", "safeguarding", "legal_reviewer", "researcher", "operations"].includes(user.role);
  if (!isDemo && !staff) return <div className="page-width page-content"><PageIntro label="STAFF ACCESS / PROTECTED" title="AUTHORISED ACCESS ONLY." description="Sign in with an assigned staff account. Permissions are checked again for every read, review, export and action." /><ButtonLink href="/sign-in">Staff sign in</ButtonLink></div>;
  return <div className="page-width page-content"><AdminWorkspace section={section} demo={isDemo} /></div>;
}
