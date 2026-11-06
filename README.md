# ROLL WITH ME — RWM

**MOVE TOGETHER. BECOME MORE.** London-first, mobile-first platform for young people aged 13–20, with separate parent/carer and staff experiences.

The agreed subpage architecture is now written in source: **The Law / The Terrain**, 17 topic pages, three learning branches with 18 field pages, retained local discovery choices, ten reserved story spaces and shared self/parent-carer help routes. See [implemented structure](docs/IMPLEMENTED-STRUCTURE.md) and the [image brief](docs/IMAGE-BRIEF.md). Outlined pages clearly state that their full content/resources are being prepared; the ten story slots contain no invented testimony. Design previews and the source HTML review are not a running application. Start with [the developer handover](DEVELOPER-START-HERE.md) and [the complete section communication map](docs/SECTION-AND-PAGE-MAP.md).

This is a production-minded **pre-launch source implementation**, not an operated safeguarding service, reviewed legal service, live event catalogue or deployed store. All bundled activities and stories are explicitly illustrative. No real partner, available place, legal review, testimony, funding or impact result is invented.

The primary experience is now built around **four mobile sections**:

| Section | Mobile entry | Experience |
| --- | --- | --- |
| **Know the Rules** | `/know-the-rules` | The Law / The Terrain, 17 topic pages, Facts, Context & Myths; existing matched legal drafts retain review warnings |
| **Choose a Path** | `/choose-a-path` | Tech & Engineering / Sports / Vocational & Practical; 18 field pages and nine original short introduction articles |
| **Roll With Me** | `/roll-with-me` | Choose North / East / South / West London, then one of seven shared categories; local listings with borough and age filters |
| **The Real** | `/the-real` | Ten reserved story spaces, themes and three labelled fictional examples; genuine stories await material/review |

Phones have a persistent four-section bottom bar. The rules, paths and story hubs use deliberate vertical scroll snapping and also have previous/next buttons and keyboard controls. Roll With Me retains the same swipe-card layout, showing seven shared category cards before local activity cards. There is no autoplay, endless feed or profiling-based recommendation system. Cards saved inside a feed exist in component memory for that visit only. Existing editorial list/detail routes remain available as alternatives. Mobile feed layouts account for browser viewport height and safe-area insets.

## Run locally

Requires Node.js 22.13+ (Node 24 recommended) and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The default `DEMO_MODE=true` needs no credentials. Source includes public pages, area and age filters, search, theme switching, private on-page reflections, survey branching and a browser-only merchandise bag; runtime behaviour remains to be verified. Form submissions and private-data APIs return an explicit 503 without saving. The staff UI is an empty, clearly labelled workspace preview.

