"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, HeartHandshake } from "lucide-react";
import { supportContext, supportHref } from "@/lib/structure";
export function ContextSupport() {
  const pathname = usePathname();
  if (
    ["/admin", "/account", "/ask-rwm", "/sign-in", "/sign-up"].some(
      (p) => pathname === p || pathname.startsWith(p + "/"),
    )
  )
    return null;
  const context = supportContext(pathname);
  return (
    <aside className="page-support page-width" aria-label="Help with this page">
      <div>
        <HeartHandshake size={22} />
        <span className="mono">SOMEONE IN YOUR CORNER</span>
      </div>
      <h2>YOU CAN ASK FOR A HAND.</h2>
      <p>
        A question about {context.label.toLowerCase().replace(/\.$/, "")}?
        Choose the route that works for you. RWM is not an emergency service.
      </p>
      <div className="support-link-row">
        <Link className="button" href={supportHref(pathname)}>
          Get help with this <ArrowUpRight size={16} />
        </Link>
        <Link
          className="button button-secondary"
          href={supportHref(pathname, true)}
        >
          I’m a parent or carer <ArrowUpRight size={16} />
        </Link>
        <Link
          className="text-link"
          href={`/support/services?topic=${context.topic}`}
        >
          Find a trusted service <ArrowUpRight size={15} />
        </Link>
      </div>
    </aside>
  );
}
