# ROLL WITH ME — developer handover

Snapshot: 31 October 2026. Owner brief, source snapshot, section communication map and review visuals.

**This is a pre-launch source implementation, not a deployed or fully tested service.** Subsection routes and layouts are written. Many articles remain outlines. Legal drafts, fictional stories and unverified activity examples are labelled. The complete application has not been compiled or browser-tested in this environment. Do not interpret the included design images or read-only HTML exports as proof of running software.

## What the platform is about

**ROLL WITH ME / RWM — MOVE TOGETHER. BECOME MORE.** London is the starting geography. The campaign line is DIFFERENT START. SAME GAME. BETTER ENDING.

RWM helps young people discover interests, understand rights and consequences, find useful local activities, learn from other experiences and ask for trusted help. It should feel like a credible youth-culture, sport, creative and streetwear-informed platform. The underlying aim is to reduce exposure to violence and exploitation through opportunity, information and positive networks. It must not assume a young person's history, label a borough as dangerous or frame users as criminals.

The primary audience is approximately 13–20, with routes for 13–15, 16–17 and 18–20. Secondary audiences include parents/carers, verified providers, education organisations, mentors, funders and vetted safeguarding/legal professionals. Anonymous reading and discovery should remain available. Young people are active participants and co-designers; parent-led governance, funding and a youth advisory council must be explained transparently. No hidden parental, sponsor or authority tracking is part of the product.

## The four main sections

| Section | What it communicates | Subsections | Main user action |
| --- | --- | --- | --- |
| Know the Rules | Understand the law, your rights, real consequences and everyday judgment. | The Law: 9 topics. The Terrain: 8 topics. Facts, Context & Myths. | Choose a topic, explore information/reflection, follow official sources or ask for help. |
| Choose a Path | An interest can become a small first step, then a possible learning or work route. | Tech & Engineering: 7 fields. Sports: 5. Vocational & Practical: 6. | Choose a field, learn starter concepts, compare age-appropriate routes and explore local tasters. |
| Roll With Me | Your area can offer people, activities and opportunities worth getting involved in. | North/East/West/South London; boroughs; 6 activity categories. | Select area/age/interest, browse checked details and join only a genuinely verified open activity. |
| The Real | Experiences have context, consequences, turning points and possible ways forward. | Ten reserved story spaces; themes; fictional examples; share-your-story expression of interest. | Read/watch an approved story, reflect privately, explore a path or seek help. |

**The full explanation of every named subsection, its route, starter concepts and intended message is in `docs/SECTION-AND-PAGE-MAP.md`.** `docs/CONTENT-CATALOGUE.json` is the machine-readable snapshot. The working catalogue in the application is `src/lib/structure.ts`.

The Circle, Parents, Shop, Surveys, Partners and Impact are supporting sections, rather than additional primary mobile pillars. The Real is the current working story name. “Choose a Path” is the learning section; partner/provider management is separate.

## How the page hierarchy works

Homepage → one of four sections → branch, topic or local area → swipeable cards → full detail page → next step or help.

The four mobile hubs use vertical card scrolling with scroll snapping. Topic/area selectors stay prominent, and previous/next controls support alternatives to touch. Full articles use normal reading layouts. The source includes a persistent mobile four-section navigation, nested breadcrumbs, search, self/parent-carer help links and light/dark theme tokens. There is no autoplay, unrestricted youth chat, adult-to-child direct messaging, public youth profile or live location sharing.

A rules topic is more than a title: it has a purpose, artwork, preparation status, draft guide text where available, exploration questions, optional private reflection, related topics and help. A learning field adds basic concepts, three age routes, next-step prompts, relevant existing introduction articles, resource preparation notices, supervision guidance and local activity links. Most field-specific projects, video shortlists and full terrain lesson scripts still need authoring.

## Current source contents and their limits

