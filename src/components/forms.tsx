"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import type { FormField } from "@/lib/form-fields";
export function RwmForm({
  endpoint,
  fields,
  submitLabel = "Send for review",
  extra = {},
  successText,
}: {
  endpoint: string;
  fields: FormField[];
  submitLabel?: string;
  extra?: Record<string, unknown>;
  successText?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");
  const [done, setDone] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setFeedback("");
    setCode("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values: Record<string, unknown> = {
      ...extra,
    };
    fields.forEach((f) => {
      values[f.name] =
        f.type === "checkbox"
          ? fd.has(f.name)
          : f.type === "number"
            ? Number(fd.get(f.name))
            : String(fd.get(f.name) ?? "");
    });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setFeedback(data.error ?? "We couldn’t submit this. Please try again.");
        return;
      }
      setError(false);
      setFeedback(
        successText ??
          data.message ??
          `Saved. Status: ${data.status ?? "received"}.`,
      );
      setCode(data.consentCode ?? data.withdrawalCode ?? "");
      setDone(true);
      form.reset();
      if (data.redirect) {
        router.push(data.redirect);
        router.refresh();
      }
    } catch {
      setError(true);
      setFeedback(
        "We couldn’t reach the service. Nothing has been confirmed. This site is not an emergency service.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="form-shell" onSubmit={submit}>
      {fields.map((f) =>
        f.type === "checkbox" ? (
          <label className="check-label" key={f.name}>
            <input type="checkbox" name={f.name} required={f.required} />
            <span>{f.label}</span>
          </label>
        ) : (
          <div className="field" key={f.name}>
            <label htmlFor={f.name}>
              {f.label}
              {f.required ? " *" : " (optional)"}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={f.name}
                name={f.name}
                placeholder={f.placeholder}
                required={f.required}
                maxLength={f.maxLength ?? 3000}
                defaultValue={f.defaultValue}
              />
            ) : f.type === "select" ? (
              <select
                id={f.name}
                name={f.name}
                required={f.required}
                defaultValue={f.defaultValue ?? ""}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {f.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={f.name}
                name={f.name}
                type={f.type ?? "text"}
                placeholder={f.placeholder}
                required={f.required}
                maxLength={f.maxLength ?? 200}
                minLength={f.minLength}
                defaultValue={f.defaultValue}
                autoComplete={
                  f.type === "password"
                    ? "current-password"
                    : f.type === "email"
                      ? "email"
                      : undefined
                }
              />
            )}{" "}
            {f.helper && <p className="form-helper">{f.helper}</p>}
          </div>
        ),
      )}
      <button type="submit" className="button" disabled={busy || done}>
        {busy ? (
          <>
            <LoaderCircle className="animate-spin" size={17} />
            Sending…
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowUpRight size={17} />
          </>
        )}
      </button>
      {feedback && (
        <div
          className={`form-feedback ${error ? "error" : ""}`}
          role={error ? "alert" : "status"}
        >
          {feedback}
          {code && (
            <p className="mt-3">
              <strong>Save this code privately. It is shown only once:</strong>
              <br />
              <code className="break-all select-all">{code}</code>
              <br />
              For event consent, share it directly with your guardian. For
              survey withdrawal, keep it for your own use.
            </p>
          )}
        </div>
      )}
    </form>
  );
}
export function ActionButton({
  endpoint,
  payload,
  label,
  onDone,
}: {
  endpoint: string;
  payload: Record<string, unknown>;
  label: string;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <button
        className="button button-secondary"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            const r = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
            const d = await r.json();
            setMessage(d.error ?? d.message ?? "Updated.");
            if (r.ok) {
              onDone?.();
              if (d.redirect) router.push(d.redirect);
              router.refresh();
            }
          } catch {
            setMessage("The service is unavailable.");
          } finally {
            setBusy(false);
          }
        }}
      >
        {label}
      </button>
      {message && (
        <p className="form-feedback" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
