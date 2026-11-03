import { PageIntro, ButtonLink } from "@/components/ui";
import { currentUser } from "@/lib/auth";
import { RwmForm, ActionButton } from "@/components/forms";
export const dynamic = "force-dynamic";
export default async function Consents() {
  const user = await currentUser();
  return <div className="page-width page-content"><PageIntro label="YOUR SPACE / YOUR CHOICES" title="YOU’RE IN CONTROL." description="Optional preferences are separate from event consent. You can withdraw an optional choice without losing access to browsing." />{!user ? <ButtonLink href="/sign-in">Sign in to manage consent</ButtonLink> : <><div className="prose"><h2>YOUR CONSENT RECORD.</h2>{user.consents.map((c, i) => <p key={i}>{c.purpose?.replaceAll("_", " ")}: {c.granted ? "agreed" : "withdrawn"} / notice {c.version} / {c.at?.toLocaleDateString("en-GB")}</p>)}<h2>RESEARCH INVITATIONS.</h2><p>Research invitations are off by default. No invitations will be sent until a separate notification service is configured.</p></div><div className="flex gap-3 flex-wrap mt-5"><ActionButton endpoint="/api/account/consents" payload={{
          purpose: "research_invites",
          granted: true
        }} label="Opt in to invitations" /><ActionButton endpoint="/api/account/consents" payload={{
          purpose: "research_invites",
          granted: false
        }} label="Withdraw invitation consent" /></div>{user.role === "parent_verified" && <><div className="prose"><h2>EVENT-SPECIFIC GUARDIAN CONSENT.</h2><p>Only use a code shared directly with you by the young person for an event you have discussed. This authorises this event only and gives no access to their messages, survey answers or browsing.</p></div><RwmForm endpoint="/api/consents" submitLabel="Give event consent" fields={[{
          name: "code",
          label: "Private event consent code",
          required: true,
          maxLength: 48
        }, {
          name: "consentAccepted",
          label: "I am the responsible parent or guardian. I have discussed this session and its requirements with the young person, and agree to this event-specific consent notice.",
          type: "checkbox",
          required: true
        }]} /></>}<div className="prose"><h2>REQUEST ACCOUNT DELETION.</h2><p>Staff review requests against privacy and lawful retention requirements. A request does not automatically delete safeguarding records.</p></div><ActionButton endpoint="/api/account/deletion-request" payload={{}} label="Request account deletion" /></>}</div>;
}
