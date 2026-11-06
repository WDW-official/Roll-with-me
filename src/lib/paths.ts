export type PathCategory = "Tech" | "Sports" | "Vocation";
export interface PathLesson {
  slug: string;
  category: PathCategory;
  title: string;
  kicker: string;
  description: string;
  art: string;
  steps: {
    title: string;
    body: string;
  }[];
  takeaway: string;
  relatedCategory: string;
}
export const pathLessons: PathLesson[] = [
  {
    slug: "your-first-website",
    category: "Tech",
    title: "AN IDEA. A SCREEN. A START.",
    kicker: "WEB DEVELOPMENT / 01",
    description:
      "Every site you use began as someone’s idea. Learn what goes into building one — then try a small move of your own.",
    art: "code",
    steps: [
      {
        title: "Three parts of a page",
        body: "HTML gives a page structure. CSS gives it its look. JavaScript adds interactions. You don’t have to learn all three at once.",
      },
      {
        title: "Try one tiny build",
        body: "Sketch a page for an interest you care about. Give it a clear heading, a short introduction and one useful action. Think about someone using it on a small phone.",
      },
      {
        title: "Build for other people",
        body: "Readable text, keyboard access, clear labels and good contrast are part of building well. Start with a free learning resource and never pay for a course without checking it with a trusted person.",
      },
    ],
    takeaway: "Start small. Make one useful thing. Improve it.",
    relatedCategory: "Coding & tech",
  },
  {
    slug: "robotics-starts-small",
    category: "Tech",
    title: "MAKE SOMETHING MOVE.",
    kicker: "ROBOTICS & ENGINEERING / 02",
    description:
      "Code meets the physical world. Robots are built from small systems — and curious people.",
    art: "robot",
    steps: [
      {
        title: "Sense. Decide. Act.",
        body: "A sensor reads something, code makes a decision and an output responds. A light that reacts to brightness is already a useful first project.",
      },
      {
        title: "A safe first step",
        body: "Try a browser-based electronics simulator or a supervised beginner workshop. Leave mains power, batteries, moving machinery and specialist tools to appropriately trained supervision.",
      },
      {
        title: "More than one role",
        body: "Robotics can involve software, mechanical design, electronics, testing and teamwork. You can start with the part that interests you.",
      },
    ],
    takeaway: "Curiosity counts more than already knowing the answer.",
    relatedCategory: "Coding & tech",
  },
  {
    slug: "creative-technology",
    category: "Tech",
    title: "YOUR IDEAS. NEW TOOLS.",
    kicker: "CREATIVE TECHNOLOGY / 03",
    description:
      "Design, editing, animation and sound all have a place in tech. You don’t need to pick between creative and technical.",
    art: "film",
    steps: [
      {
        title: "Tell one clear story",
        body: "Plan a 20-second sequence using drawings or objects. A beginning, a change and an ending are enough to practise storytelling.",
      },
      {
        title: "Respect people and rights",
        body: "Ask before recording someone. Don’t include anyone’s private information. Use your own work or material you have permission to use.",
      },
      {
        title: "Keep a small portfolio",
        body: "A few thoughtful projects can show what you enjoy and how you improve. Keep personal contact details private and ask a trusted adult before publishing work that identifies you.",
      },
    ],
    takeaway: "Make it yours. Make it with care.",
    relatedCategory: "Film & music",
  },
  {
    slug: "more-than-the-score",
    category: "Sports",
    title: "MORE THAN THE SCORE.",
    kicker: "PLAYING & PROGRESS / 01",
    description:
      "Sport can be about enjoyment, routine and belonging. You don’t need to be the best person in the room to belong there.",
    art: "court",
    steps: [
      {
        title: "Find a good environment",
        body: "Look for verified supervision, age-appropriate sessions and a coach who treats everyone with respect. Ask about accessibility, costs and equipment.",
      },
      {
        title: "Choose your own progress",
        body: "A goal could be showing up regularly, learning a skill or enjoying movement. Compare your progress with your own starting point.",
      },
      {
        title: "Look after yourself",
        body: "Use suitable equipment and follow a qualified coach’s guidance. Stop and tell the responsible adult if something hurts or feels unsafe.",
      },
    ],
    takeaway: "Your pace. Your progress. Your place on the team.",
    relatedCategory: "Basketball",
  },
  {
    slug: "behind-the-game",
    category: "Sports",
    title: "THE GAME HAS MORE ROLES.",
    kicker: "COACHING & SPORT CAREERS / 02",
    description:
      "Not every route in sport is professional playing. Coaching, officiating, events and creative work all help a game happen.",
    art: "football",
    steps: [
      {
        title: "Look around the pitch",
        body: "Think about who organises a session, cares for the venue, runs the scoreboard or tells the story afterwards. Different strengths fit different roles.",
      },
      {
        title: "Learn under supervision",
        body: "Age limits, qualifications and safeguarding requirements vary. Find an official governing body or verified provider and ask about appropriate introductory routes.",
      },
      {
        title: "Ask practical questions",
        body: "What does training cost? Is it recognised? Who supervises? What support is available? Don’t accept promises of guaranteed trials, contracts or jobs.",
      },
    ],
    takeaway: "You can be part of the game in more than one way.",
    relatedCategory: "Football",
  },
  {
    slug: "find-your-rhythm",
    category: "Sports",
    title: "FIND YOUR RHYTHM.",
    kicker: "MOVEMENT & WELLBEING / 03",
    description:
      "A short walk, a coached sprint session or non-contact fitness. Movement can fit around who you are.",
    art: "sprint",
    steps: [
      {
        title: "Start where you are",
        body: "Try an activity that suits your access needs and experience. A qualified provider should be able to explain adaptations and suitable starting points.",
      },
      {
        title: "A routine that works for you",
        body: "Small, realistic plans are easier to return to. Rest, food, sleep and support matter too.",
      },
      {
        title: "Know when to get advice",
        body: "If you have a health concern, ask a qualified health professional about what is appropriate for you. A sports session is not a substitute for medical or mental-health care.",
      },
    ],
    takeaway: "Movement is an option, not a test of your worth.",
    relatedCategory: "Athletics",
  },
  {
    slug: "make-it-with-your-hands",
    category: "Vocation",
    title: "SKILLS YOU CAN BUILD ON.",
    kicker: "TRADES & MAKING / 01",
    description:
      "From carpentry to construction design, practical work brings ideas into the world. Start with safe, supervised learning.",
    art: "maker",
    steps: [
      {
        title: "Get a feel for the work",
        body: "A verified taster session can help you explore measuring, planning, materials and design before committing to a course.",
      },
      {
        title: "Safety is part of the skill",
        body: "Tools and workshops require training, suitable supervision and protective equipment. Don’t practise hazardous tasks alone or use equipment without permission.",
      },
      {
        title: "Check the next step",
        body: "Ask a school careers adviser, college or official training provider about recognised routes, entry requirements, support and costs.",
      },
    ],
    takeaway:
      "A practical skill is a place to start, not a limit on your future.",
    relatedCategory: "Design & trades",
  },
  {
    slug: "apprenticeships-explained",
    category: "Vocation",
    title: "LEARN. WORK. KEEP GROWING.",
    kicker: "APPRENTICESHIPS / 02",
    description:
      "An apprenticeship combines work and training. It is worth understanding the details before making a decision.",
    art: "code",
    steps: [
      {
        title: "What to look for",
        body: "Check the employer, recognised qualification, training provider, entry requirements and working arrangements. Eligibility varies; use the official government apprenticeship service.",
      },
      {
        title: "Ask about the whole offer",
        body: "Hours, pay, travel, support, study time and accessibility all matter. A trusted careers adviser can help you compare options without pressure.",
      },
      {
        title: "No guaranteed places here",
        body: "RWM’s demo listings do not offer real apprenticeships. Visit GOV.UK’s apprenticeship pages or your school or college careers team for current opportunities.",
      },
    ],
    takeaway: "A good opportunity should stand up to clear questions.",
    relatedCategory: "Design & trades",
  },
  {
    slug: "your-first-creative-brief",
    category: "Vocation",
    title: "TURN AN INTEREST INTO A SKILL.",
    kicker: "CREATIVE WORK & ENTERPRISE / 03",
    description:
      "Design, video, music and youth enterprise all begin with something you can practise. Learn the work behind the finished thing.",
    art: "film",
    steps: [
      {
        title: "Work to a small brief",
        body: "Design a poster for an imaginary event. Who is it for, what do they need to know and what should they do next? Keep it readable on a phone.",
      },
      {
        title: "Understand agreements",
        body: "Before real paid work, ask a trusted adviser about payment, permissions, contracts and age-specific requirements. Don’t share financial or identity documents with someone you haven’t checked.",
      },
      {
        title: "Explore without pressure",
        body: "A supervised course, careers conversation or volunteering role may help you learn. Ask about expenses and expectations. Your time has value.",
      },
    ],
    takeaway: "An interest is a start. Practice gives it shape.",
    relatedCategory: "Film & music",
  },
];
