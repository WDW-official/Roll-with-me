import type { SVGProps } from "react";
export function Pawn({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 48 64" fill="currentColor" className={className} aria-hidden="true" {...props}><circle cx="24" cy="13" r="10" /><path d="M15 25h18v6H15zM19 30h10c0 12 3 17 9 22v5H10v-5c6-5 9-10 9-22ZM7 58h34v6H7z" /></svg>;
}
export function BrandMark({
  className = ""
}: {
  className?: string;
}) {
  return <svg className={className} viewBox="0 0 64 72" fill="currentColor" aria-hidden="true"><defs><mask id="pawn-mark"><rect width="64" height="72" fill="white" /><circle cx="29" cy="21" r="7" fill="black" /><path d="M23 28h12v4H23zm3 4h6c0 9 2 12 7 16v6H19v-6c5-4 7-7 7-16z" fill="black" /></mask></defs><path d="M4 0h30c19 0 27 10 27 25 0 11-5 17-12 21l15 26H41L28 48h-4v24H4z" mask="url(#pawn-mark)" /></svg>;
}
export function Die({
  className = ""
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true"><path d="m40 4 33 19v36L40 77 7 59V23zM7 23l33 19 33-19M40 42v35" stroke="currentColor" strokeWidth="2" />{[[25, 23], [47, 21], [58, 27], [23, 45], [23, 57], [52, 48], [63, 43], [52, 61], [63, 55]].map(([cx, cy], i) => <ellipse key={i} cx={cx} cy={cy} rx="3" ry="4" fill="currentColor" />)}</svg>;
}
export function Crown({
  className = ""
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 64 48" className={className} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="m7 10 12 11L32 5l13 16 12-11-7 29H14zM14 45h36" /><circle cx="6" cy="7" r="3" /><circle cx="32" cy="4" r="3" /><circle cx="58" cy="7" r="3" /></svg>;
}
export function RouteMotif({
  className = ""
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 260 140" className={className} fill="none" aria-hidden="true"><path d="M0 110h60l65-65h135M20 0v40l70 70h150M140 0v140M0 55h260" stroke="currentColor" strokeWidth="2" />{[[20, 40], [60, 110], [90, 110], [125, 45], [140, 45], [210, 55]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="5" stroke="currentColor" strokeWidth="2" fill="var(--surface)" />)}</svg>;
}
export function Coordinate({
  className = ""
}: {
  className?: string;
}) {
  return <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" aria-hidden="true"><circle cx="20" cy="20" r="11" /><path d="M20 2v10m0 16v10M2 20h10m16 0h10" /><circle cx="20" cy="20" r="2" fill="currentColor" /></svg>;
}