```bash
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

For a dependency-free subset on Node 24, run `npm run verify:offline`. See [VERIFICATION.md](./VERIFICATION.md) for what actually ran in the build environment and what remains unverified. The full build and browser suites were blocked by dependency-installation network permissions in that environment; do not treat syntax validation as a successful Next.js build.

## Stack and structure

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4, Mongoose/MongoDB, Cloudinary, Zod, Vitest and Playwright. No alternative primary styling or database system. The lockfile, when installed, records exact dependency versions.

| Location | Responsibility |
| --- | --- |
| `src/app` | Server-rendered pages, loading/error states, route metadata |
| `src/app/api/[...path]/route.ts` | Validated, permission-checked API dispatch |
| `src/components` | Design system, original artwork, forms and interactive discovery |
| `src/lib/models.ts` | Strict MongoDB schemas and indexes |
| `src/lib/auth.ts`, `security.ts`, `http.ts` | Sessions, passwords, encryption, rate limits, origin and size checks |
| `src/lib/content-validation.ts`, `policy.ts` | Complete draft validation and fail-closed publication gates |
| `src/lib/bookings.ts` | Transactional capacity, waiting lists and event-specific guardian consent |
| `src/lib/surveys.ts` | Fixed questionnaire versions, response validation and restricted export manifests |
| `src/lib/media.ts` | Private signed upload, review, transformed delivery and deletion |
| `src/lib/data.ts` | Clearly labelled demo content and initial editable borough shortcuts |
| `src/lib/structure.ts` | Shared topic, field, activity-category and story-slot catalogue; validated local URL state and public support contexts |
| `src/lib/support-policy.ts` | Contact-preference and manual referral-record completeness checks |
| `src/lib/image-plan.ts` | Image briefs and original-art fallback slots; no invented asset paths |
| `scripts` | Non-destructive seed, local staff provisioning, retention review |
| `tests` | Publication, privacy, export and questionnaire tests; desktop/mobile browser journeys |

## Routes

Youth: `/`, `/stories`, `/stories/[slug]`, `/your-area`, `/your-area/[area]`, `/opportunities`, `/opportunities/[slug]`, `/events`, `/events/[slug]`, `/events/[slug]/register`, `/know-the-game`, `/know-the-game/[slug]`, `/get-involved`, `/challenges`, `/search`, `/ask-rwm`, `/the-circle`.

Parents/research: `/parents`, `/parents/forum`, `/surveys`, `/surveys/[slug]`.

Shop: `/shop`, `/shop/[slug]`, `/cart`, `/checkout`.

Governance/support: `/about`, `/partners`, `/impact`, `/help`, `/safety`, `/privacy`, `/accessibility`, `/terms`.

Account: `/sign-in`, `/sign-up`, `/account`, `/account/bookings`, `/account/consents`.

Staff: `/admin` and `/admin/{content,opportunities,partners,moderation,safeguarding,surveys,analytics,grants,audit,areas,media,attendance}`. Live pages require staff authentication; each API independently checks the exact role. Demo pages expose no private records.

## Connect live infrastructure

Use a **MongoDB replica set**, such as Atlas, because bookings, guardian confirmation and study publication use transactions. Configure a database user with least privilege and the reviewed retention/backups policy. Session and rate-limit indexes use TTL; build indexes during controlled deployment, not from an untrusted client.

Set `.env.local` using the example:

1. `DEMO_MODE=false`, correct `APP_URL` (HTTPS in production), `MONGODB_URI`, `MONGODB_DB`.
2. Generate **separate** 32-byte random hex values for `SESSION_SECRET`, `DATA_ENCRYPTION_KEY`, `EXPORT_SIGNING_KEY` using `openssl rand -hex 32`. Protect and back up encryption keys; losing a key makes protected content unreadable. A reviewed key-rotation/migration runbook is required before live intake.
3. Configure the Cloudinary cloud name, API key and secret on the server only. No secret uses a `NEXT_PUBLIC_` prefix.
4. Keep `INTAKE_ENABLED=false` until staffing, escalation, lawful bases, retention and controller information are approved. Enabling it also requires `SAFEGUARDING_CONTACT_URL` and an active assigned safeguarding account. The URL must identify the actual safeguarding contact and process. Hosting does not create a staffed support service.
5. `CHECKOUT_ENABLED` only accepts `false`. A typed provider adapter boundary exists, but payment collection is deliberately unimplemented.

```bash
npm run seed
```

The seed uses `$setOnInsert`, preserves existing records, creates all 33 initial borough/City browsing assignments and stores demo content as **draft, unverified**. Live discovery never falls back to seed entries. Publish real content through review workflows instead. Direction assignments can overlap and are not official territorial boundaries. GeoJSON storage is available in the model; the UI currently edits borough-to-direction assignments, not polygon geometry.

### Provision staff or a verified adult

Public signup creates only `participant` or `parent_pending` accounts. It cannot select staff or verified-adult roles. An operator must separately verify identity, training, professional qualification or guardian status as appropriate.

Set `STAFF_EMAIL`, `STAFF_PASSWORD` (16+ characters), `STAFF_ROLE` and `STAFF_VERIFICATION_REFERENCE` securely in the local process environment, then run `npm run staff:create`. Never commit values, put passwords in shell history or print them. The tool refuses to overwrite an existing account and logs the verification reference, not credentials. Role changes to existing users currently need a controlled database procedure and an accompanying audit record. A verified-adult provider role is not automatically granted to self-registered adults.

The legal-reviewer role must be provisioned only after actual professional qualification verification. A reference string is a record of that process, not a substitute for it. Separate role accounts are needed for separate responsibilities; `admin` is intentionally not a safeguarding superuser.

| Role | Access |
| --- | --- |
| participant | Own bookings, optional preferences and feedback |
| parent_pending | Own account; no forum or guardian confirmation |
| parent_verified | Separate adult forum and explicitly shared event consent codes |
| editor / admin | Editorial drafts and publication subject to review gates; media and area management |
| safeguarding | Provider checks, content safeguarding review, unassigned intake metadata and own assigned cases |
| legal_reviewer | Legal review only with verified qualification; appropriate content list/publication |
| moderator | Parent forum moderation queue, approval/rejection/removal |
| operations | Operational attendance and audited emergency contacts |
| researcher | Study protocols, publication/closure, restricted responses/exports and operational counts |
| admin | Governance, grants and audit; no automatic case, raw study or forum-body access |

## Workflow details

### Content and providers

Staff have a structured JSON action editor with schema validation and example payloads. It is functional, but not a polished rich-text CMS. Save a complete draft; edits clear prior approvals. Provider submission is account-bound and manually reviewed. Safeguarding officers check identity, policy, risk and role-appropriate DBS/eligibility records. Sensitive check documents should be stored in a separate approved restricted document store; the application retains references/check states.

Opportunity publication requires a verified provider, activity approval, risk assessment and a listing checked within 90 days. Pages never promote unverified live entries. Legal publication requires a designated, verified qualified reviewer, authoritative source IDs, completed review date and a future next-review date. Expired legal reviews and inactive qualified reviewers are omitted at request time. Public payloads use explicit field projections to keep release, guardian and internal staff references out of browsers. Stories require a permission/release reference, guardian record where applicable, safeguarding approval, transcript and content note. The source registry contains explicit GOV.UK/NHS/Childline URLs; no penalties or sources are generated by AI.

`POST /api/admin/content` or `/api/admin/opportunities`: `save`, `safeguarding-review`, `legal-review`, `publish`, `unpublish`. Reviews append revision hashes. Event/challenge experiences use reviewed opportunity records in V1; standalone publication is blocked. Real video/audio authoring, captions editor, translations and release-document upload are not implemented; text stories and transcript fields are supported.

### Booking and consent

Adults aged 18–20 reserve capacity atomically or join a waiting list. Under-18 requests remain pending **without reserving capacity** until a separately verified guardian submits the private code. The code is shown once, stored only as a hash and expires after 24 hours. It is shared directly by the participant, never through a hidden parent account link. Guardian confirmation atomically reserves a place or joins the waiting list. Emergency contacts are encrypted. Only operational staff can read them, and reads are audited. Participants can cancel and leave private post-attendance feedback. Duplicate bookings are rejected by a unique compound index.

Waiting-list promotion, expired-consent recovery, operational change notifications, cancellations by organisers, session rosters with operational assignments and automated notification delivery need further work. There is no email/SMS provider. Do not run real sessions without those procedures and a tested supervision/incident plan.

### Safeguarding and moderation

`/api/ask` accepts minimal structured fields, not open chat. Intake is closed by default. Staff see metadata for unassigned cases, must claim one atomically, and may read/update only their assigned cases. Message, reply address, emergency contact and protected notes use AES-256-GCM. Reads/actions/exports create audit records. High-risk cases require human escalation outside the site; there is no AI answering or automatic resolution. Generic errors/logs exclude submitted text.

The separate parent forum requires a verified adult and premoderation. Readers can report and hide posts. Body access is restricted to verified readers of approved posts and moderation staff for the queue. No youth public comments, DMs, public profiles, precise location sharing or adult-to-child contact exists. Youth anonymised Q&A publication and officer reassignment/escalation connectors are not implemented; no fictional community posts are presented as live.

Ask RWM now supports self/parent-carer requests, relationship, an explicitly attached public topic, optional borough, email-reply opt-in and safe-contact preferences. A successful live receipt returns a request reference. Staff can see routing/follow-up metadata, claim a case and record a named referral with an informed-consent or documented safeguarding-duty basis. These actions **record** human work; they do not deliver email or transmit referrals. Optional `SUPPORT_EMAIL`/`SUPPORT_HOURS` must describe a real operated inbox and hours. Email ingestion/delivery and callback services remain unconnected. Parent submissions do not grant access to a young person's private account. See the implementation record for details.

### Surveys and exports

Five question types, required/optional fields, earlier-question branching and preview are supported. Server validation drops hidden/unknown answers. Protocols include purpose, lawful basis, ethics reference, sampling, conflicts, plain-language check, participant information, withdrawal and retention. A published questionnaire is a separate immutable version containing its snapshot and SHA-256 hash; every response stores that ID and server timestamp. Close a study before publishing another version. The current editor creates new draft studies; a dedicated revision editor is not implemented.

Research requiring under-18 guardian consent is **blocked from publication** until that separate consent workflow exists. The event guardian code is never reused for research. Potential evidence intake is **always disabled**. No study is claimed to have actual independent ethics review merely because a field has been filled in.

Researchers can download a restricted JSON bundle containing CSV, data dictionary, methodology, a server-timestamped SHA-256 file manifest and HMAC signature. CSV values are quoted and neutralised against formula injection. This proves consistency relative to the trusted application key; it is **not** independent timestamping, court certification, an electronic qualified signature or proof that answers are true/representative. HMAC verification requires the protected shared key. Raw export files are not persisted in public media or browser storage. Use a reviewed secure export-handling process.

No direct identifiers or IPs are stored in feedback responses. Infrastructure access logs, timestamps, rare answers and free text can still identify people. Survey throttling uses a study-wide bucket rather than participant fingerprints; duplicate prevention/sampling controls and small-cell disclosure review require further work. There is no public results publication.

### Media

`/api/media/sign` generates a server-owned random public ID and signed **authenticated/private** Cloudinary upload. Client checks format/size; server completion fetches authoritative Cloudinary metadata before queuing human review. Only approved images receive signed, resized delivery URLs through the application. Deletion sets a pending state, destroys the asset and invalidates delivery before marking it deleted. Never include release documents, case evidence or private exports in this public editorial flow. Image upload is implemented; hosted video, automatic external moderation, webhook ingestion and a comprehensive media-use dependency graph are not.

### Retention and audit

`npm run retention:review` is a dry-run. It counts expired research responses, cases needing review and old operational bookings. Setting `RETENTION_APPLY=true` deletes only responses whose study retention has expired and logs each deletion. It never automatically deletes safeguarding cases. Schedule and monitor this job only after approving policy. Withdrawal and account-deletion requests are logged/flagged for human processing; no promise of automatic legal erasure is made.

Application middleware prevents updating/deleting published questionnaire versions and audit entries. This is not protection from database administrators. Deploy collection-specific database permissions, restricted backup/export access and an independent retention/audit destination for stronger assurance. Encryption is not a substitute for access governance.

## Design and asset rights

Tarmac `#121212`, Crown `#FAF4F0`, Concrete `#8C8C8C`, High-vis `#FF5500`; accessible darker orange for small text in light mode. Responsive light and dark tokens apply to every route; the initial theme follows system preference and a manual toggle is stored locally. Keyboard focus, reduced-motion behaviour, a skip link, labelled forms and loading/error/empty states are included.

