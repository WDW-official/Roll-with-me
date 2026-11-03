import type { ArtKind } from "./structure";
export interface ImageSlot {
  id: string;
  pages: string[];
  purpose: string;
  preferredRatio: string;
  minimumSize: string;
  fallback: ArtKind;
  priority: "first" | "later";
  brief: string;
}
/** Asset slots only. No unlicensed photograph or fabricated image URL is assigned. */
export const imageSlots: ImageSlot[] = [{
  id: "rules-law-banner",
  pages: ["/know-the-rules/the-law", "/know-the-rules/the-law/*"],
  purpose: "Law branch banner and topic introductions",
  preferredRatio: "16:9 with a 4:5 safe crop",
  minimumSize: "2400 × 1350",
  fallback: "code",
  priority: "first",
  brief: "Neutral London civic architecture or an original type-led legal graphic. No offender-look profiles, racial shorthand or threatening police imagery."
}, {
  id: "terrain-banner",
  pages: ["/know-the-rules/the-terrain", "/know-the-rules/the-terrain/*"],
  purpose: "Everyday awareness banner",
  preferredRatio: "16:9 with a 4:5 safe crop",
  minimumSize: "2400 × 1350",
  fallback: "route",
  priority: "first",
  brief: "A calm public London street or transport setting. Prefer no identifiable people; no territorial or gang identifiers. Space for a headline."
}, {
  id: "path-tech-banner",
  pages: ["/choose-a-path/tech-engineering", "/choose-a-path/tech-engineering/*"],
  purpose: "Tech and engineering category/field art",
  preferredRatio: "4:5 card and 16:9 banner",
  minimumSize: "2000 × 2500 portrait plus landscape option",
  fallback: "robot",
  priority: "first",
  brief: "Consented supervised learning: code, robotics, engineering models or equipment. Different images should distinguish web, electrical, electronics and mechanical work."
}, {
  id: "path-sports-banner",
  pages: ["/choose-a-path/sports", "/choose-a-path/sports/*"],
  purpose: "Sports category and field art",
  preferredRatio: "4:5 card and 16:9 banner",
  minimumSize: "2000 × 2500 portrait plus landscape option",
  fallback: "court",
  priority: "first",
  brief: "Welcoming courts, pitches or a consented supervised session. Show participation and access without promising a real programme or space."
}, {
  id: "path-vocation-banner",
  pages: ["/choose-a-path/vocational-practical", "/choose-a-path/vocational-practical/*"],
  purpose: "Practical skills category and field art",
  preferredRatio: "4:5 card and 16:9 banner",
  minimumSize: "2000 × 2500 portrait plus landscape option",
  fallback: "maker",
  priority: "first",
  brief: "Safe workshop, carpentry or vehicle-training details. Suitable PPE/supervision and image rights must be checked; no hazardous demonstrations."
}, {
  id: "london-area-banners",
  pages: ["/roll-with-me/*", "/your-area/*"],
  purpose: "Optional North/East/West/South browsing banners",
  preferredRatio: "16:9",
  minimumSize: "2400 × 1350",
  fallback: "route",
  priority: "later",
  brief: "Four licensed/consented public-place images with verified captions. They are browsing markers, not images defining a borough's identity or risk."
}, {
  id: "provider-activity-image",
  pages: ["/opportunities/*", "/events/*"],
  purpose: "One authentic image per verified activity",
  preferredRatio: "4:5 with a 16:9 safe crop",
  minimumSize: "1600 × 2000",
  fallback: "court",
  priority: "later",
  brief: "Actual venue/equipment or a consented session from the approved provider. Do not represent stock imagery as that provider's activity."
}, {
  id: "story-poster-st01-st10",
  pages: ["/the-real/collection/*", "/stories/*"],
  purpose: "A separate poster/key frame for each supplied story",
  preferredRatio: "9:16 plus 16:9 cover",
  minimumSize: "1080 × 1920 and 1920 × 1080",
  fallback: "route",
  priority: "later",
  brief: "Choose after the ten stories and publication permissions are agreed. No invented faces, identifiable minor victims or implied real testimony. Anonymised art is an option."
}, {
  id: "support-banner",
  pages: ["/ask-rwm", "/support/services"],
  purpose: "Optional quiet support illustration",
  preferredRatio: "16:9",
  minimumSize: "2000 × 1125",
  fallback: "route",
  priority: "later",
  brief: "Abstract original brand art or an unoccupied welcoming space. Avoid identifiable distressed children; keep the form and emergency information visually clear."
}];