| Item | Included now | What remains |
| --- | --- | --- |
| Rules and learning hierarchy | 17 rules topics; 18 learning fields; branch/directory/detail templates. | Fully authored scenarios, field-specific plans, checked videos and resource editorial workflow. |
| Introductory learning articles | Nine short original introductions with three steps each. | A complete course library, progress tracking or accreditation is not implemented. |
| Legal information | Nine illustrative guide drafts, source registry, review metadata/publication gates. | Actual qualified legal review and reviewed publication. No fabricated reviewer or legal penalty is supplied. |
| Activities | Eight clearly labelled unverified demo entries, local filters and provider/listing review code. | Real providers, schedules, eligibility, availability, access details and operational checks. |
| Stories | Three fictional examples and ten reserved ST01–ST10 pages. | The owner's ten genuine stories, releases, consents, captions/transcripts and reviews. |
| Help/intake | Self/parent form, context and contact preferences; encrypted assigned-case source; human referral records. | Actual staffing, inbox/email delivery, approved external referral process and live integration testing. Intake stays closed by default. |
| Accounts | Password hashing, database-backed sessions and role checks. | Verified email, recovery, staff MFA and session-management improvements; end-to-end security testing. |
| Events | Transactional booking/guardian/waiting-list source, check-in and feedback. | Real event operation; concurrent replica-set tests, promotion/recovery and notification workflows. |
| Administration | Restricted content, provider, moderation, cases, surveys, areas, media, attendance, analytics, grants and audit routes. | User-friendly editorial forms; some current actions use structured JSON; complete usability/integration tests. |
| Research | Protocol fields, five question types, branching, fixed live versions, restricted export/manifests. | Actual ethical/legal review and research operation. Under-18 research requiring guardian consent is blocked; evidence collection is disabled. |
| Media | Server-generated signed private image upload/review/deletion source for Cloudinary. | Actual Cloudinary verification; mature video/audio, captions and release-document workflows. |
| Shop | Three design concepts, illustrative prices and demo cart; checkout adapter boundary. | Real stock, payment provider, webhook, fulfilment, tax/refund implementation. Payments are disabled. |

## Safeguarding, content and privacy boundaries

Keep The Law distinct from The Terrain. Legal claims need jurisdiction, authoritative references, a designated verified qualified reviewer, review dates and correction handling. Terrain material should teach respectful communication, boundaries, leaving conflict and finding support. Do not present race, clothing, group size or being out late as automatic grounds for stop/search. Do not invent demographic statistics or depict an “offender look”. Practical suggestions do not guarantee safety or transfer blame to a victim.

Knife content must not recommend carrying, present a pocketknife exception as a protection loophole or explain attack targeting. Offences depend on facts, intent, evidence and outcomes. Immediate danger in the UK: 999. Emergency routes must work independently of Ask RWM availability. High-risk cases are never automatically answered/resolved by AI.

Parents/carers can ask on behalf of a young person, but do not receive automatic access to private account activity, messages or research responses. Guardian event consent is separate from research consent and general account access. The adult forum remains separate and premoderated. No public youth comments should open without effective moderation.

Research is optional. Raw submissions stay restricted; reports need methodology, sampling/conflict disclosures and disclosure controls. Hashes/signatures help check consistency; they do not make data true, representative, independently timestamped or court-admissible. Evidence collection is explicitly disabled pending a distinct reviewed workflow.

Published programmes need provider identity, safeguarding checks, suitable risk assessment and role-appropriate DBS/eligibility checks where required. A database field or an admin checkbox does not replace a real verification process. Do not enable services simply because a route exists.

## Technical stack and source map

Required stack: Next.js App Router, React, strict TypeScript, Tailwind CSS, MongoDB/Mongoose and Cloudinary. Supporting libraries include Zod, Lucide, Vitest and Playwright. Package ranges currently declare Next.js 16, React 19 and Tailwind 4. No lockfile is present: resolve compatible patched versions and commit the lockfile as part of reproducible setup.

| Source | Responsibility |
| --- | --- |
| `src/app` | Public, account, admin pages and route metadata; `docs/PAGE-ROUTES.csv` lists all 61 page templates. |
| `src/app/api/[...path]/route.ts` | Server-side API dispatch, validation, role and workflow checks. |
| `src/lib/structure.ts` | Branches, 17 rule topics, 18 fields, six categories, ten slots, local URL state, public support contexts. |
| `src/components/swipe-feed.tsx` | Four main swipe feeds, tabs/filters, card controls and contextual help. |
| `src/app/know-the-rules/[branch]/[topic]/page.tsx` | Individual legal/terrain topic layout. |
| `src/app/choose-a-path/[slug]/[field]/page.tsx` | Individual field layout. `[slug]` is intentional for compatibility with branch/intro pages. |
| `src/components/support-form.tsx`, `context-support.tsx` | Self/parent form and page-context support links. |
| `src/lib/models.ts`, `db.ts` | Strict MongoDB models/indexes and cached serverless connection. |
| `src/lib/auth.ts`, `security.ts`, `http.ts` | Sessions, password hashing, encrypted private values, request checks and rate limiting. |
| `src/lib/content-validation.ts`, `policy.ts`, `public-content.ts` | Validation/publication gates and explicit public-data projections. |
| `src/lib/bookings.ts`, `surveys.ts`, `media.ts` | Booking/consent, questionnaire/export and Cloudinary workflows. |
| `src/lib/data.ts`, `paths.ts` | Demo content, initial borough shortcuts and nine original introduction articles. |
| `src/lib/image-plan.ts`, `docs/IMAGE-BRIEF.md` | Image slots, specifications, rights/consent requirements and original-art fallback. |
| `src/app/globals.css`, `public/fonts` | Light/dark tokens, responsive styles, licensed local fonts and font licences. |
| `scripts`, `tests` | Seed/staff/retention scripts; offline checks; unit and browser tests awaiting full execution. |

