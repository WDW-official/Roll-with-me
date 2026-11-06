import type { Opportunity, Story, Guide, Product, Zone } from "./types";
export const zones: Zone[] = ["North", "South", "East", "West"];
export const boroughs: Record<Zone, string[]> = {
  North: ["Barnet", "Camden", "Enfield", "Haringey", "Islington"],
  South: [
    "Bexley",
    "Bromley",
    "Croydon",
    "Greenwich",
    "Kingston upon Thames",
    "Lambeth",
    "Lewisham",
    "Merton",
    "Richmond upon Thames",
    "Southwark",
    "Sutton",
    "Wandsworth",
  ],
  East: [
    "Barking and Dagenham",
    "City of London",
    "Hackney",
    "Havering",
    "Newham",
    "Redbridge",
    "Tower Hamlets",
    "Waltham Forest",
  ],
  West: [
    "Brent",
    "Ealing",
    "Hammersmith and Fulham",
    "Harrow",
    "Hillingdon",
    "Hounslow",
    "Kensington and Chelsea",
    "Westminster",
  ],
};
const base = {
  ageBands: ["13–15", "16–17", "18–20"] as Opportunity["ageBands"],
  cost: 0,
  date: "2027-04-05",
  time: "14:00–16:00",
  venue:
    "Illustrative supervised community venue — address pending verification",
  provider: "RWM demo provider",
  accessibility: ["Step-free access"],
  capacity: 16,
  booked: 0,
  guardianConsent: true,
  holiday: true,
  transport: "Transport details require provider verification.",
  officialUrl: "",
  lastChecked: null,
  verified: false,
  demo: true,
  status: "draft" as const,
};
export const opportunities: Opportunity[] = [
  {
    ...base,
    slug: "court-culture",
    canonicalCategory: "sport-movement",
    title: "COURT CULTURE",
    category: "Basketball",
    borough: "Hackney",
    zone: "East",
    description:
      "Find your rhythm on the court. A coached session built around skills, teamwork and enjoying the game. All experience levels welcome.",
    art: "court",
  },
  {
    ...base,
    slug: "build-something",
    canonicalCategory: "tech-engineering",
    title: "BUILD SOMETHING.",
    category: "Coding & tech",
    borough: "Camden",
    zone: "North",
    description:
      "Take an idea from a sketch to your first website. A friendly, supervised introduction to code, with equipment provided in this demo programme.",
    art: "code",
    ageBands: ["16–17", "18–20"],
    date: "2027-04-06",
  },
  {
    ...base,
    slug: "find-your-footwork",
    canonicalCategory: "sport-movement",
    title: "FIND YOUR FOOTWORK",
    category: "Boxing fitness",
    borough: "Lambeth",
    zone: "South",
    description:
      "Non-contact boxing fitness: movement, focus and confidence. No sparring. This illustrative session requires a verified qualified coach and a reviewed activity risk assessment.",
    art: "boxing",
    capacity: 12,
  },
  {
    ...base,
    slug: "five-a-side",
    canonicalCategory: "sport-movement",
    title: "ONE TEAM. YOUR GAME.",
    category: "Football",
    borough: "Ealing",
    zone: "West",
    description:
      "Five-a-side football, one-on-one dribbling and free-kick skill stations. Supportive coaching and age-separated sessions.",
    art: "football",
    date: "2027-04-07",
  },
  {
    ...base,
    slug: "make-your-first-film",
    canonicalCategory: "creative",
    title: "YOUR CITY. YOUR LENS.",
    category: "Film & music",
    borough: "Southwark",
    zone: "South",
    description:
      "Plan, shoot and edit a short film using supervised equipment. Learn consent-led storytelling without filming people who have not agreed to take part.",
    art: "film",
    date: "2027-04-08",
  },
  {
    ...base,
    slug: "robotics-lab",
    canonicalCategory: "tech-engineering",
    title: "SMALL BUILD. BIG IDEAS.",
    category: "Coding & tech",
    borough: "Newham",
    zone: "East",
    description:
      "Build and programme a simple robot in a supervised maker lab. Includes safe electronics and an introduction to engineering.",
    art: "robot",
    ageBands: ["13–15"],
  },
  {
    ...base,
    slug: "fifty-metre-move",
    canonicalCategory: "sport-movement",
    title: "50 METRES. YOUR PACE.",
    category: "Athletics",
    borough: "Haringey",
    zone: "North",
    description:
      "Short-distance sprint challenges, warm-ups and personal progress. A supervised session with a focus on participation.",
    art: "sprint",
    date: "2027-04-09",
  },
  {
    ...base,
    slug: "maker-session",
    canonicalCategory: "tech-engineering",
    title: "MAKE YOUR MARK",
    category: "Design & trades",
    borough: "Brent",
    zone: "West",
    description:
      "A supervised introduction to making, design and practical skills. Activity-specific risk assessment and safety equipment required before launch.",
    art: "maker",
    ageBands: ["16–17", "18–20"],
  },
];
export const stories: Story[] = [
  {
    slug: "the-other-route",
    title: "THERE’S MORE THAN ONE WAY HOME.",
    series: "THE OTHER ROUTE",
    excerpt:
      "A different route. A new routine. The small decisions that can open a bigger world.",
    duration: "4 MIN READ",
    type: "Scripted composite",
    theme: "Finding your people",
    art: "route",
    contentNote:
      "Non-graphic references to peer pressure and conflict. This is a fictional editorial demo, not a real person’s testimony.",
    paragraphs: [
      "The group chat was getting louder. Every message seemed to ask for a response, and every response raised the stakes. In this fictional story, the turning point isn’t a speech or a perfect plan. It’s choosing to step away.",
      "A trusted youth worker helps the character think through what feels safe. They change their routine with support, mute the thread and make a plan for getting home. They don’t have to sort everything out alone.",
      "The first basketball session feels awkward. The second feels easier. Over time, showing up becomes a routine, and the court becomes somewhere to belong. It doesn’t erase the pressure, but it creates another option.",
      "If a conflict is building, leave when it is safe, avoid retaliation and tell someone you trust. If anyone is in immediate danger, call 999.",
    ],
    reflection:
      "What is one place, person or activity that helps you reset? Keep your answer for yourself.",
    opportunitySlug: "court-culture",
    demo: true,
    status: "draft",
  },
  {
    slug: "start-before-ready",
    title: "YOU DON’T HAVE TO HAVE IT FIGURED OUT.",
    series: "TURNING POINTS",
    excerpt:
      "From a blank screen to a first build. Progress starts with showing up.",
    duration: "3 MIN READ",
    type: "Scripted composite",
    theme: "Creative futures",
    art: "code",
    contentNote:
      "Fictional composite story created for this preview. No real young person is represented.",
    paragraphs: [
      "Everyone else seemed to know what came next. This fictional character didn’t. A community coding session offered somewhere to start without needing all the answers.",
      "Their first website was three lines of text and a button that did nothing. A mentor helped them work out why. By the end of the session, the button worked. It was a small win that made the next one feel possible.",
      "Different routes work for different people. Ask about verified local courses, equipment access and support before signing up.",
    ],
    reflection: "What would you try if you didn’t need to be good at it yet?",
    opportunitySlug: "build-something",
    demo: true,
    status: "draft",
  },
  {
    slug: "after-the-summer",
    title: "SAME CITY. NEW CHAPTER.",
    series: "AFTER THE SUMMER",
    excerpt:
      "The things you make. The people you meet. What you take with you.",
    duration: "5 MIN READ",
    type: "Animation concept",
    theme: "Moving forward",
    art: "sprint",
    contentNote:
      "Illustrative animation script, not a filmed or verified account.",
    paragraphs: [
      "The summer starts without much of a plan. A free, supervised creative workshop becomes a reason to get out and make something.",
      "This demo animation follows small moments: learning an editing shortcut, asking for help, taking a break when things get frustrating. Confidence grows through practice and support.",
      "Participation should always be your choice. Ask who runs an activity, what support is available and how your information is used.",
    ],
    reflection: "What would you like your next chapter to include?",
    opportunitySlug: "make-your-first-film",
    demo: true,
    status: "draft",
  },
];
export const legalSources = [
  {
    id: "gov-knives",
    title: "GOV.UK — Selling, buying and carrying knives",
    url: "https://www.gov.uk/buying-carrying-knives",
  },
  {
    id: "gov-search",
    title: "GOV.UK — Police powers to stop and search",
    url: "https://www.gov.uk/police-powers-to-stop-and-search-your-rights",
  },
  {
    id: "gov-arrest",
    title: "GOV.UK — Being arrested: your rights",
    url: "https://www.gov.uk/arrested-your-rights",
  },
  {
    id: "childline",
    title: "Childline — confidential support for under-19s",
    url: "https://www.childline.org.uk/",
  },
  {
    id: "nhs-first-aid",
    title: "NHS — First aid",
    url: "https://www.nhs.uk/conditions/first-aid/",
  },
  {
    id: "gov-legal",
    title: "GOV.UK — Legal aid",
    url: "https://www.gov.uk/legal-aid",
  },
];
const guideBase = {
  jurisdiction: "England and Wales",
  reviewer: null,
  reviewedAt: null,
  nextReviewAt: null,
  status: "pending_review" as const,
  demo: true,
};
export const guides: Guide[] = [
  {
    ...guideBase,
    slug: "stop-and-search",
    title: "STOP & SEARCH. KNOW YOUR RIGHTS.",
    category: "Police & your rights",
    summary:
      "Understand the questions to ask, where to find the rules and how to get support.",
    sources: ["gov-search", "gov-arrest"],
    sections: [
      {
        title: "Start with reliable information",
        body: "This page is a pre-launch design example awaiting a qualified lawyer’s review. Use the official GOV.UK guidance linked below for current information about stop and search powers, safeguards and complaints.",
      },
      {
        title: "Stay safe and seek advice",
        body: "Try to stay calm and avoid escalating a confrontation. The circumstances and legal powers used matter. If you need advice about a specific encounter, speak to a solicitor or a trusted support organisation.",
      },
    ],
  },
  {
    ...guideBase,
    slug: "knives-and-consequences",
    title: "CARRYING ISN’T PROTECTION.",
    category: "Safety & consequences",
    summary:
      "Safer choices, real consequences and trusted sources on weapons law.",
    sources: ["gov-knives", "nhs-first-aid"],
    sections: [
      {
        title: "Choose to leave, not to carry",
        body: "Do not carry a weapon for protection. If you feel threatened, seek trusted help, make a safer plan and avoid retaliation. If someone is in immediate danger, call 999.",
      },
      {
        title: "A narrow exception is not general permission",
        body: "England and Wales law contains a limited exception for certain non-locking folding pocketknives with a cutting edge no longer than 3 inches. This is not a general right to carry a knife. Intention, threatening use, particular locations, banned articles and other circumstances can create criminal liability. Consult the official source and a solicitor; this draft has not been legally reviewed.",
      },
      {
        title: "Consequences depend on the case",
        body: "Violence can cause life-changing harm or death. The offence depends on what happened, intent, evidence and circumstances. An injury to a particular body part does not automatically establish murder or attempted murder.",
      },
    ],
  },
  {
    ...guideBase,
    slug: "arrest-and-a-solicitor",
    title: "ASK FOR A SOLICITOR.",
    category: "Police & your rights",
    summary:
      "Where to find official information about arrest, interviews and legal advice.",
    sources: ["gov-arrest", "gov-legal"],
    sections: [
      {
        title: "Your situation matters",
        body: "This draft is not individual legal advice. Consult the official guidance about access to legal advice and support during police detention. If you are involved in a case, ask for a solicitor. Age and circumstances affect the safeguards that apply.",
      },
    ],
  },
  {
    ...guideBase,
    slug: "when-conflict-builds",
    title: "YOU CAN STEP AWAY.",
    category: "Everyday decisions",
    summary: "Pause. Find space. Get someone on your side.",
    sources: ["childline"],
    sections: [
      {
        title: "Give yourself space",
        body: "If it is safe, leave a confrontation, avoid responding to threats and speak with someone you trust. Do not meet up to settle an argument. You do not need to handle pressure alone.",
      },
      {
        title: "Get support",
        body: "Under-19s can contact Childline on 0800 1111. In immediate danger call 999. This site is not an emergency service.",
      },
    ],
  },
];
export const products: Product[] = [
  {
    slug: "the-everyday-hoodie",
    name: "THE EVERYDAY HOODIE",
    subtitle: "Heavyweight. Everyday movement.",
    price: 45,
    colour: "Tarmac Black",
    sizes: ["XS", "S", "M", "L", "XL"],
    kind: "hoodie",
  },
  {
    slug: "move-together-tee",
    name: "MOVE TOGETHER TEE",
    subtitle: "A statement you can stand behind.",
    price: 22,
    colour: "Crown Off-White",
    sizes: ["XS", "S", "M", "L", "XL"],
    kind: "tee",
  },
  {
    slug: "the-crown-crew",
    name: "THE CROWN CREW",
    subtitle: "Made for the long way round.",
    price: 38,
    colour: "Concrete Grey",
    sizes: ["XS", "S", "M", "L", "XL"],
    kind: "crew",
  },
];
export const adminSections = [
  "overview",
  "content",
  "opportunities",
  "partners",
  "moderation",
  "safeguarding",
  "surveys",
  "analytics",
  "grants",
  "audit",
  "areas",
  "media",
];

