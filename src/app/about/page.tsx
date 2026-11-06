import { PageIntro, ButtonLink } from "@/components/ui";
import { Pawn, Die, Crown } from "@/components/icons";
export const metadata = {
  title: "About the movement",
};
export default function About() {
  return (
    <div className="page-width page-content">
      <PageIntro
        label="ROLL WITH ME / LONDON ROOTS"
        title={"MOVE TOGETHER.\nBECOME MORE."}
        description="Everyone starts somewhere. RWM is being built to make the next step easier: a real story, a new skill, a place to belong or someone in your corner."
      />
      <div className="feature-grid">
        <div className="feature-card">
          <Pawn />
          <h2>YOUR START.</h2>
          <p>
            Young people are individuals, not labels. Your borough or background
            doesn’t define your potential.
          </p>
        </div>
        <div className="feature-card">
          <Die />
          <h2>YOUR POSSIBILITIES.</h2>
          <p>
            Opportunities, readable information and supportive networks can
            create more room to choose.
          </p>
        </div>
        <div className="feature-card">
          <Crown />
          <h2>YOUR GROWTH.</h2>
          <p>
            Success is personal: showing up, learning something, finding support
            and helping shape what comes next.
          </p>
        </div>
      </div>
      <div className="article-layout">
        <div className="prose">
          <h2>CULTURE. WITH CARE.</h2>
          <p>
            Born in London, RWM brings together stories, sport, streetwear,
            creativity and practical opportunities for young people aged 13–20.
            Its purpose includes reducing exposure to violence and exploitation
            through positive alternatives and trusted help.
          </p>
          <p>
            We don’t assume that anyone is involved in crime or that a
            neighbourhood defines a person. Difficult stories must connect
            consequences to a lesson, support and another route forward.
          </p>
          <h2>WHO GETS A SAY?</h2>
          <p>
            The proposed launch structure is parent-led stewardship alongside an
            active youth advisory council, an independent safeguarding lead and
            qualified legal reviewers. Young people are participants and
            co-designers, not passive subjects of a programme.
          </p>
          <p>
            Council recruitment, named responsible officers, decision minutes,
            complaints routes and funding conflicts must be published before
            live launch. They have not been appointed or independently verified
            in this build.
          </p>
          <h2>FUNDING WITHOUT HIDDEN REPORTING.</h2>
          <p>
            Partners may support activities and receive approved aggregate
            outcomes. They do not get individual browsing histories, private
            questions or raw research responses by default. Funding agreements
            and potential conflicts should be visible.
          </p>
        </div>
        <aside>
          <h3>THE FOUR PILLARS.</h3>
          <p>01 / STORIES — THE REAL</p>
          <p>02 / KNOW THE GAME — THE LAW</p>
          <p>03 / GET INVOLVED — YOUR AREA</p>
          <p>04 / THE CIRCLE — YOUR VOICE</p>
          <div className="mt-5">
            <ButtonLink href="/get-involved">Find your part</ButtonLink>
          </div>
        </aside>
      </div>
    </div>
  );
}
