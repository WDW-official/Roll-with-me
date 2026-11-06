/** Editorial page structure. Outlined topics are navigable, not approved articles. */
export type RuleBranch = "the-law" | "the-street";
export type PathBranch = "tech-engineering" | "sports" | "vocational-practical";
export type ArtKind =
  | "court"
  | "code"
  | "boxing"
  | "football"
  | "film"
  | "robot"
  | "sprint"
  | "maker"
  | "route";
export interface TopicPage {
  slug: string;
  title: string;
  purpose: string;
  art: ArtKind;
}
export interface RuleTopic extends TopicPage {
  branch: RuleBranch;
  guideSlugs: string[];
  questions: string[];
}
export interface PathField extends TopicPage {
  branch: PathBranch;
  basics: string[];
  lessonSlugs: string[];
  activityCategory: string;
}
export interface ActivityCategory extends TopicPage {
  label: string;
  image?: string;
  imageAlt?: string;
  driveAssetId?: string;
  listingCategories: string[];
}
export const ruleBranches = [
  {
    slug: "the-law" as const,
    title: "THE LAW.",
    purpose:
      "Your rights, real consequences and common sense. Understand which rules apply and where qualified advice can help.",
    art: "code" as const,
  },
  {
    slug: "the-street" as const,
    title: "THE STREET.",
    purpose:
      "Read situations, think about your choices and move with awareness. Everyday common sense, respect and a way to get support.",
    art: "route" as const,
  },
];
const law = (
  slug: string,
  title: string,
  purpose: string,
  guideSlugs: string[],
  questions: string[],
): RuleTopic => ({
  slug,
  title,
  purpose,
  branch: "the-law",
  art: slug.includes("violence") || slug.includes("knives") ? "boxing" : "code",
  guideSlugs,
  questions,
});
const street = (
  slug: string,
  title: string,
  purpose: string,
  questions: string[],
): RuleTopic => ({
  slug,
  title,
  purpose,
  branch: "the-street",
  art: "route",
  guideSlugs: [],
  questions,
});
export const ruleTopics: RuleTopic[] = [
  law(
    "police-encounters",
    "POLICE ENCOUNTERS & STOP AND SEARCH.",
    "Understand the powers being used, your rights, questions you can ask and where to seek advice about unfair treatment.",
    ["stop-and-search"],
    [
      "Which power is being used?",
      "What information should you be given?",
      "Where can you get advice or raise a concern?",
    ],
  ),
  law(
    "arrest-and-advice",
    "ARREST, INTERVIEWS & A SOLICITOR.",
    "Find reliable information about legal advice, age-related safeguards and support in an individual case.",
    ["arrest-and-a-solicitor"],
    [
      "How do you ask for legal advice?",
      "Which age-related safeguards may apply?",
      "Who can help with your situation?",
    ],
  ),
  law(
    "violence-and-consequences",
    "VIOLENCE, FIGHTS & CONSEQUENCES.",
    "Explore how conflict can escalate, the harm it can cause and why legal outcomes depend on the facts.",
    ["when-a-fight-escalates"],
    [
      "What changes when an argument becomes violence?",
      "Why do intent, evidence and circumstances matter?",
      "What could help someone step away?",
    ],
  ),
  law(
    "knives-and-weapons",
    "KNIVES & WEAPONS.",
    "Understand risk and consequences without treating carrying as protection or a legal exception as a loophole.",
    ["knives-and-consequences"],
    [
      "Why can carrying make a situation more dangerous?",
      "Where are the current official rules?",
      "What support can help with threats?",
    ],
  ),
  law(
    "drugs-and-exploitation",
    "DRUGS, PRESSURE & EXPLOITATION.",
    "Recognise pressure and coercion, find reliable legal information and know where to get trusted help.",
    ["drugs-and-pressure", "exploitation-is-not-your-fault"],
    [
      "When does an offer become pressure?",
      "Who can help if you feel trapped?",
      "Why does individual legal advice matter?",
    ],
  ),
  law(
    "consent-and-relationships",
    "CONSENT, SEX & RELATIONSHIPS.",
    "Explore respect, boundaries, age-related protections, pressure and routes to support.",
    ["consent-and-respect"],
    [
      "What does a freely made choice involve?",
      "When should you ask for specialist advice?",
      "Where can you get support without sharing private images?",
    ],
  ),
  law(
    "online-rights",
    "ONLINE THREATS & PRIVATE IMAGES.",
    "Find support with digital conflict, harassment and privacy, with no need to upload sensitive material here.",
    ["online-pressure"],
    [
      "How can an online argument escalate?",
      "What should stay out of a public post?",
      "Where can you ask for safe reporting advice?",
    ],
  ),
  law(
    "groups-and-responsibility",
    "FRIENDS, GROUPS & RESPONSIBILITY.",
    "A planned explainer about peer pressure and individual responsibility. Legal conclusions need evidence and case-specific advice.",
    [],
    [
      "How can group pressure affect a decision?",
      "What does individual responsibility mean?",
      "Who can advise on a particular case?",
    ],
  ),
  law(
    "everyday-rights",
    "SCHOOL, WORK & EVERYDAY RIGHTS.",
    "A home for reviewed information about school, college, apprenticeships, work and money.",
    [],
    [
      "Which rules apply to this setting?",
      "Who can explain your options?",
      "How can you ask for support?",
    ],
  ),
  street(
    "read-the-situation",
    "READ THE SITUATION.",
    "Notice a situation changing, give yourself space and identify safe public help.",
    [
      "What tells you a situation is changing?",
      "Where could you find a staffed public place?",
      "When might leaving be the safer choice?",
    ],
  ),
  street(
    "how-you-carry-yourself",
    "HOW YOU CARRY YOURSELF.",
    "Explore space, tone and gestures while respecting different personalities, access needs and cultural norms.",
    [
      "How can you give yourself and others space?",
      "What helps you feel more grounded?",
      "How do needs and communication styles differ?",
    ],
  ),
  street(
    "how-you-talk",
    "HOW YOU TALK WHEN THINGS GET TENSE.",
    "Explore short, respectful ways to disengage, without promising that any phrase can guarantee safety.",
    [
      "What could you say without arguing?",
      "How can you avoid humiliating someone?",
      "When should you stop talking and seek help?",
    ],
  ),
  street(
    "unfamiliar-places",
    "MOVING THROUGH UNFAMILIAR PLACES.",
    "Plan a public journey, know who you can contact and find support without sharing live location.",
    [
      "How will you get there and back?",
      "Which staffed places could help?",
      "Who is a trusted contact for you?",
    ],
  ),
  street(
    "friends-and-getting-home",
    "OUT WITH FRIENDS. GETTING HOME.",
    "Think about travel plans, changing circumstances and pressure to stay when you want to leave.",
    [
      "What is your plan for getting home?",
      "What if the group wants different things?",
      "Who could help if plans change?",
    ],
  ),
  street(
    "your-code",
    "YOUR CODE: RESPECT & BOUNDARIES.",
    "Think through personal values, accountability, consent and loyalty with boundaries.",
    [
      "What does respect look like to you?",
      "How can you support a friend without joining a conflict?",
      "Which boundaries matter to you?",
    ],
  ),
  street(
    "online-to-offline",
    "WHEN ONLINE CONFLICT MOVES OFFLINE.",
    "Explore ways to step back from escalating messages and avoid being pulled into a confrontation.",
    [
      "Is replying helping or escalating?",
      "Who could help you think it through?",
      "What would a safer next step look like?",
    ],
  ),
  street(
    "leave-and-get-help",
    "WHEN TO LEAVE. WHEN TO GET HELP.",
    "Make room for a safer exit, trusted support and emergency alternatives. Another person's violence is not your fault.",
    [
      "Can you leave safely?",
      "Which trusted service or person could help?",
      "Is someone in immediate danger?",
    ],
  ),
];
export const pathBranches = [
  {
    slug: "tech-engineering" as const,
    label: "Tech & Engineering",
    title: "TECH & ENGINEERING.",
    purpose: "Ideas, code and the systems that make things work.",
    art: "robot" as const,
  },
  {
    slug: "sports" as const,
    label: "Sports",
    title: "SPORTS.",
    purpose: "Movement, participation and the roles around the game.",
    art: "court" as const,
  },
  {
    slug: "vocational-practical" as const,
    label: "Vocational & Practical",
    title: "VOCATIONAL & PRACTICAL.",
    purpose: "Practical skills, recognised learning and possible next steps.",
    art: "maker" as const,
  },
];
const field = (
  branch: PathBranch,
  slug: string,
  title: string,
  purpose: string,
  art: ArtKind,
  basics: string[],
  lessonSlugs: string[],
  activityCategory: string,
): PathField => ({
  branch,
  slug,
  title,
  purpose,
  art,
  basics,
  lessonSlugs,
  activityCategory,
});
export const pathFields: PathField[] = [
  field(
    "tech-engineering",
    "web-development",
    "WEB DEVELOPMENT.",
    "Explore how websites are structured, designed and made useful for other people.",
    "code",
    ["Page structure", "Readable design", "Simple interactions"],
    ["your-first-website"],
    "tech-engineering",
  ),
  field(
    "tech-engineering",
    "software-coding",
    "SOFTWARE & CODING.",
    "Explore how code turns a small idea into a useful tool.",
    "code",
    ["Breaking down a problem", "Giving clear instructions", "Testing an idea"],
    ["your-first-website"],
    "tech-engineering",
  ),
  field(
    "tech-engineering",
    "robotics-automation",
    "ROBOTICS & AUTOMATION.",
    "Explore how sensors, code and moving parts work together.",
    "robot",
    ["Sensors", "Control systems", "Outputs"],
    ["robotics-starts-small"],
    "tech-engineering",
  ),
  field(
    "tech-engineering",
    "electrical-engineering",
    "ELECTRICAL ENGINEERING.",
    "Explore the design of electrical systems and the routes into learning about them safely.",
    "robot",
    [
      "Energy and systems",
      "Design thinking",
      "Simulation before practical work",
    ],
    [],
    "tech-engineering",
  ),
  field(
    "tech-engineering",
    "electronics",
    "ELECTRONICS.",
    "Explore components, signals and the small systems inside everyday devices.",
    "robot",
    ["Components", "Signals", "Supervised low-risk learning"],
    ["robotics-starts-small"],
    "tech-engineering",
  ),
  field(
    "tech-engineering",
    "mechanical-engineering",
    "MECHANICAL ENGINEERING.",
    "Explore how things move, how designs are tested and how physical systems are made.",
    "maker",
    ["Forces and motion", "Materials", "Design and testing"],
    [],
    "tech-engineering",
  ),
  field(
    "tech-engineering",
    "creative-digital-skills",
    "CREATIVE DIGITAL SKILLS.",
    "Explore film, design, editing, animation and sound as creative and technical skills.",
    "film",
    ["A clear brief", "Consent and rights", "Making and improving"],
    ["creative-technology"],
    "creative",
  ),
  field(
    "sports",
    "football-futsal",
    "FOOTBALL & FUTSAL.",
    "Explore participation, teamwork and routes around the game.",
    "football",
    ["Skills practice", "Teamwork", "Appropriate coaching"],
    ["behind-the-game"],
    "sport-movement",
  ),
  field(
    "sports",
    "boxing-martial-arts",
    "BOXING & MARTIAL ARTS.",
    "Explore movement and discipline through appropriately qualified, supervised programmes.",
    "boxing",
    [
      "Qualified supervision",
      "Age-appropriate participation",
      "Non-contact introductions",
    ],
    ["more-than-the-score"],
    "sport-movement",
  ),
  field(
    "sports",
    "athletics",
    "ATHLETICS.",
    "Explore running, movement and your own progress with suitable support.",
    "sprint",
    ["A suitable starting point", "Personal progress", "Recovery and support"],
    ["find-your-rhythm"],
    "sport-movement",
  ),
  field(
    "sports",
    "basketball",
    "BASKETBALL.",
    "Find out about the game, learning with others and getting involved at your own pace.",
    "court",
    ["Skills", "Teamwork", "A supportive environment"],
    ["more-than-the-score"],
    "sport-movement",
  ),
  field(
    "sports",
    "sport-careers",
    "COACHING, REFEREEING & SPORT CAREERS.",
    "Look at the people and skills that help sport happen beyond playing.",
    "football",
    ["Different roles", "Recognised training", "Safeguarding responsibilities"],
    ["behind-the-game"],
    "sport-movement",
  ),
  field(
    "vocational-practical",
    "motor-vehicle-mechanics",
    "MOTOR VEHICLE MECHANICS.",
    "Explore vehicle systems and routes into supervised, practical learning.",
    "maker",
    ["How systems connect", "Finding a recognised route", "Workshop safety"],
    [],
    "trades-careers",
  ),
  field(
    "vocational-practical",
    "carpentry-joinery",
    "CARPENTRY & JOINERY.",
    "Explore planning, materials and making through safe, supervised learning.",
    "maker",
    ["Measurement and planning", "Materials", "Suitable supervision"],
    ["make-it-with-your-hands"],
    "trades-careers",
  ),
  field(
    "vocational-practical",
    "electrical-installation",
    "ELECTRICAL INSTALLATION.",
    "Understand this practical trade and how it differs from electrical engineering.",
    "maker",
    ["The role", "Recognised qualifications", "Training and safety"],
    [],
    "trades-careers",
  ),
  field(
    "vocational-practical",
    "plumbing-heating",
    "PLUMBING & HEATING.",
    "Explore the work, training routes and responsibilities in this practical field.",
    "maker",
    ["Systems", "Recognised training", "Role-specific safety"],
    [],
    "trades-careers",
  ),
  field(
    "vocational-practical",
    "construction-trades",
    "CONSTRUCTION & BUILDING TRADES.",
    "Explore different practical roles and how to find a supervised introduction.",
    "maker",
    ["Different trades", "Working with others", "Safe learning environments"],
    ["make-it-with-your-hands"],
    "trades-careers",
  ),
  field(
    "vocational-practical",
    "apprenticeships",
    "APPRENTICESHIPS & ENTRY ROUTES.",
    "Understand the questions to ask about a real work-and-training opportunity.",
    "code",
    [
      "Eligibility",
      "Employer and training provider",
      "Pay, support and conditions",
    ],
    ["apprenticeships-explained"],
    "trades-careers",
  ),
];
export const activityCategorySlugs = [
  "sport-movement",
  "tech-engineering",
  "creative",
  "trades-careers",
  "mentoring-support",
  "holidays-challenges",
  "pick-a-vocation",
] as const;
export type ActivityCategorySlug = (typeof activityCategorySlugs)[number];
export const activityCategories: ActivityCategory[] = [
  {
    slug: "sport-movement",
    label: "Sport & Movement",
    title: "SPORT & MOVEMENT.",
    purpose: "Find a supervised way to move, play and learn with others.",
    art: "court",
    listingCategories: [
      "Basketball",
      "Football",
      "Boxing fitness",
      "Athletics",
      "Sport & wellbeing",
    ],
    image: "/images/categories/sport-movement.png",
    imageAlt: "Sport and movement category: football",
    driveAssetId: "1j4oaZc3U-l6i-9AoKxnnN3IA9vYejTtT",
  },
  {
    slug: "tech-engineering",
    label: "Tech & Engineering",
    title: "TECH & ENGINEERING.",
    purpose: "Coding, robotics, electronics and supervised making.",
    art: "robot",
    listingCategories: ["Coding & tech", "Robotics", "Engineering"],
    image: "/images/categories/tech-engineering.png",
    imageAlt: "Tech and engineering category: laptop",
    driveAssetId: "1ScWinJblHD4F0y41e1CgH_NgeFsgDrWN",
  },
  {
    slug: "creative",
    label: "Creative",
    title: "CREATIVE.",
    purpose: "Film, editing, photography, animation, music and design.",
    art: "film",
    listingCategories: ["Film & music", "Graphic design", "Creative arts"],
    image: "/images/categories/creative.png",
    imageAlt: "Creative category: recording equipment",
    driveAssetId: "18JKBB2Yu-YBgo3KZuL1s-uX6C272WRhg",
  },
  {
    slug: "trades-careers",
    label: "Trades & Careers",
    title: "TRADES & CAREERS.",
    purpose:
      "Career exploration, employability, apprenticeships and routes into work.",
    art: "maker",
    listingCategories: [
      "Design & trades",
      "Careers",
      "Apprenticeships",
      "Youth enterprise",
    ],
    image: "/images/categories/trades-careers.png",
    imageAlt: "Approved RWM artwork for Trades and Careers",
    driveAssetId: "1aIaxzhnCpX8qv5gZJRSHqZGnFIhBdD2c",
  },
  {
    slug: "mentoring-support",
    label: "Mentoring & Support",
    title: "MENTORING & SUPPORT.",
    purpose:
      "Mentoring, confidence and practical guidance with appropriate supervision.",
    art: "route",
    listingCategories: [
      "Mentoring",
      "Wellbeing",
      "Debating & conflict resolution",
    ],
    image: "/images/categories/mentoring-support.png",
    imageAlt: "Approved RWM artwork for Mentoring and Support",
    driveAssetId: "1_-py5MiH0ss6qIEWxDRYiaPWg30-tBIf",
  },
  {
    slug: "holidays-challenges",
    label: "Holidays & Challenges",
    title: "HOLIDAYS & CHALLENGES.",
    purpose:
      "Age-appropriate holiday programmes, trips and supervised challenges.",
    art: "sprint",
    listingCategories: ["Holiday programmes", "Challenges"],
    image: "/images/categories/holidays-challenges.png",
    imageAlt: "Approved RWM artwork for Holidays and Challenges",
    driveAssetId: "1K7mNzg9cA80IsWXOVM7eCwQm_HOA9dAW",
  },
  {
    slug: "pick-a-vocation",
    label: "Pick a Vocation",
    title: "PICK A VOCATION.",
    purpose:
      "Vocational skills: choose a practical discipline and explore local tasters and training.",
    art: "route",
    listingCategories: ["Vocational skills"],
  },
];
export const vocationTypes = [
  { slug: "carpentry", label: "Carpentry & joinery" },
  { slug: "plumbing", label: "Plumbing & heating" },
  { slug: "electrical", label: "Electrical installation" },
  { slug: "vehicle-mechanics", label: "Vehicle mechanics" },
  { slug: "construction", label: "Construction" },
  { slug: "catering", label: "Catering" },
  { slug: "hair-beauty", label: "Hair & beauty" },
];
export const storySlots = Array.from(
  {
    length: 10,
  },
  (_, index) => ({
    id: `ST${String(index + 1).padStart(2, "0")}`,
    slug: `st${String(index + 1).padStart(2, "0")}`,
    title: `STORY ${String(index + 1).padStart(2, "0")}`,
    status: "awaiting_material" as const,
  }),
);
export const ruleTopicHref = (t: Pick<RuleTopic, "branch" | "slug">) =>
  `/know-the-rules/${t.branch}/${t.slug}`;
