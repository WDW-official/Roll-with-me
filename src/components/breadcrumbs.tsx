"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
export function Breadcrumbs() {
  const path = usePathname();
  const parts = path.split("/").filter(Boolean);
  if (!parts.length) return null;
  return (
    <nav className="breadcrumbs mono" aria-label="Breadcrumb">
      <Link href="/">HOME</Link>
      {parts.map((p, i) => (
        <span key={p}>
          <ChevronRight size={11} />
          {i === parts.length - 1 ? (
            <span aria-current="page">{p.replaceAll("-", " ")}</span>
          ) : (
            <Link href={"/" + parts.slice(0, i + 1).join("/")}>
              {p.replaceAll("-", " ")}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
