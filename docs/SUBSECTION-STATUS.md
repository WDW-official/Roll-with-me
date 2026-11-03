# Subsection implementation status

Checked against the repository on 31 October 2026.

**The subsection routes and layouts have been written. They are not a fully authored, reviewed or browser-verified platform.** Previous manually composed PNG/PDF previews did not demonstrate the running website.

The downloadable `artifacts/OPEN-RWM-SUBSECTIONS.html` is a read-only export generated from the page components. It starts inside Mechanical Engineering. The selector exposes individual subsections; the page can be scrolled, viewed at mobile/desktop width and switched between light/dark source styles. This is not a Next.js build or screenshot: React controls are disabled, dependencies have not been installed, and a small set of Tailwind utilities is approximated. Backend services do not run in this file.

| Main section | Subsections written | Actual content status |
| --- | --- | --- |
| Know the Rules | The Law (9 topics), The Terrain (8 topics), Facts, Context & Myths | Topic layouts, purpose, questions, reflection and help links. Matching existing legal drafts appear with explicit review warnings. Terrain topics are outlines, rather than full lessons. |
| Choose a Path | Tech & Engineering (7 fields), Sports (5), Vocational & Practical (6); all-fields directory | Each field has a page with basic concepts, age-specific routes, next-step/resource preparation notices, related existing introductions, local activity and help links. Nine short introduction articles exist. Full lessons and checked videos are unfinished. |
| Roll With Me | North, East, West and South London; borough pages; 6 activity category views | Local browsing structure, filters and activity detail pages. The eight seeded activity examples remain labelled DEMO / NOT VERIFIED and cannot be booked as live opportunities. |
| The Real | Ten reserved story pages, themes, existing fictional examples, share-your-story route | ST01–ST10 await supplied material, permissions and review. The three fictional design examples are labelled. Ten genuine finished stories have not been created. |

## Know the Rules

The Law:

- Police encounters & stop and search
- Arrest, interviews & a solicitor
- Violence, fights & consequences
- Knives & weapons
- Drugs, pressure & exploitation
- Consent, sex & relationships
- Online threats & private images
- Friends, groups & responsibility
- School, work & everyday rights

The Terrain:

- Read the situation
- How you carry yourself
- How you talk when things get tense
- Moving through unfamiliar places
- Out with friends; getting home
- Your code: respect & boundaries
- When online conflict moves offline
- When to leave; when to get help

A topic page contains its heading and purpose, content-status warning, original banner artwork, existing draft text if available, questions to explore, private reflection, related topics and contextual help. Law, practical suggestions and personal values are distinguished.

Source template: `src/app/know-the-rules/[branch]/[topic]/page.tsx`.

## Choose a Path

Tech & Engineering:

- Web development
- Software & coding
- Robotics & automation
- Electrical engineering
- Electronics
- Mechanical engineering
- Creative digital skills

Sports:

- Football & futsal
- Boxing & martial arts
- Athletics
- Basketball
- Coaching, refereeing & sport careers

Vocational & Practical:

- Motor vehicle mechanics
- Carpentry & joinery
- Electrical installation
- Plumbing & heating
- Construction & building trades
- Apprenticeships & entry routes

A field page contains its heading and purpose, preparation notice, original banner artwork, starter concepts, routes for 13–15/16–17/18–20, a next-step prompt, any relevant existing introductory article, video-shortlist preparation notice, trusted introduction guidance, possible routes, private reflection, local activity links, related fields and contextual help. Generic age-route and next-step copy still needs field-specific development. No reviewed YouTube shortlist is connected.

Source template: `src/app/choose-a-path/[slug]/[field]/page.tsx`.

## Roll With Me

The geographical route is area → borough → local activity feed → activity detail. The six category views are Sport & Movement; Tech & Engineering; Creative Activities; Trades, Careers & Enterprise; Mentoring & Support; Holidays, Events & Challenges. List/feed discovery is based on manually chosen areas, not live location.

Source templates: `src/app/roll-with-me/[area]/page.tsx`, `src/app/roll-with-me/[area]/[borough]/page.tsx`, `src/app/roll-with-me/categories/[category]/page.tsx`.

## The Real

ST01–ST10 are reserved pages with permission, review and story-structure explanations. They contain no invented first-person accounts. Existing fictional demonstration stories have separate detail pages.

Source template: `src/app/the-real/collection/[slot]/page.tsx`.

## Shared support and verification

Public section pages include help routes for the young person or a parent/carer, and independent service links. The intake form and restricted case/referral source have been written. Intake is closed by default; there is no connected email delivery, staffed reply service or automatically completed referral.

The latest offline verification passes 86 policy, content, structure and support checks. Full TypeScript/build, Vitest and browser checks remain outstanding until dependencies are available. The source HTML export does not replace those checks.