export const pathFieldHref = (f: Pick<PathField, "branch" | "slug">) =>
  `/choose-a-path/${f.branch}/${f.slug}`;
export const storyThemeSlug = (theme: string) =>
  theme
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
/** Legacy records are assigned one stable home until staff resave with a canonical category. */
export function canonicalActivityCategory(o: {
  canonicalCategory?: string;
  category: string;
  slug?: string;
}) {
  if (o.canonicalCategory)
    return activityCategorySlugs.includes(
      o.canonicalCategory as ActivityCategorySlug,
    )
      ? o.canonicalCategory
      : undefined;
  if (o.slug === "maker-session") return "tech-engineering";
  return activityCategories.find((c) =>
    c.listingCategories.includes(o.category),
  )?.slug;
}
export function activityMatchesCategory(
  o: { canonicalCategory?: string; category: string; slug?: string },
  slug: string,
) {
  return !slug || canonicalActivityCategory(o) === slug;
}
export const londonAreas = ["North", "East", "South", "West"] as const;
export interface DiscoveryState {
  area: string;
  borough: string;
  age: string;
  category: string;
  vocation?: string;
  preview?: string;
  sort?: string;
}
export function discoveryState(
  input: Record<string, string | string[] | undefined>,
): DiscoveryState {
  const value = (key: string) =>
    typeof input[key] === "string" ? (input[key] as string) : "";
  const area =
    londonAreas.find((a) => a.toLowerCase() === value("area").toLowerCase()) ??
    "";
  const borough = value("borough").trim();
  return {
    area,
    borough: /^[\p{L} '-]{1,100}$/u.test(borough) ? borough : "",
    age: ["13–15", "16–17", "18–20"].includes(value("age")) ? value("age") : "",
    category: activityCategories.some((c) => c.slug === value("category"))
      ? value("category")
      : "",
    ...(vocationTypes.some((v) => v.slug === value("vocation"))
      ? { vocation: value("vocation") }
      : {}),
    ...(value("preview") === "demo" ? { preview: "demo" } : {}),
    ...(["title", "date"].includes(value("sort"))
      ? { sort: value("sort") }
      : {}),
  };
}
export function discoveryQuery(state: DiscoveryState) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(state)) if (v) p.set(k, v);
  return p.toString();
}
export function discoveryHref(state: DiscoveryState) {
  return `${state.category ? `/roll-with-me/categories/${state.category}` : "/roll-with-me"}?${discoveryQuery(state)}`;
}
export type SupportTopic =
  | "general"
  | "rules"
  | "pathways"
  | "activities"
  | "wellbeing"
  | "story"
  | "correction"
  | "opportunities"
  | "safety";
