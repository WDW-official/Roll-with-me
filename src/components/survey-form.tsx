"use client";

import { useState } from "react";
import { visibleQuestions, type SurveyQuestion } from "@/lib/validation";
export interface PublicSurvey {
  slug: string;
  title: string;
  versionId: string;
  version: number;
  questions: SurveyQuestion[];
  purpose: string;
  participantInformation: string;
  withdrawalPolicy: string;
  retentionDays: number;
  ageBands: string[];
  demo: boolean;
}
export function SurveyForm({
  survey
}: {
  survey: PublicSurvey;
}) {
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [age, setAge] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (id: string, value: unknown) => setAnswers(a => ({
    ...a,
    [id]: value
  }));
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await fetch(`/api/surveys/${survey.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          versionId: survey.versionId,
          answers,
          ageBand: age,
          consentAccepted: consent
        })
      });
      const data = await r.json();
      setMessage(data.error ?? data.message);
      if (r.ok) {
        setCode(data.withdrawalCode);
        setDone(true);
        setAnswers({});
      }
    } catch {
      setMessage("The service could not be reached. Nothing has been confirmed.");
    } finally {
      setBusy(false);
    }
  }
  return <div><div className="prose"><h2>BEFORE YOU CHOOSE.</h2><p>{survey.participantInformation}</p><p>Purpose: {survey.purpose}</p><p>Withdrawal: {survey.withdrawalPolicy}</p><p>Retention: {survey.retentionDays} days. Questionnaire version: {survey.version}. No direct identifiers are requested. Free-text answers and infrastructure logs can affect anonymity; leave out names and identifying details.</p></div><form className="form-shell" onSubmit={submit}><div className="field"><label htmlFor="study-age">Age eligibility *</label><select id="study-age" value={age} onChange={e => setAge(e.target.value)} required><option value="">Choose your age band</option>{survey.ageBands.map(a => <option key={a}>{a}</option>)}</select></div><label className="check-label"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required /><span>I have read the participant information and freely choose to take part. I can skip optional questions and stop before submitting.</span></label>{visibleQuestions(survey.questions, answers).map((q, i) => <fieldset className="survey-question" key={q.id}><legend>{i + 1}. {q.label} {q.required ? "*" : "(optional)"}</legend>{q.type === "narrative" ? <textarea aria-label={q.label} maxLength={1000} value={String(answers[q.id] ?? "")} required={q.required} onChange={e => set(q.id, e.target.value)} /> : q.type === "scale" ? <select aria-label={q.label} required={q.required} value={String(answers[q.id] ?? "")} onChange={e => set(q.id, Number(e.target.value))}><option value="">Choose 1–5</option>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}</select> : <div className="survey-options">{q.options.map(o => <label key={o}><input type={q.type === "multiple" ? "checkbox" : "radio"} name={q.id} value={o} required={q.required && q.type !== "multiple"} checked={q.type === "multiple" ? (answers[q.id] as string[] ?? []).includes(o) : answers[q.id] === o} onChange={e => {
              if (q.type === "multiple") {
                const current = answers[q.id] as string[] ?? [];
                set(q.id, e.target.checked ? [...current, o] : current.filter(x => x !== o));
              } else set(q.id, o);
            }} />{o}</label>)}</div>}</fieldset>)}<button className="button mt-7" type="submit" disabled={busy || done}>{busy ? "Submitting…" : survey.demo ? "Try the preview submission" : "Submit your response"}</button>{message && <div className="form-feedback" role="status">{message}{code && <p className="mt-3">Keep this private withdrawal code. It is shown only once:<br /><code className="select-all break-all">{code}</code></p>}</div>}</form></div>;
}
