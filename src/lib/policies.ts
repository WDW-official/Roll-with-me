export const policies: Record<string, {
  label: string;
  title: string;
  intro: string;
  sections: {
    title: string;
    body: string[];
  }[];
}> = {
  safety: {
    label: "SAFEGUARDING / CLEAR BOUNDARIES",
    title: "SAFETY IS A TEAM EFFORT.",
    intro: "A culture of care, clear limits and trained human judgement. This platform is not an emergency service.",
    sections: [{
      title: "If someone is in immediate danger",
      body: ["Call 999 in the UK. Under-19s can also contact Childline on 0800 1111 for support. RWM is not monitored 24/7. Urgent help must not depend on this site being available."]
    }, {
      title: "The boundaries in V1",
      body: ["There is no unrestricted youth chat, direct messaging, public personal profile, live location sharing or arbitrary adult-to-child contact. Youth and adult community spaces are separate.", "Public stories and activities need editorial and safeguarding checks. Parent forum posts are reviewed before publication. Report and hide controls are available to verified adult participants."]
    }, {
      title: "Human safeguarding decisions",
      body: ["Ask RWM submissions enter a restricted intake queue. Assigned safeguarding officers can access encrypted messages and protected notes; accesses and actions are logged. High-risk cases are never answered by AI or automatically resolved.", "We cannot promise absolute confidentiality. Staff may need to share information lawfully when there is a risk of serious harm. Notifications must avoid sensitive details. A named safeguarding lead and escalation procedure must be published before live intake opens."]
    }, {
      title: "Community rules",
      body: ["Treat people with respect. No threats, discrimination, exploitation, weapons promotion, personal targeting or sharing private information. Do not identify children through allegations, diagnoses, exact locations or private disclosures.", "Do not submit detailed admissions of offences or evidence through ordinary forms. Potential legal evidence intake is disabled. Moderators can reject or remove posts; serious concerns must be routed to safeguarding staff."]
    }, {
      title: "Providers and activities",
      body: ["Providers need manual identity, policy and role-appropriate eligibility checks. Activities need reviewed risk assessments, age eligibility, supervision, access information and event consent. A DBS check is not a substitute for a safeguarding process.", "Demo activities have not been checked, are not endorsed and cannot be booked."]
    }]
  },
  privacy: {
    label: "YOUR INFORMATION / PLAIN ENGLISH",
    title: "YOUR SPACE. YOUR CHOICES.",
    intro: "No advertising trackers, live location collection or hidden activity reports to parents, funders or authorities. This is a pre-launch privacy explanation that needs a named data controller before live use.",
    sections: [{
      title: "What the preview stores",
      body: ["Reading and filtering require no account. The preview does not save form submissions. Your browser stores a colour-theme preference and, if you use the demo shop, product IDs, sizes and quantities. No contact details or payment information are stored in the cart.", "Fonts are served locally. There are no third-party advertising or analytics scripts. Hosting and network infrastructure may log technical information such as IP addresses; we do not call ordinary web use completely anonymous."]
    }, {
      title: "Accounts and bookings in live mode",
      body: ["Accounts use an email, password hash, private display name and age band; no full date of birth is requested. An essential, HTTP-only session cookie lasts up to seven days. Live mode stores only a hash of its session token.", "Bookings store session eligibility, notice versions and status. Emergency contacts are encrypted and restricted to operational staff. Guardian consent is event-specific and does not reveal a young person’s messages, browsing or research answers."]
    }, {
      title: "Questions and safeguarding",
      body: ["Ask RWM collects whether you are asking for yourself or as a parent/carer, the topic and explicitly attached public page, a general question, and optional age band, borough and safe reply details. Parent/carer requests also record the relationship. Safe-contact preferences and any named referral record are encrypted. A request reference and routing/follow-up state support human triage; no browsing history is attached. Information is encrypted at application level and restricted to assigned safeguarding staff. General intake retention is reviewed after 90 days; a case may need a different, documented lawful retention period.", "We do not promise absolute confidentiality. Routine external referrals should be discussed with you and need appropriate informed permission; lawful safeguarding escalation may be necessary. A parent request does not grant default access to a young person’s private information. Do not send detailed allegations, offence admissions or private information about other people through a general form."]
    }, {
      title: "Feedback and research",
      body: ["Feedback forms do not ask for direct identifiers by default. Infrastructure metadata and free text can still create identification risks. Research needs an approved purpose, protocol, consent information, age eligibility, lawful-basis assessment, withdrawal policy and retention period.", "Submitted questionnaire version IDs and server timestamps support reproducibility. Raw submissions are restricted. A private withdrawal code is shown once; research teams review withdrawal requests against the disclosed study policy. No results are automatically representative or court-admissible."]
    }, {
      title: "Your rights and contact",
      body: ["You can review optional consents and request account deletion in your account. A deletion request is reviewed rather than automatically erasing legally retained safeguarding information. Before launch, the operator must publish its controller identity, privacy contact, lawful bases, processor agreements and rights-request procedure.", "This build does not provide an active privacy mailbox. Do not send sensitive information while it is in preview. You can find UK data protection information and complaint routes at ico.org.uk."]
    }]
  },
  accessibility: {
    label: "ACCESSIBILITY / OPEN TO MORE PEOPLE",
    title: "MADE TO MAKE ROOM.",
    intro: "RWM aims for WCAG 2.2 AA. This is a design and engineering target, not a certification or claim of a completed independent audit.",
    sections: [{
      title: "Built into the experience",
      body: ["Responsive light and dark themes, visible keyboard focus, semantic navigation, labelled fields, a skip link and reduced-motion support. You can explore by list without using a map or sharing location.", "Large display headings are paired with readable body text. Original decorative artwork is labelled. No video automatically plays, and published story media must have suitable captions and transcripts."]
    }, {
      title: "Known limits",
      body: ["An independent assistive-technology audit, user research with disabled young people and a complete contrast review are still required. Provider accessibility details are demo values until verified. Translation and Easy Read versions are planned, not implemented."]
    }, {
      title: "Tell us what gets in the way",
      body: ["Use Ask RWM for a general accessibility suggestion once live intake is enabled. Avoid sharing medical details. In the preview, the form will clearly say that nothing has been submitted."]
    }]
  },
  terms: {
    label: "TERMS / PRE-LAUNCH EDITION",
    title: "CLEAR FROM THE START.",
    intro: "RWM is a pre-launch platform preview. These plain-English draft terms require legal review and a named operator before live service.",
    sections: [{
      title: "Who the platform is for",
      body: ["Public reading is available without login. Youth experiences are designed for ages 13–20, with separate age bands. Adult parents and carers require manual verification for the forum or event-consent role. Self-registration never grants staff or verified-adult privileges."]
    }, {
      title: "Information and activities",
      body: ["Demo stories are fictional editorial examples and demo activities are not real offers. Legal guides in the preview have not received qualified review and are not individual legal advice. Use authoritative sources and consult a solicitor for case-specific advice.", "Live providers and listings must be reviewed before publication. Activity-specific conditions and consent apply. We cannot guarantee outcomes, funding or availability."]
    }, {
      title: "Shop and payments",
      body: ["Merchandise, prices and product images are design samples. Checkout is disabled. No card details or payments are collected. Refund, shipping, stock and provider checkout procedures must be implemented and legally reviewed before sales open."]
    }, {
      title: "Respect and rights",
      body: ["Do not upload material you do not have permission to use. Do not post threats, personal data, exploitative material or identifiable information about children. Staff may review, decline or remove material under the safeguarding process.", "RWM must hold appropriate storyteller releases, guardian consents where needed, media rights and editorial review records before publishing authentic personal stories."]
    }, {
      title: "Research and evidence",
      body: ["Participation is optional. Study-specific information applies. Survey data is not automatically legally certified, representative or admissible in court. The potential evidence workflow remains disabled until specialist legal and safeguarding review."]
    }]
  }
};