All five attached reference images were inspected for direction. They are **not copied into the public site** or treated as licensed photography. Basketball court, code, route, sports and garment visuals are original SVG/CSS illustrations, labelled as original artwork or design samples. The custom pawn/R mark, die, crown, route and coordinate symbols are non-threatening decorative brand elements. No random AI faces or real-person testimony is used.

Bundled Open Sans Condensed Bold / Open Sans and DejaVu Sans Mono are locally served open-source alternatives; their licence notices are in `public/fonts`. The display font is not claimed to be the proprietary reference font. A separate rights review of final brand marks is still appropriate before commercial launch.

## Deploy to Vercel, Atlas and Cloudinary

1. Import this repository into Vercel using the Next.js preset. Do not expose secrets as public environment variables. Production uses Node runtime route handlers.
2. Start with `DEMO_MODE=true` for review. No deployment is claimed by this repository.
3. Provision Atlas with TLS, a replica set, scoped credentials, backups and an approved region/data-processing setup. Ensure Vercel egress can reach Atlas using your chosen networking configuration.
4. Set live environment values on Vercel, configure the correct canonical HTTPS `APP_URL`, create indexes, seed initial area shortcuts and provision verified staff through a controlled local environment.
5. Configure Cloudinary credentials and private/authenticated media. Verify an actual private upload, review, signed delivery and deletion in a staging account.
6. Run type, lint, unit, build and browser checks. Add staging integration tests for concurrent Atlas transactions, expiry, role boundaries and external failures. Perform an independent accessibility, security, legal and safeguarding review.
7. Publish controller identity, actual responsible officers, funding/conflict disclosures, reviewed notices and operating procedures. Test referrals/incident cover outside the site. Only then enable intake or publish reviewed real content.

