"use client";

import { useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import {
  supportTopics,
  supportNoticeVersion,
  type SupportTopic,
} from "@/lib/structure";
import { ageOptions } from "@/lib/form-fields";
export function SupportForm({
  initialTopic,
  context,
  contextLabel,
  onBehalf,
  demo,
  intakeOpen,
  boroughs,
}: {
  initialTopic: SupportTopic;
  context: string;
  contextLabel: string;
  onBehalf: boolean;
  demo: boolean;
  intakeOpen: boolean;
  boroughs: string[];
}) {
  const [requester, setRequester] = useState(
    onBehalf ? "parent_carer" : "self",
  );
  const [topic, setTopic] = useState<SupportTopic>(
    initialTopic === "opportunities"
      ? "activities"
      : initialTopic === "safety"
        ? "wellbeing"
        : initialTopic,
  );
  const [reply, setReply] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setReference("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const input = {
      topic,
      requester,
      context,
      relationship: String(fd.get("relationship") ?? ""),
      ageBand: String(fd.get("ageBand") ?? "prefer_not_to_say"),
      borough: String(fd.get("borough") ?? ""),
      message: String(fd.get("message") ?? ""),
      replyRequested: reply,
      replyEmail: reply ? String(fd.get("replyEmail") ?? "") : "",
      safeToEmail: reply && fd.has("safeToEmail"),
      contactNote: reply ? String(fd.get("contactNote") ?? "") : "",
      privacyAccepted: fd.has("privacyAccepted"),
      publicationConsent: false,
    };
    try {
      const r = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await r.json();
      setError(!r.ok);
      setMessage(
        data.error ?? data.message ?? "No request has been confirmed.",
      );
      if (r.ok) {
        setReference(data.reference);
        setDone(true);
        form.reset();
      }
    } catch {
      setError(true);
      setMessage(
        "We could not reach the service. Nothing has been confirmed. Please use the trusted Help routes if you need support now.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="form-shell support-form" onSubmit={submit}>
      <fieldset disabled={(!intakeOpen && !demo) || done}>
        <legend className="sr-only">Ask RWM</legend>
        <div className="field">
          <label htmlFor="requester">Who is asking? *</label>
          <select
            id="requester"
            value={requester}
            onChange={(e) => setRequester(e.target.value)}
          >
            <option value="self">I’m asking for myself</option>
            <option value="parent_carer">
              I’m a parent/carer asking on someone’s behalf
            </option>
          </select>
        </div>
        {requester === "parent_carer" && (
          <>
            <div className="field">
              <label htmlFor="relationship">Your relationship *</label>
              <select
                id="relationship"
                name="relationship"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a relationship
                </option>
                <option value="parent">Parent</option>
                <option value="guardian">Guardian</option>
                <option value="carer">Carer</option>
                <option value="trusted_adult">Other trusted adult</option>
              </select>
            </div>
            <p className="content-note">
              You can raise a general concern. This does not give access to the
              young person’s private account or messages. Staff will consider
              appropriate permissions and safe contact before sharing
              information.
            </p>
          </>
        )}
        <div className="field">
          <label htmlFor="topic">What is this about? *</label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value as SupportTopic)}
          >
            {supportTopics.map((t) => (
              <option value={t.value} key={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="attached-context">
          <span className="field-label">
            Page/topic attached to this request
          </span>
          <p>{contextLabel}</p>
          <span className="form-helper">
            This topic is included so the team can understand your question.
            Your browsing history is not attached.
          </span>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="ageBand">
              {requester === "parent_carer"
                ? "Their age band"
                : "Your age band"}
            </label>
            <select
              id="ageBand"
              name="ageBand"
              defaultValue="prefer_not_to_say"
            >
              <option value="prefer_not_to_say">Prefer not to say</option>
              {ageOptions.map((a) => (
                <option value={a.value} key={a.value}>
                  {a.label}
                </option>
              ))}
              <option value="adult">21 or over</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="borough">Borough (optional)</label>
            <select id="borough" name="borough" defaultValue="">
              <option value="">Leave out</option>
              {boroughs.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <p className="form-helper">
              Only useful for finding local support. No address or live
              location.
            </p>
          </div>
        </div>
        <div className="field">
          <label htmlFor="message">
            {topic === "story"
              ? "A general expression of interest"
              : "A short, general question"}{" "}
            *
          </label>
          <textarea
            id="message"
            name="message"
            required
            maxLength={3000}
            placeholder={
              topic === "story"
                ? "I’m interested in talking about sharing a story. Please contact me about the process."
                : "What would you like help understanding or getting started with?"
            }
          />
          <p className="form-helper">
            Leave out names of other people, detailed allegations, offence
            admissions and traumatic details. Do not send private images or
            documents.
          </p>
        </div>
        <label className="check-label">
          <input
            type="checkbox"
            checked={reply}
            onChange={(e) => setReply(e.target.checked)}
          />
          <span>I would like a reply by email.</span>
        </label>
        {reply ? (
          <>
            <div className="field">
              <label htmlFor="replyEmail">A safe email address *</label>
              <input
                id="replyEmail"
                name="replyEmail"
                type="email"
                maxLength={254}
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="contactNote">
                Safe contact preferences (optional)
              </label>
              <input
                id="contactNote"
                name="contactNote"
                maxLength={300}
                placeholder="For example: keep the subject line general"
              />
              <p className="form-helper">
                Staff will consider your preferences. No sensitive details
                should be included in a notification.
              </p>
            </div>
            <label className="check-label">
              <input name="safeToEmail" type="checkbox" required />
              <span>
                This is a safe address for a general reply. I understand that
                ordinary email is not a place to send highly sensitive
                information.
              </span>
            </label>
          </>
        ) : (
          <p className="form-helper">
            Without reply details, the team cannot contact you directly.
          </p>
        )}
        <div className="support-privacy-copy">
          <p>
            A designated human team will triage the request. Routine sharing
            with an outside organisation should be discussed with you first.
            Lawful safeguarding escalation may be necessary, so absolute
            confidentiality cannot be promised.
          </p>
          <p>
            Submitting is not consent to publish a story or question. This is
            not a live chat or emergency service.
          </p>
        </div>
        <label className="check-label">
          <input type="checkbox" name="privacyAccepted" required />
          <span>
            I have read how this request uses my information and choose to send
            it for human review.
          </span>
        </label>
        <button
          className="button"
          disabled={busy || done || (!intakeOpen && !demo)}
        >
          {busy ? (
            <>
              <LoaderCircle size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              {demo
                ? "Try preview submission"
                : intakeOpen
                  ? "Send request"
                  : "Questions aren’t open yet"}
              <ArrowUpRight size={16} />
            </>
          )}
        </button>
        <p className="form-helper">Support notice: {supportNoticeVersion}</p>
      </fieldset>
      {message && (
        <div
          className={`form-feedback ${error ? "error" : ""}`}
          role={error ? "alert" : "status"}
        >
          {message}
          {reference && (
            <p className="mt-3">
              <strong>Your request reference: {reference}</strong>
              <br />
              Receipt is not confirmation that a referral or response has been
              completed.
            </p>
          )}
        </div>
      )}
    </form>
  );
}
