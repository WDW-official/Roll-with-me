"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page-width page-content">
      <div className="page-intro">
        <p className="eyebrow mono">A MOMENT TO RESET</p>
        <h1>LET’S TRY THAT AGAIN.</h1>
        <p>
          We couldn’t load this page. If you need urgent help, call 999 when
          someone is in immediate danger, or visit our help page.
        </p>
      </div>
      <button className="button" onClick={reset}>
        Try again
      </button>{" "}
      <a className="text-link" href="/help">
        Help & support
      </a>
    </div>
  );
}