Security headers include CSP, disabled geolocation/camera/microphone, no framing, MIME protection and referrer policy. The CSP currently allows Next.js inline scripts/styles; deploy a tested nonce-based CSP and verified proxy configuration before a high-assurance launch. Apply HSTS at the HTTPS deployment layer. Authentication needs verified email, account recovery, staff MFA, session revocation UI and a professional security review before production use. No external MongoDB, Cloudinary, payment, email, ethics or professional legal review is implied by a successful local build.

## Test scope and known limits

Unit tests cover legal/opportunity gates, guardian age rules, role boundaries, safe demo data, schema completeness, survey branches/answer validation and CSV injection. Playwright covers theme persistence, filtering, preview write rejection, hostile-origin rejection, restricted APIs, legal warnings, the demo bag and responsive overflow on desktop/mobile.

Live Atlas transaction races, authenticated role integration, actual Cloudinary signing/deletion, email/SMS, payment checkout and professional safeguarding/legal validity require configured external environments and have not been established by unit tests. This is intentionally documented rather than presented as production certification.

## Location-first Roll With Me

The four catchments share one ordered category directory in `src/lib/structure.ts`. Both `/roll-with-me?area=North` and the legacy `/roll-with-me/categories?area=North` render it. Category pages live at `/roll-with-me/categories/<slug>?area=North`; legacy area and borough routes redirect while retaining valid filters. Missing or invalid catchments prompt an explicit choice.

