import { resolveImageSource } from "./image-delivery";

export interface EditorialAsset {
  src: string;
  alt: string;
  position?: string;
  animationSrc?: string;
}

const cloud = "https://res.cloudinary.com/dzn1k1z8r/image/upload/";
const asset = (
  path: string,
  alt: string,
  position = "center 30%",
): EditorialAsset => ({ src: resolveImageSource(path), alt, position });
const path = "/choose-a-path";
const law = "/know-the-rules/the-law";
const street = "/know-the-rules/the-street";

/** User-supplied editorial artwork. Shared by feeds, directories and page heroes. */
export const editorialMedia: Record<string, EditorialAsset> = {
  [law]: asset(
    "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1794001055/WhatsApp_Image_2026-11-05_at_2.15.50_AM_1_lbuhuh.jpg",
    "The Law: rights, consequences and common sense",
  ),
  [street]: asset(
    "v1793995170/RWM_Terrain_01_Read_the_Situation_Approaching_Group_Alternative_1_qpl3sf.png",
    "A person looks toward a group in a London street",
  ),
  [`${path}/sports/football-futsal`]: asset(
    "v1793994828/rwm-choose-a-path-sports-football-development_ojeymm.jpg",
    "Football development and skills practice",
  ),
  [`${path}/tech-engineering/mechanical-engineering`]: asset(
    "v1793994830/rwm-choose-a-path-tech-mechanical-engineering-illustrated_mnwifz.png",
    "Mechanical engineering illustration",
  ),
  [`${path}/tech-engineering/web-development`]: asset(
    "v1794009629/rwm-choose-a-path-tech-web-development-website-layout-and-code_uzumrw.png",
    "web-development illustration",
  ),
  [`${path}/tech-engineering/creative-digital-skills`]: asset(
    "v1793994830/rwm-choose-a-path-tech-creative-digital-skills-media-workspace_siravd.png",
    "Creative digital skills and media workspace",
  ),
  [`${path}/tech-engineering/electronics`]: asset(
    "v1793994832/rwm-choose-a-path-tech-electronics-illustrated_hhvufa.png",
    "Electronics learning illustration",
  ),
  [`${path}/tech-engineering/electrical-engineering`]: asset(
    "v1793994832/rwm-choose-a-path-tech-electrical-engineering-wiring-and-plug_inroct.png",
    "Electrical engineering artwork with wiring and a plug",
  ),
  [`${path}/tech-engineering`]: asset(
    "v1793995116/rwm-choose-a-path-tech-engineering-stem-learning_fbkvus.png",
    "A learner at a laptop with electronics and STEM equipment",
  ),
  [`${path}/tech-engineering/software-coding`]: asset(
    "v1793994833/rwm-choose-a-path-tech-software-coding-laptop-code-workflow_rcpnbc.png",
    "Software coding and a laptop workflow",
  ),
  [`${path}/tech-engineering/robotics-automation`]: asset(
    "v1793995117/rwm-choose-a-path-tech-robotics-automation-robot-arm-illustration_d2hpl6.png",
    "Robotics and automation illustration with a robot arm",
  ),
  [`${path}/vocational-practical/construction-trades`]: asset(
    "v1793995137/rwm-choose-a-path-vocational-practical-construction-training_clyqwh.png",
    "Construction and practical skills training",
  ),
  [`${street}/read-the-situation`]: asset(
    "v1793995170/RWM_Terrain_01_Read_the_Situation_Approaching_Group_Alternative_1_qpl3sf.png",
    "Read the situation: approaching a group",
  ),
  [`${street}/how-you-carry-yourself`]: asset(
    "v1793995164/RWM_Terrain_02_How_You_Carry_Yourself_Dress_Codes_Approved_en9kmt.png",
    "Personal presentation and how you carry yourself",
  ),
  [`${street}/how-you-talk`]: asset(
    "v1793995120/RWM_Terrain_03_How_You_Talk_Communication_Under_Pressure_Approved_kb7zen.png",
    "Communication under pressure",
  ),
  [`${street}/unfamiliar-places`]: asset(
    "v1793995121/RWM_Terrain_04_Unfamiliar_Places_Approved_kzuqjv.png",
    "Moving through an unfamiliar place",
  ),
  [`${street}/friends-and-getting-home`]: asset(
    "v1793995122/friend_getting_home_oi8ehg.png",
    "Friends and planning the journey home",
  ),
  [`${street}/your-code`]: asset(
    "v1793995126/conflict_Resolution_qtx9uf.png",
    "A person uses open-handed gestures while talking with a group",
  ),
  [`${street}/online-to-offline`]: asset(
    "v1794007895/online_to_offline_conflict_lnw7ea.png",
    "Online conflict and its effects offline",
  ),
  [`${street}/leave-and-get-help`]: asset(
    "v1793995161/leave_get_help_n2ez1q.png",
    "Leaving a situation and getting help",
  ),
  "/know-the-rules/facts-and-myths": asset(
    "v1793995163/RWM_Terrain_09_Rumours_Influence_Misinformation_Hero_Whispering_Group_adre06.png",
    "A group shares information around a phone while one person whispers",
  ),
  [`${law}/arrest-and-advice`]: asset(
    "v1793995143/Arrest_Legal_Advice_asczr4.png",
    "Arrest and access to legal advice",
  ),
  [`${law}/police-encounters`]: {
    ...asset(
      "pg_1,f_png/v1793995137/RWM_Law_01_Stop_and_Search_Animation_GIF_v2_Approved_qj8n2e.png",
      "Illustration of a police stop-and-search encounter",
    ),
    animationSrc:
      cloud +
      "v1793995137/RWM_Law_01_Stop_and_Search_Animation_GIF_v2_Approved_qj8n2e.gif",
  },
  [`${law}/knives-and-weapons`]: asset(
    "v1793995130/RWM_Law_04_Knives_and_Weapons_Approved_qnwfbf.jpg",
    "Knives and weapons topic illustration",
  ),
  [`${law}/violence-and-consequences`]: asset(
    "v1793995128/Violence_Consequences_t27x3r.jpg",
    "Violence and consequences topic illustration",
  ),
  [`${law}/consent-and-relationships`]: asset(
    "v1793995126/RWM_Law_06_Consent_and_Relationships_Approved_erh3hh.jpg",
    "Consent and relationships topic illustration",
  ),
  [`${law}/groups-and-responsibility`]: asset(
    "v1794001366/Conflict_Resolution_1_csqjwm.png",
    "FRIENDS, GROUPS & RESPONSIBILITY topic illustration",
  ),
  [`${law}/drugs-and-exploitation`]: asset(
    "v1793995126/RWM_Law_05_Drugs_Pressure_and_Exploitation_Approved_cj5nwn.jpg",
    "Drugs, pressure and exploitation topic illustration",
  ),
  [`${law}/online-rights`]: asset(
    "v1793995124/RWM_Law_07_Online_Threats_Private_Images_Approved_ax5olw.png",
    "Online threats and private images topic illustration",
  ),
  [`${law}/everyday-rights`]: asset(
    "v1793995123/RWM_Law_09_Everyday_Rights_Getting_Advice_Approved_eirmnl.png",
    "Everyday rights and getting advice",
  ),
};

/** Existing guide URLs retain the artwork of their parent topic. */
const guideTopics: Record<string, string> = {
  "stop-and-search": "police-encounters",
  "arrest-and-a-solicitor": "arrest-and-advice",
  "knives-and-consequences": "knives-and-weapons",
  "when-a-fight-escalates": "violence-and-consequences",
  "drugs-and-pressure": "drugs-and-exploitation",
  "exploitation-is-not-your-fault": "drugs-and-exploitation",
  "consent-and-respect": "consent-and-relationships",
  "online-pressure": "online-rights",
};

export function editorialAssetForRoute(
  route: string,
): EditorialAsset | undefined {
  const pathname = route
    .split("?")[0]
    .replace(/\/$/, "")
    .replace(
      /^\/know-the-rules\/the-terrain(?=\/|$)/,
      "/know-the-rules/the-street",
    );
  const guide = pathname.startsWith("/know-the-game/")
    ? pathname.slice("/know-the-game/".length)
    : "";
  return Object.hasOwn(editorialMedia, pathname)
    ? editorialMedia[pathname]
    : Object.hasOwn(guideTopics, guide)
      ? editorialMedia[`${law}/${guideTopics[guide]}`]
      : undefined;
}