## Setup for the developer

Use Node.js 22.13+; Node 24 is recommended. In the supplied `source` directory:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Default demo mode uses no external credentials. Demo sensitive form submissions fail explicitly rather than saving data. In this environment these setup steps have not produced a verified running app, because dependency installation was blocked/stalled. Review/fix source as needed before promising a working staging build.

Run the full checks after installation:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run verify:offline` runs the dependency-free subset on Node 24. The latest run passes 86 checks. That result is not TypeScript semantic checking, a Next.js production build or browser verification.

For live staging, configure MongoDB Atlas/a replica set, Cloudinary and server-only secrets as documented in README.md. Transactions require a replica set. Keep `INTAKE_ENABLED=false` and checkout disabled. Do not reuse production credentials for review. The package contains `.env.example` with blank credential fields, no real credentials or operational/private submissions. Never place secrets in browser variables or ship case exports as public assets.

Deployment target can be Vercel with Atlas and Cloudinary. No deployment, live email, payment, professional legal review or independent accessibility/security audit is claimed. See README.md for environment variables, staff provisioning and workflow/deployment details.

## Verification and first delivery priorities

Completed: 86 dependency-free policy/content/structure/support checks; syntax/local-import checks documented in VERIFICATION.md; catalogue URL/source inspections. Complete TypeScript semantic checking, lint, Vitest, production build and Playwright have not run. There are no verified browser screenshots.

First deliver a reproducible local/staging build with lockfile and passing required checks. Test actual mobile screens, swipe controls, keyboard alternatives, theme preference, scrolling, help visibility and error states. Capture real screenshots of the four hubs and at least one branch/detail per main section. Then connect staging infrastructure, test role/privacy/publication/transaction boundaries and replace structured editorial inputs where needed. Agree real content and an operational launch scope before enabling intake, booking, community, research or payments.

## Images and review files supplied

The `visuals/design-previews` folder contains ten mobile viewport PNGs, three selected full-page PNGs and two overview boards. These are earlier source-informed manually composed design previews, not Canva deliverables and not browser screenshots. Labels and captions preserve that distinction. They communicate visual direction, not exact runtime rendering or completed content. They do not cover every individual topic/field. The HTML source review covers 99 exported page states, including each rule topic and learning field.

The `review/OPEN-RWM-SUBSECTIONS.html` file is self-contained and opens directly on Mechanical Engineering. Select another subsection to scroll its source-derived markup, or switch width/theme. React controls/forms are disabled; Tailwind utilities are approximated. It is not a substitute for running the app. Individual exports and their route/source manifest are also included.

Reference JPEGs in `source/docs/visual-references` are inspiration only; public use rights have not been established. The original supplied references are not presented as licensed website photography. Use original SVG art until real rights/consent are checked. Required photographic/film asset briefs are in `docs/IMAGE-BRIEF.md`; no random AI faces or fabricated authentic testimony should replace them.

## Files to read in order

1. This document — purpose, scope, current implementation and limits.
2. `docs/SECTION-AND-PAGE-MAP.md` — every named subsection, message, route and current page blocks.
3. `docs/CONTENT-CATALOGUE.json` and `docs/PAGE-ROUTES.csv` — machine-readable inventory.
4. `README.md`, `.env.example` and `VERIFICATION.md` — setup, operations and actual checks.
5. `docs/IMPLEMENTED-STRUCTURE.md`, `docs/SUBSECTION-STATUS.md` and `docs/IMAGE-BRIEF.md` — detailed implementation/status/media context.
6. The supplied HTML source review and labelled PNGs — review aids, not evidence of an app build.

Operator/controller identity, real safeguarding and legal contacts, staffing, partner relationships, final editorial titles, genuine story material, real activity data and reviewed policies still need the owner's input. These are content/operational dependencies, not prerequisites for the developer to start reviewing and running the source.
