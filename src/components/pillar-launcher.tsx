import Link from "next/link";
import { ResilientImage } from "./resilient-image";
import { ArrowUpRight } from "lucide-react";
export function PillarLauncher() {
  return (
    <section
      className="pillar-launcher pillar-launcher-with-hero page-width"
      aria-label="Choose one of RWM’s four sections"
    >
      <div className="pillar-launcher-hero">
        <div className="pillar-launcher-intro">
          <span className="mono">FOUR WAYS IN. ONE MOVEMENT.</span>
          <h2>WHERE WILL YOU START?</h2>
          <p>Pick a section. Swipe. Find your next move.</p>
        </div>
        <div className="pillar-launcher-image">
          <ResilientImage
            src="https://res.cloudinary.com/dzn1k1z8r/image/upload/v1793995243/Rainy_London_Walk_Beneath_Big_Ben_wvjbof.png"
            alt="A person wearing a Roll With Me hoodie walks through rainy London, with Big Ben and a red bus ahead."
            fill
            priority
            sizes="(max-width: 700px) 100vw, 75vw"
          />
        </div>
      </div>
      <div className="pillar-launcher-grid">
        {[
          {
            name: "KNOW THE RULES.",
            description: "Your rights. Real situations.",
            href: "/know-the-rules",
            number: "",
            type: "rules",
            desktopImage:
              "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1793950948/RWM_Home_Card_01_Know_The_Rules_Desktop_Approved_pwyl23.png",
            mobileImage:
              "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1793950953/RWM_Home_Card_01_Know_The_Rules_Mobile_Approved_gfhxdq.png",
          },
          {
            name: "CHOOSE A PATH.",
            description: "Tech. Sport. Practical skills.",
            href: "/choose-a-path",
            number: "",
            type: "paths",
            desktopImage:
              "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1793950945/RWM_Home_Card_02_Choose_A_Path_Desktop_Approved_m3lnx3.png",
            mobileImage:
              "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1793950944/RWM_Home_Card_02_Choose_A_Path_Mobile_Approved_qmcrt8.png",
          },
          {
            name: "ROLL WITH ME.",
            description: "Your area. Things to get into.",
            href: "/roll-with-me",
            number: "",
            type: "local",
            desktopImage:
              "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1793950954/RWM_Home_Card_03_Roll_With_Me_Desktop_Approved_xw3g8z.png",
            mobileImage:
              "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1793950943/RWM_Home_Card_03_Roll_With_Me_Mobile_Approved_lf8mq6.png",
          },
          {
            name: "THE REAL.",
            description: "Stories. Turns. Other routes.",
            href: "/the-real",
            number: "",
            type: "real",
            desktopImage:
              "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1793950953/RWM_The_Real_Desktop_Source_Approved_v3_kkc3oi.png",
            mobileImage:
              "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1793950949/RWM_The_Real_Mobile_Current_Approved_v3_i8lywr.png",
          },
        ].map((p) => {
          return (
            <Link
              href={p.href}
              key={p.href}
              className={`pillar-launcher-card pillar-image-card pillar-${p.type}`}
            >
              <ResilientImage
                src={p.desktopImage}
                mobileSrc={p.mobileImage}
                pictureClassName="pillar-card-image"
                alt=""
                fill
                sizes="(max-width: 700px) 50vw, 25vw"
              />
              <div>
                <span className="mono">{p.number}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <ArrowUpRight className="pillar-launcher-arrow" size={19} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