export const supportTopics = [
  {
    value: "general",
    label: "A general question",
  },
  {
    value: "rules",
    label: "Rights or legal information",
  },
  {
    value: "pathways",
    label: "A learning path or career interest",
  },
  {
    value: "activities",
    label: "An activity or help joining",
  },
  {
    value: "wellbeing",
    label: "Wellbeing or finding safer support",
  },
  {
    value: "story",
    label: "An interest in sharing a story",
  },
  {
    value: "correction",
    label: "A content correction",
  },
] as const;
export function supportTeam(topic: SupportTopic) {
  return topic === "rules"
    ? "legal_information"
    : topic === "pathways"
      ? "careers_pathways"
      : topic === "activities" || topic === "opportunities"
        ? "activities"
        : topic === "wellbeing" || topic === "safety"
          ? "safeguarding"
          : topic === "story" || topic === "correction"
            ? "editorial"
            : "general";
}
export function supportContext(pathname: string): {
  id: string;
  label: string;
  topic: SupportTopic;
} {
  const rule = ruleTopics.find((t) => ruleTopicHref(t) === pathname);
  if (rule)
    return {
      id: `rules/${rule.branch}/${rule.slug}`,
      label: rule.title,
      topic: "rules",
    };
  const field = pathFields.find((f) => pathFieldHref(f) === pathname);
  if (field)
    return {
      id: `paths/${field.branch}/${field.slug}`,
      label: field.title,
      topic: "pathways",
    };
  if (
    pathname.startsWith("/know-the-rules") ||
    pathname.startsWith("/know-the-game")
  )
    return {
      id: "rules",
      label: "Know the Rules",
      topic: "rules",
    };
  if (pathname.startsWith("/choose-a-path"))
    return {
      id: "paths",
      label: "Choose a Path",
      topic: "pathways",
    };
  if (
    [
      "/roll-with-me",
      "/opportunities",
      "/events",
      "/your-area",
      "/challenges",
    ].some((p) => pathname === p || pathname.startsWith(p + "/"))
  )
    return {
      id: "local",
      label: "Local activities",
      topic: "activities",
    };
  if (
    ["/the-real", "/stories"].some(
      (p) => pathname === p || pathname.startsWith(p + "/"),
    )
  )
    return {
      id: "stories",
      label: "The Real",
      topic: "story",
    };
  return {
    id: "general",
    label: "RWM",
    topic: "general",
  };
}
export function validSupportContext(id: string) {
  id = id.replace(/^rules\/the-terrain\//, "rules/the-street/");
  return (
    ["general", "rules", "paths", "local", "stories"].includes(id) ||
    ruleTopics.some((t) => id === `rules/${t.branch}/${t.slug}`) ||
    pathFields.some((f) => id === `paths/${f.branch}/${f.slug}`)
  );
}
export function supportContextById(id: string): {
  id: string;
  label: string;
  topic: SupportTopic;
} {
  id = id.replace(/^rules\/the-terrain\//, "rules/the-street/");
  const rule = ruleTopics.find((t) => id === `rules/${t.branch}/${t.slug}`);
  if (rule)
    return {
      id,
      label: rule.title,
      topic: "rules",
    };
  const field = pathFields.find((f) => id === `paths/${f.branch}/${f.slug}`);
  if (field)
    return {
      id,
      label: field.title,
      topic: "pathways",
    };
  const bases: Record<
    string,
    {
      label: string;
      topic: SupportTopic;
    }
  > = {
    rules: {
      label: "Know the Rules",
      topic: "rules",
    },
    paths: {
      label: "Choose a Path",
      topic: "pathways",
    },
    local: {
      label: "Local activities",
      topic: "activities",
    },
    stories: {
      label: "The Real",
      topic: "story",
    },
  };
  return Object.hasOwn(bases, id)
    ? {
        id,
        ...bases[id],
      }
    : {
        id: "general",
        label: "RWM",
        topic: "general",
      };
}
export const supportNoticeVersion = "2026-10-31.support.v2";
export function supportHref(pathname: string, onBehalf = false) {
  const context = supportContext(pathname);
  const p = new URLSearchParams({
    topic: context.topic,
    context: context.id,
  });
  if (onBehalf) p.set("requester", "parent_carer");
  return `/ask-rwm?${p}`;
}