Each opportunity has one `canonicalCategory`. New staff submissions require it; old records resolve through a conservative compatibility mapping until resaved. The eight demo records keep their regions, with `maker-session` assigned to Tech & Engineering. Holiday flags and other tags do not create extra canonical homes. Optional `catchments`, `boroughs`, `tags` and `vocation` fields support provider data as it is confirmed.

`src/lib/local-discovery.ts` centralises locality, age, category, specialism and publication filtering. Demo previews require both demo mode and an explicit `preview=demo` opt-in. Provider verification, current checks, safeguarding/risk assessment approval and age eligibility gate registration; the existing server-side guardian consent workflow remains in place.

The six approved images are stored under `public/images/categories/`, with original Drive asset IDs in the category catalogue. Pick a Vocation uses a neutral placeholder pending approved artwork. Live borough choices come from the staff-maintained Area collection. The pre-existing demo borough map is a preview fixture, **not confirmation of RWM's final catchment boundaries**; RWM must confirm the production map and verify real providers before launch.

QA covers all 28 region/category combinations, legacy links, filter persistence, age eligibility, demo isolation and publication gates. To avoid another project already running on port 3000, Playwright accepts `PLAYWRIGHT_BASE_URL` and `PLAYWRIGHT_SERVER_COMMAND`; `PLAYWRIGHT_CHANNEL=chrome` selects an installed Chrome browser. Example after a successful build:

```sh
PLAYWRIGHT_CHANNEL=chrome PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 PLAYWRIGHT_SERVER_COMMAND='npm run start -- --port 3100 --hostname 127.0.0.1' npm run test:e2e -- tests/e2e/local-activities.spec.ts tests/e2e/mobile-feeds.spec.ts
```