// Draft topic cards for the mobile legal feed. These are never presented as reviewed law.
legalSources.push(
  {
    id: "gov-drugs",
    title: "GOV.UK — Drug possession and dealing",
    url: "https://www.gov.uk/penalties-drug-possession-dealing",
  },
  {
    id: "nhs-sexual-health",
    title: "NHS — Sexual health",
    url: "https://www.nhs.uk/live-well/sexual-health/",
  },
  {
    id: "sexual-offences-act",
    title: "Legislation.gov.uk — Sexual Offences Act 2003",
    url: "https://www.legislation.gov.uk/ukpga/2003/42/contents",
  },
);
guides.forEach((g) => {
  g.category =
    g.slug === "knives-and-consequences"
      ? "Violence & knives"
      : g.slug === "when-conflict-builds"
        ? "Online & everyday"
        : "Police & rights";
});
guides.push(
  {
    ...guideBase,
    slug: "drugs-and-pressure",
    title: "PRESSURE ISN’T A PLAN.",
    category: "Drugs & exploitation",
    summary:
      "Understand where to find reliable information about drugs law, pressure and getting support — without judgement.",
    sources: ["gov-drugs", "childline"],
    sections: [
      {
        title: "Pause before pressure makes the decision",
        body: "Being asked to carry, store or pass something on can put you in a difficult position. You do not have to handle pressure alone. Speak with a trusted adult or a specialist support service. If there is immediate danger, call 999.",
      },
      {
        title: "The facts of a case matter",
        body: "This draft does not set out penalties or advise on an individual case. Drugs law depends on the substance, what happened, age and other circumstances. Read the official GOV.UK source and ask a solicitor for case-specific advice.",
      },
      {
        title: "Support comes before judgement",
        body: "If someone is threatening you or making you feel that you owe them, tell a trusted professional. Do not send details of alleged offences through an ordinary community form. Childline can help under-19s explore safe support options.",
      },
    ],
  },
  {
    ...guideBase,
    slug: "consent-and-respect",
    title: "RESPECT IS THE START.",
    category: "Consent & relationships",
    summary:
      "Boundaries, consent and support. Understand where to turn when something doesn’t feel right.",
    sources: ["nhs-sexual-health", "sexual-offences-act", "childline"],
    sections: [
      {
        title: "No pressure. Clear boundaries",
        body: "Healthy relationships involve respect, freely made choices and space to change your mind. Pressure, fear or being unable to choose freely are not a basis for consent. Never pressure someone to share intimate images or take part in sexual activity.",
      },
      {
        title: "Age and circumstances matter",
        body: "The law includes age-specific protections and rules about sexual activity, images and positions of trust. This pre-launch draft does not provide an individual legal assessment. Use the official sources and seek qualified advice. Do not share intimate images through RWM.",
      },
      {
        title: "You can ask for support",
        body: "If someone has ignored your boundaries, pressured you or shared something private, you deserve support. Speak to a trusted safeguarding professional, a health service or Childline if you are under 19. You do not need to give traumatic details here. Immediate danger: call 999.",
      },
    ],
  },
  {
    ...guideBase,
    slug: "when-a-fight-escalates",
    title: "ONE MOMENT CAN CHANGE MORE.",
    category: "Violence & knives",
    summary:
      "Fights can cause lasting harm. Find safer ways to step away and understand why legal outcomes depend on the facts.",
    sources: ["gov-arrest", "nhs-first-aid", "childline"],
    sections: [
      {
        title: "Make space when it is safe",
        body: "Avoid meeting to settle an argument. If a confrontation is building, leave when you can do so safely, avoid retaliation and seek help from someone you trust.",
      },
      {
        title: "Harm and responsibility",
        body: "Violence can lead to life-changing injury or death. The offence depends on what happened, intent, evidence and circumstances. An injury to a specific body part does not automatically establish murder or attempted murder. This page provides no attack or injury-targeting advice.",
      },
      {
        title: "Get help quickly",
        body: "If someone is seriously hurt, call 999 and follow the call handler’s instructions. For reliable first-aid information, use the NHS source. If you are involved in a case, ask for a solicitor; do not rely on this unreviewed draft.",
      },
    ],
  },
  {
    ...guideBase,
    slug: "online-pressure",
    title: "YOU DON’T OWE THE CHAT A REPLY.",
    category: "Online & everyday",
    summary:
      "Online conflict, threats and pressure can feel constant. You can step back and get someone on your side.",
    sources: ["childline", "gov-arrest"],
    sections: [
      {
        title: "Give yourself room",
        body: "If it is safe, stop engaging with escalating messages, use a platform’s safety tools and tell someone you trust. Don’t arrange an in-person confrontation in response to online pressure.",
      },
      {
        title: "Support without public exposure",
        body: "Do not repost private images, identifying details or threats to make a public point. Seek guidance from a trusted safeguarding professional about safe reporting. Do not upload potential evidence to an ordinary RWM form.",
      },
      {
        title: "The legal position needs context",
        body: "Online behaviour can have serious consequences, but the legal assessment depends on what happened and the evidence. This draft does not decide whether a particular message is an offence. Seek qualified advice for a specific case.",
      },
    ],
  },
  {
    ...guideBase,
    slug: "exploitation-is-not-your-fault",
    title: "HELP SHOULDN’T COME WITH A DEBT.",
    category: "Drugs & exploitation",
    summary:
      "When gifts, favours or belonging turn into pressure, you deserve trusted help and a safer way forward.",
    sources: ["childline"],
    sections: [
      {
        title: "When an offer changes",
        body: "Someone may offer help or a sense of belonging and later use threats, pressure or an alleged debt to control you. If you feel trapped, speak with a trusted adult or safeguarding professional. You do not have to explain everything in a public space.",
      },
      {
        title: "A safer next step",
        body: "Avoid confronting someone who is threatening you. Ask for help making a safer plan. Immediate danger: call 999. Under-19s can contact Childline on 0800 1111.",
      },
      {
        title: "Legal support is individual",
        body: "Coercion and exploitation can be relevant to a legal case, but the position depends on the circumstances. This unreviewed page cannot promise an outcome or defence. A solicitor can advise on your situation.",
      },
    ],
  },
);
