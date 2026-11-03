import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui";
import { SurveyForm, type PublicSurvey } from "@/components/survey-form";
import { RwmForm } from "@/components/forms";
import { isDemo } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { Study, QuestionnaireVersion } from "@/lib/models";
import type { SurveyQuestion } from "@/lib/validation";
export const dynamic = "force-dynamic";
export default async function Survey({
  params
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const {
    slug
  } = await params;
  let survey: PublicSurvey;
  if (isDemo) {
    if (slug !== "your-next-move") notFound();
    survey = {
      slug,
      title: "YOUR NEXT MOVE.",
      versionId: "000000000000000000000001",
      version: 1,
      purpose: "Explore how activity interests and practical barriers could be understood without asking for personal experiences of harm.",
      participantInformation: "This is a fictional feedback design. There is no live study, ethical approval or research collection. Please try the form without entering personal information. Taking part would be optional and would not affect access to RWM.",
      withdrawalPolicy: "In a live study you would receive a private withdrawal code. This preview does not collect or save responses.",
      retentionDays: 90,
      ageBands: ["13–15", "16–17", "18–20"],
      demo: true,
      questions: [{
        id: "interest",
        type: "single",
        label: "Which activity would you most like to explore?",
        options: ["Sport & movement", "Coding & technology", "Film, music & design", "Practical skills", "Not sure yet"],
        required: true
      }, {
        id: "barriers",
        type: "multiple",
        label: "What might make it harder to take part? Select any that apply.",
        options: ["Cost", "Travel", "Timing", "Not knowing anyone", "Access needs", "None of these", "Prefer not to say"],
        required: false
      }, {
        id: "confidence",
        type: "scale",
        label: "How easy does finding activity information feel? 1 means very difficult; 5 means very easy.",
        options: [],
        required: false
      }, {
        id: "tech",
        type: "single",
        label: "What would you be most curious to try?",
        options: ["A first website", "Robotics", "Video editing", "Not sure"],
        required: false,
        showIf: {
          questionId: "interest",
          equals: "Coding & technology"
        }
      }, {
        id: "idea",
        type: "narrative",
        label: "Any general ideas? Please leave out names or private information.",
        options: [],
        required: false
      }]
    };
  } else {
    await connectDB();
    const study = await Study.findOne({
      slug,
      status: "published",
      category: {
        $ne: "evidence"
      }
    }).lean();
    if (!study) notFound();
    const v = await QuestionnaireVersion.findById(study.liveVersionId).lean();
    if (!v) notFound();
    survey = {
      slug,
      title: v.snapshot.title,
      versionId: String(v._id),
      version: v.version,
      questions: v.questions as SurveyQuestion[],
      purpose: v.snapshot.purpose,
      participantInformation: v.snapshot.participantInformation,
      withdrawalPolicy: v.snapshot.withdrawalPolicy,
      retentionDays: v.snapshot.retentionDays,
      ageBands: v.snapshot.ageBands,
      demo: false
    };
  }
  return <div className="page-width page-content"><PageIntro label={`YOUR VOICE / QUESTIONNAIRE VERSION ${survey.version}${survey.demo ? " / DEMO" : ""}`} title={survey.title} description="Your perspective is optional. Read the information, choose whether to take part and leave out identifying details." />{survey.demo && <div className="notice"><p>DEMO / No responses are stored. Trying the submit button will explain that live services are not enabled.</p></div>}<SurveyForm survey={survey} /><div className="prose mt-12"><h2>WITHDRAW A LIVE RESPONSE.</h2><p>If you previously submitted to a live study, use your private withdrawal code. Staff will review it under the study’s disclosed policy.</p></div><RwmForm endpoint="/api/survey-withdrawal" submitLabel="Request withdrawal" fields={[{
      name: "code",
      label: "Your private withdrawal code",
      required: true,
      maxLength: 48
    }]} /></div>;
}
