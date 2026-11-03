import { ButtonLink, PageIntro } from "@/components/ui";
export default function NotFound() {
  return <div className="page-width page-content"><PageIntro label="404 / ANOTHER ROUTE" title="LET’S FIND YOUR WAY." description="That page isn’t here. There are plenty of other moves to make." /><ButtonLink href="/">Back to the start</ButtonLink></div>;
}
