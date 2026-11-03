**RWM — IMAGE AND BANNER BRIEF**

The new page structure uses the original RWM SVG/CSS artwork as its current visual treatment. No photograph is required to make a route work. No unlicensed reference photograph or invented file path has been added.

The first five asset groups that would add most value are:

| Asset group | Where it appears | What to supply |
| --- | --- | --- |
| The Law | Know the Rules → The Law and its topics | A neutral London civic/architectural image or original editorial legal graphic. Space for a headline. Avoid racial/appearance shorthand for offending. |
| The Terrain | Know the Rules → The Terrain and its topics | A calm public street or transport setting. Prefer no identifiable people. No territorial, gang or targeting imagery. |
| Tech & Engineering | Category and field pages | Consented workshop/equipment images. Distinguish robotics, mechanical engineering, electrical/electronics and coding where possible. |
| Sports | Sports category and field pages | Welcoming courts, pitches or consented supervised sessions. Show participation and suitable safety arrangements. |
| Vocational & Practical | Category and field pages | Safe carpentry, vehicle-training and other workshop details, with appropriate supervision/PPE where people are shown. |

For those assets, ideally provide a landscape original at least **2400 × 1350** for banners and a portrait option around **2000 × 2500** for feed cards. Keep important details within the middle portion so both 16:9 and 4:5 crops work. Avoid text baked into the image; the page already provides its own headings. A portrait crop can extend behind the upper area of the swipe card, with a contrast treatment behind readable text.

Later asset groups:

- **North / East / West / South London:** four licensed public-place images if useful. They are browsing markers, not a claim about everyone who lives in an area.
- **Each real activity:** an actual approved provider/venue/session image, with a date and rights record. Stock imagery must not imply a real provider relationship or availability.
- **Stories ST01–ST10:** a separate poster/key frame after the real material, format and permissions are agreed. Ideally 1080 × 1920 portrait plus 1920 × 1080 landscape. Anonymised illustration can replace an identifiable face.
- **Help/contact:** optional abstract brand artwork or an unoccupied welcoming space. Keep the form and emergency options clear; avoid a distressed-child image.

Every supplied image needs a rights/permission record, suitable release/guardian consent where needed, a truthful caption, alt text and any restrictions on use. Remove unnecessary private/location metadata. Editorial upload/review should use the existing signed private Cloudinary workflow; approval and any page assignment must precede public delivery.

The slot catalogue is `src/lib/image-plan.ts`. The new topic/field banners use `EditorialArt`, and feed artwork also carries a `data-image-slot` attribute for the developer. They currently render original artwork. This is a slot/brief system, not a claim that an asset-assignment CMS or real photographs are already connected. No optional image should become a navigation dependency.

Two further user-supplied references—the street sign and Move Different board—have a separate [placement review](SUPPLIED-VISUAL-REFERENCES.md). They are preserved in the documentation and have not been published as site assets. The review flags the NW1 area label, the wide board's New York coordinates and the mobile reflow needed for its five panels.
