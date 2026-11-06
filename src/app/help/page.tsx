import { PageIntro } from "@/components/ui";
import Link from "next/link";
export const metadata = {
  title: "Help & support",
};
export default function Help() {
  return (
    <div className="page-width page-content">
      <PageIntro
        label="HERE FOR YOU / HELP & SUPPORT"
        title={"YOU DON’T HAVE TO\nHANDLE IT ALONE."}
        description="If something is worrying you, a trusted person or specialist service can help. You don’t need an RWM account to use these routes."
      />
      <div className="emergency">
        <div>
          <h2>IMMEDIATE DANGER? CALL 999.</h2>
          <p>
            Ask for police or ambulance as needed. Follow the call handler’s
            instructions.
            <br />
            RWM is not an emergency service and is not monitored 24/7.
          </p>
        </div>
        <a href="tel:999">999 ↗</a>
      </div>
      <div className="help-grid">
        <div className="help-card">
          <span className="mono">FOR UNDER-19S</span>
          <h2>CHILDLINE.</h2>
          <p>
            Talk about anything that is worrying you. Check their website for
            current ways to contact them and their confidentiality explanation.
          </p>
          <a href="tel:08001111">0800 1111</a>
          <br />
          <a
            href="https://www.childline.org.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            childline.org.uk ↗
          </a>
        </div>
        <div className="help-card">
          <span className="mono">WHEN YOU NEED SOMEONE TO LISTEN</span>
          <h2>SAMARITANS.</h2>
          <p>
            Emotional support if you are finding things hard or feel you have
            nowhere to turn. Visit their website for service details.
          </p>
          <a href="tel:116123">116 123</a>
          <br />
          <a
            href="https://www.samaritans.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            samaritans.org ↗
          </a>
        </div>
        <div className="help-card">
          <span className="mono">URGENT HEALTH ADVICE / ENGLAND</span>
          <h2>NHS 111.</h2>
          <p>
            For urgent health help when it is not a life-threatening emergency.
            Call 999 in an emergency.
          </p>
          <a href="tel:111">111</a>
          <br />
          <a
            href="https://111.nhs.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            111.nhs.uk ↗
          </a>
        </div>
      </div>
      <div className="prose mt-10">
        <h2>IF SOMEONE IS SERIOUSLY BLEEDING.</h2>
        <p>
          Call 999 for an ambulance. If it is safe, apply firm direct pressure
          using a clean dressing or cloth and follow the call handler’s
          instructions. Do not remove an embedded object. Read the NHS first-aid
          guidance for more information.
        </p>
        <p>
          <a
            href="https://www.nhs.uk/conditions/first-aid/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NHS first aid ↗
          </a>
        </p>
        <h2>NOT SURE WHERE TO START?</h2>
        <p>
          Try a trusted adult, a school safeguarding lead, a youth worker or
          your GP. You can ask RWM a general question, but urgent help should
          always use services outside this site.
        </p>
        <Link href="/ask-rwm">Ask a general question ↗</Link>
      </div>
    </div>
  );
}
