**RWM — IMPLEMENTED CONTENT STRUCTURE**

Source update: 31 October 2026. This record describes the page structure now written in the repository. Outlined content is not presented as approved or fully authored content. External services and complete application compilation/browser behaviour remain unverified.

| Area | Source routes and behaviour |
| --- | --- |
| Know the Rules | `/know-the-rules` offers The Law and The Terrain. `/know-the-rules/[branch]` browses branch topics. `/know-the-rules/[branch]/[topic]` resolves 17 topic pages: 9 law and 8 terrain. Existing eligible guide drafts/approved guides are matched by slug and retain their actual review warnings. Empty topics show their purpose, questions, private reflection and preparation state. |
| Facts, Context & Myths | `/know-the-rules/facts-and-myths` describes how evidence will be interpreted. It contains no invented demographic figures or offender-look images. |
| Choose a Path | `/choose-a-path` offers three branches. `/choose-a-path/[slug]` recognises branch slugs and preserves the existing nine introduction articles. `/choose-a-path/[slug]/[field]` resolves 18 fields across Tech & Engineering, Sports and Vocational & Practical. Each field includes basic concepts, age-aware routes, related existing introductions, resource/project preparation notices, local activity links and contextual help. `/choose-a-path/directory` provides a list alternative. |
| Roll With Me | `/roll-with-me` accepts validated `area`, `borough`, `age` and `category` query values. It keeps all four direction tabs visible. `/roll-with-me/categories` and `/roll-with-me/categories/[category]` expose six category views. `/roll-with-me/[area]` lists the current editable borough shortcuts, and `/roll-with-me/[area]/[borough]` opens the local feed. Choices are carried into activity detail/registration URLs, with a back/change-area navigation bar. No geolocation is requested. |
| The Real | `/the-real/collection` and `/the-real/collection/[slot]` provide ST01–ST10 as clearly reserved spaces awaiting material. `/the-real/themes` and `/the-real/themes/[theme]` use actual available themes, labelling fictional examples. `/the-real/share-your-story` leads to a general expression of interest; it is not a release form or evidence upload. Existing story pages and private reflections remain. |
| Shared help | Public full pages have self/parent-carer/service links. Swipe feeds have their own visible help bar so the mobile player remains contained. Private account/admin paths are excluded from contextual page attachment. `/support/services` provides independent official contact routes, and `/support/urgent` provides the existing urgent-help page. |

The source-of-truth catalogue is `src/lib/structure.ts`. New page records distinguish topic/field outlines and awaiting-material story slots from actual published content. A new page is not automatically a reviewed legal guide, course, real story or available programme.

These new outline/field records are currently code-defined. A dedicated live CMS authoring workflow for full terrain articles, field resources and video selections has not been connected. Existing story, opportunity and legal-guide review tools remain separate. Full content can be developed against the templates without implying that an admin editor already manages every new field.

**Ask RWM**

The form now supports asking for yourself or as a parent/carer, relationship for on-behalf requests, topic, an explicitly shown public page context, optional age band/borough and safe email reply preferences. It does not request a child's name, precise address, phone callback or uploads. If a reply is requested, an email and safe-contact acknowledgement are required. A parent request does not create account access or substitute for permissions.

Successful live receipt creates a random request reference, initial team-routing category and follow-up state. Message, reply address, contact preferences and referral details are encrypted and accessible only through the assigned safeguarding workflow. Queue metadata supports triage without showing message/contact bodies. Team labels indicate routing intent; they do not automatically grant another role or outside organisation access.

The staff workspace can claim a case, read an assigned case, update the routing/follow-up record, and record a named referral. A routine referral record requires explicit informed-consent confirmation and a reviewed note; a safeguarding-duty basis requires a documented human action note. This records a staff action: **it does not send email, contact a third party, establish a legal basis automatically, or complete a referral for the staff member**.

`INTAKE_ENABLED` remains false by default. The existing named-lead/contact prerequisites still apply. `SUPPORT_EMAIL` and `SUPPORT_HOURS` can expose an actual official mailbox and operating information when supplied. No active address or hours are invented. Email ingestion/delivery and staffed replies remain unconnected; the operator must run the inbox and complete human follow-up through an approved process.

**Artwork**

Original brand artwork remains the current visual treatment. `src/lib/image-plan.ts` defines nine asset groups, with five first-priority banners/categories. `EditorialArt` marks the topic/field banner slots with `data-image-slot` and renders original art. It does not assume a photograph path or claim that a new asset-assignment CMS exists. See `docs/IMAGE-BRIEF.md` for the brief, sizes and rights requirements.

**Compatibility and limits**

The original list/detail routes, introductory articles, fictional demos and publication gates are retained. Search also indexes the new topic outlines and learning fields with their correct content labels. The previous PNG/PDF design pack predates this navigation update and is not a browser capture of the updated source.

Source changes include request validation, MongoDB intake fields, encrypted read projections, human action handling and privacy copy. Existing intake records remain readable; the new request-reference index is sparse for legacy records. Stage and verify schema/index changes against a replica set before enabling intake. Complete TypeScript/build, lint, Vitest, Playwright, accessibility and live integration checks are still required in an environment with dependencies installed.
