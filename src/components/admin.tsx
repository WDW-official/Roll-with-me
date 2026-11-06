"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminSections } from "@/lib/data";
const descriptions: Record<string, string> = {
  overview: "Content and operational queues. No individual browsing profiles or invented impact metrics.",
  content: "Draft content, reset approvals on edits, record reviews and publish only after the required checks.",
  opportunities: "Verified providers, risk assessment, age eligibility, capacity and recent listing checks come before publication.",
  partners: "Only safeguarding officers can verify providers after policy, risk and role-appropriate checks.",
  moderation: "Every parent forum post is reviewed before publication. Do not approve identifiable disclosures about children.",
  safeguarding: "Restricted to safeguarding officers. Claim a case before opening its encrypted contents. All case reads are audited.",
  surveys: "Create a reviewed study protocol and questionnaire. Published versions are immutable. Potential evidence intake is disabled.",
  analytics: "Operational counts only. No youth browsing surveillance or causal impact claims.",
  grants: "Restricted funding records. Keep reporting responsibilities and conflicts explicit.",
  audit: "Append-only application audit records. Database administrator access still requires independent operational controls.",
  areas: "Directions are editable browsing shortcuts. London boroughs can belong to more than one area.",
  media: "Authenticated Cloudinary uploads stay private pending human review. Rights and release references are required.",
  attendance: "Authorised operational check-in. Emergency contact reads are restricted and audited."
};
const templates: Record<string, object> = {
  content: {
    action: "save",
    kind: "story",
    slug: "your-new-story",
    title: "YOUR NEW STORY",
    reason: "Initial editorial draft",
    data: {
      title: "YOUR NEW STORY",
      series: "TURNING POINTS",
      excerpt: "A short, consent-led introduction.",
      duration: "4 MIN READ",
      type: "Scripted composite",
      theme: "Moving forward",
      art: "route",
      contentNote: "Add a specific content note.",
      paragraphs: ["Draft text for editorial review."],
      reflection: "A private reflection question.",
      opportunitySlug: "",
      permissionReference: "Restricted release record reference",
      transcript: "Transcript or text equivalent",
      sourceConfidence: "Illustrative / requires verification",
      storytellerAgeBand: "18–20",
      guardianConsentReference: "Not applicable — adult",
      translationStatus: "English original"
    }
  },
  opportunities: {
    action: "save",
    kind: "opportunity",
    slug: "new-supervised-session",
    title: "NEW SUPERVISED SESSION",
    reason: "Initial provider submission",
    data: {
      title: "NEW SUPERVISED SESSION",
      description: "Explain the activity, supervision and eligibility.",
      category: "Basketball",
      canonicalCategory: "sport-movement",
      providerId: "REPLACE_WITH_VERIFIED_PROVIDER_OBJECT_ID",
      provider: "Verified provider name",
      borough: "Hackney",
      zone: "East",
      venue: "Verified public venue address",
      ageBands: ["16–17"],
      cost: 0,
      date: "2027-04-05",
      time: "14:00–16:00",
      accessibility: ["Step-free access"],
      capacity: 16,
      guardianConsent: true,
      holiday: true,
      transport: "Provider-verified access information",
      officialUrl: "https://example.org",
      lastChecked: "2026-10-30T00:00:00.000Z",
      art: "court"
    }
  },
  partners: {
    action: "verify",
    id: "RECORD_ID",
    safeguardingPolicyChecked: true,
    riskAssessmentChecked: true,
    eligibilityChecks: "appropriate_checks_verified"
  },
  moderation: {
    action: "review",
    id: "RECORD_ID",
    status: "approved"
  },
  safeguarding: {
    action: "claim",
    id: "RECORD_ID"
  },
  surveys: {
    action: "save",
    slug: "activity-interests",
    title: "Activity interests",
    category: "anonymous_feedback",
    protocol: "Describe review responsibilities, purpose and limits.",
    purpose: "Understand preferred activities without collecting identifiers.",
    lawfulBasis: "Complete the documented lawful-basis assessment before publication.",
    ethicsReview: "Add the documented independent review reference.",
    ageBands: ["18–20"],
    guardianRequired: false,
    retentionDays: 90,
    withdrawalPolicy: "Withdrawal by private response code before aggregation. Explain any limits.",
    samplingPlan: "Voluntary self-selected sample; not representative of all Londoners.",
    participantInformation: "Plain-English participant information, controller and rights contact required.",
    conflicts: "Disclose funding and other conflicts.",
    methodology: "Describe question design, cleaning, missing answers and reporting.",
    readingCheck: "Document plain-English and youth reading checks.",
    draftQuestions: [{
      id: "interest",
      type: "single",
      label: "Which activity would you most like to try?",
      options: ["Sport", "Technology", "Creative arts", "Not sure"],
      required: true
    }]
  },
  areas: {
    action: "save",
    borough: "Hackney",
    zones: ["East", "North"]
  },
  grants: {
    action: "save",
    name: "Grant name",
    funder: "Funder identity",
    amountPence: 0,
    restrictedPurpose: "Purpose and reporting obligations"
  },
  media: {
    action: "approve",
    id: "RECORD_ID"
  },
  attendance: {
    action: "check-in",
    id: "BOOKING_ID"
  }
};
export function AdminWorkspace({
  section,
  demo
}: {
  section: string;
  demo: boolean;
}) {
  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [message, setMessage] = useState("");
  const [json, setJson] = useState(JSON.stringify(templates[section] ?? {}, null, 2));
  const [busy, setBusy] = useState(false);
  const [caseText, setCaseText] = useState("");
  async function reload() {
    if (demo) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/${section}`, {
        cache: "no-store"
      });
      const d = await r.json();
      if (!r.ok) setMessage(d.error);else setRecords(d.records ?? []);
    } catch {
      setMessage("The workspace could not be loaded.");
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    if (!demo) {
      let active = true;
      fetch(`/api/admin/${section}`, {
        cache: "no-store"
      }).then(async r => {
        const d = await r.json();
        if (active) {
          if (!r.ok) setMessage(d.error);else setRecords(d.records ?? []);
        }
      }).catch(() => {
        if (active) setMessage("The workspace could not be loaded.");
      });
      return () => {
        active = false;
      };
    }
  }, [demo, section]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = JSON.parse(json);
      const r = await fetch(`/api/admin/${section}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const d = await r.json();
      setMessage(d.error ?? d.message ?? "Action recorded.");
      if (r.ok) await reload();
    } catch {
      setMessage("Check the JSON format. No action has been confirmed.");
    } finally {
      setBusy(false);
    }
  }
  async function openCase(id: string) {
    try {
      const r = await fetch(`/api/admin/safeguarding/${id}`, {
        cache: "no-store"
      });
      const d = await r.json();
      setCaseText(r.ok ? JSON.stringify(d.case, null, 2) : d.error);
    } catch {
      setMessage("Could not open the assigned case.");
    }
  }
  async function claimCase(id: string) {
    setBusy(true);
    try {
      const r = await fetch("/api/admin/safeguarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          action: "claim"
        })
      });
      const d = await r.json();
      setMessage(d.error ?? d.message);
      if (r.ok) await reload();
    } catch {
      setMessage("The case could not be claimed.");
    } finally {
      setBusy(false);
    }
  }
  async function downloadExport(id: string) {
    const r = await fetch(`/api/admin/surveys/${id}/export`, {
      cache: "no-store"
    });
    const d = await r.json();
    if (!r.ok) {
      setMessage(d.error);
      return;
    }
    const url = URL.createObjectURL(new Blob([JSON.stringify(d, null, 2)], {
      type: "application/json"
    }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `rwm-study-${id}-restricted-export.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  const columns = records.length ? section === "safeguarding" ? ["reference", "topic", "targetTeam", "status", "followUpStatus"] : Object.keys(records[0]).filter(k => !["__v", "updatedAt", "data", "ownerId", "consentReference", "reviewedBy"].includes(k)).slice(0, 5) : [];
  return <div className="admin-layout"><nav className="admin-nav" aria-label="Staff navigation">{[...adminSections, "attendance"].map(s => <Link key={s} href={s === "overview" ? "/admin" : `/admin/${s}`} className={section === s ? "active" : ""}>{s}</Link>)}</nav><div className="admin-workspace"><span className="eyebrow mono">{demo ? "STAFF WORKSPACE / PREVIEW" : "AUTHORISED STAFF / RESTRICTED"}</span><h1 className="mt-5">{section}.</h1><p>{descriptions[section]}</p>{demo && <div className="notice"><p>PREVIEW / No staff session, private records or live queues are shown. Actions below require live services and an authorised role. Sensitive sections remain empty.</p></div>}{section === "overview" && demo && <div className="metric-grid">{["DRAFT CONTENT", "PENDING PROVIDERS", "LIVE ATTENDANCE"].map(s => <div className="metric" key={s}><strong>—</strong><span>{s} / NOT CONNECTED</span></div>)}</div>}{message && <div role="status" className="form-feedback">{message}</div>}{records.length ? <div className="overflow-auto"><table className="admin-table"><thead><tr>{columns.map(c => <th key={c}>{c.replaceAll("_", " ")}</th>)}{["surveys", "safeguarding"].includes(section) && <th>Action</th>}</tr></thead><tbody>{records.map((r, i) => <tr key={String(r._id ?? i)}>{columns.map(c => <td key={c}>{typeof r[c] === "object" ? JSON.stringify(r[c]) : String(r[c] ?? "—")}</td>)}{section === "safeguarding" && <td>{!r.assignedTo && <button disabled={busy} onClick={() => claimCase(String(r._id))}>Claim case</button>} <button onClick={() => openCase(String(r._id))}>Read assigned case</button></td>}{section === "surveys" && <td><button onClick={() => downloadExport(String(r._id))}>Restricted export</button></td>}</tr>)}</tbody></table></div> : <div className="notice"><p>{busy ? "Loading…" : "No records are available in this view."}</p></div>}{caseText && <div className="content-note"><h3>RESTRICTED CASE CONTENT</h3><pre className="whitespace-pre-wrap break-all text-xs mt-4">{caseText}</pre><button className="text-link mt-4" onClick={() => setCaseText("")}>Close case content</button></div>}{templates[section] && <form className="admin-form" onSubmit={submit}><h2 className="text-3xl">REVIEWABLE ACTION.</h2><p className="form-helper my-3">Structured JSON editor. Replace record IDs and all illustrative fields. Actions are validated and permissions checked on the server. Saving content clears previous approvals.</p><label className="field-label" htmlFor="admin-payload">Action payload</label><textarea id="admin-payload" spellCheck={false} value={json} onChange={e => setJson(e.target.value)} /><button className="button mt-4" disabled={busy}>Validate & submit action ↗</button><details className="prose mt-5"><summary>Available workflows</summary><p>Content: save, safeguarding-review (id, riskAssessmentApproved, releaseApproved), legal-review (id, nextReviewAt), publish, unpublish. Legal and safeguarding actions require their designated roles. Studies: save, publish, close. Safeguarding: claim; update (id, risk, status, targetTeam, followUpStatus, notes); record-referral (id, partnerName, referralBasis, consentConfirmed where applicable, notes). Recording a follow-up does not deliver an email or transmit a referral. See README for complete role boundaries.</p></details></form>}{section === "media" && <MediaUpload />}{!demo && <button className="text-link mt-6" onClick={reload}>Refresh records</button>}</div></div>;
}
function MediaUpload() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  return <form className="form-shell mt-8" onSubmit={async e => {
    e.preventDefault();
    setBusy(true);
    try {
      const fd = new FormData(e.currentTarget);
      const file = fd.get("file") as File;
      if (!file || file.size > 10000000 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setMessage("Use a JPG, PNG or WebP image under 10 MB.");
        return;
      }
      const r = await fetch("/api/media/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          consentReference: fd.get("release"),
          rightsConfirmed: fd.has("rights")
        })
      });
      const signed = await r.json();
      if (!r.ok) {
        setMessage(signed.error);
        return;
      }
      const upload = new FormData();
      for (const [k, v] of Object.entries(signed.params)) upload.append(k, String(v));
      upload.append("file", file);
      const response = await fetch(signed.uploadUrl, {
        method: "POST",
        body: upload
      });
      if (!response.ok) throw new Error("Upload failed");
      const complete = await fetch("/api/media/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: signed.id
        })
      });
      const result = await complete.json();
      setMessage(result.error ?? "Image uploaded privately. Human review is required before delivery.");
    } catch {
      setMessage("Upload could not be confirmed. Inspect the media queue before trying again.");
    } finally {
      setBusy(false);
    }
  }}><h2 className="text-3xl">PRIVATE MEDIA UPLOAD.</h2><div className="field mt-4"><label htmlFor="media-file">Image / maximum 10 MB</label><input id="media-file" name="file" type="file" accept="image/jpeg,image/png,image/webp" required /></div><div className="field"><label htmlFor="media-release">Consent & rights record reference</label><input id="media-release" name="release" required minLength={3} maxLength={200} /></div><label className="check-label"><input type="checkbox" name="rights" required />I have verified rights and the necessary consent or release records.</label><button className="button" disabled={busy}>Upload for review ↗</button>{message && <p className="form-feedback" role="status">{message}</p>}</form>;
}
