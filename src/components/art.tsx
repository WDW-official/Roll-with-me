import { Pawn, RouteMotif } from "./icons";
export function CourtArt({
  hero = false
}: {
  hero?: boolean;
}) {
  return <div className={`court-art ${hero ? "hero-art" : ""}`} role="img" aria-label="Original RWM illustration: a London basketball court, orange basketball and city architecture">
    <svg viewBox="0 0 700 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><pattern id={hero ? "grain-hero" : "grain-card"} width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" fill="#faf4f0" opacity=".15" /></pattern><pattern id={hero ? "windows-hero" : "windows-card"} width="24" height="29" patternUnits="userSpaceOnUse"><rect x="6" y="7" width="8" height="14" fill="#a5a19a" opacity=".4" /></pattern><clipPath id={hero ? "ball-hero" : "ball-card"}><circle cx="470" cy="439" r="142" /></clipPath></defs>
      <rect width="700" height="650" fill="#1b1c1b" />
      <path d="M0 110 135 70v335H0z" fill="#3b3c38" /><path d="m135 70 65 39v296h-65z" fill="#242522" />
      <path d="M0 110 135 70v335H0z" fill={`url(#${hero ? "windows-hero" : "windows-card"})`} />
      <path d="M480 20h150v370H480z" fill="#3e3f3a" /><path d="m630 20 70 50v320h-70z" fill="#292a26" />
      <path d="M480 20h150v370H480z" fill={`url(#${hero ? "windows-hero" : "windows-card"})`} />
      <path d="M235 140h150v255H235z" fill="#55554e" /><path d="m385 140 60 40v215h-60z" fill="#33342f" />
      <path d="M235 140h150v255H235z" fill={`url(#${hero ? "windows-hero" : "windows-card"})`} />
      <path d="M0 400h700v250H0z" fill="#30312c" />
      <g stroke="#777970" strokeWidth="1" opacity=".7"><path d="M0 395h700M0 420h700M0 450h700M0 490h700M0 545h700M0 620h700M350 380 0 650M350 380l350 270M350 380v270M350 380 120 650M350 380l230 270M350 380 0 490M350 380l350 110" /></g>
      <path d="M70 607 260 414h190l191 193z" stroke="#e3dfd3" strokeWidth="3" fill="none" opacity=".7" />
      <ellipse cx="352" cy="508" rx="83" ry="28" stroke="#e3dfd3" strokeWidth="3" fill="none" opacity=".7" />
      <path d="M285 407v-160m0 0h85v57h-85m38-5v45m-24-28h48m-42 4 7 23h22l7-23" stroke="#c6c4b9" strokeWidth="4" fill="none" />
      <ellipse cx="489" cy="592" rx="147" ry="20" fill="#121212" opacity=".65" />
      <circle cx="470" cy="439" r="142" fill="#ff5500" />
      <g clipPath={`url(#${hero ? "ball-hero" : "ball-card"})`} stroke="#3c241b" strokeWidth="5" fill="none"><path d="M310 485c120-40 186-106 280-162M399 285c-15 107 5 224 99 299M310 390c140 55 242 49 325-20M470 290c111 82 129 185 60 280" /><ellipse cx="470" cy="439" rx="106" ry="175" transform="rotate(-27 470 439)" /></g>
      <rect width="700" height="650" fill={`url(#${hero ? "grain-hero" : "grain-card"})`} />
      <g fill="#faf4f0" fontFamily="monospace" fontSize="11" letterSpacing="2"><text x="30" y="40">RWM / LONDON / 001</text><text x="30" y="620">THE NEXT MOVE IS YOURS.</text></g>
      <path d="M657 32h18v18m0-18-24 24" stroke="#ff5500" strokeWidth="3" />
    </svg>
    {hero && <><div className="art-sticker"><span className="mono">NO PERFECT START NEEDED.</span><strong>JUST<br />SHOW UP.</strong><span className="mono">51.5074° N / 0.1278° W</span></div><div className="art-caption"><span className="live-dot" /> ORIGINAL RWM ARTWORK <span>01 / LDN</span></div></>}
  </div>;
}
export function TileArt({
  kind = "route",
  label
}: {
  kind?: string;
  label?: string;
}) {
  if (kind === "court") return <CourtArt />;
  return <div className={`tile-art art-${kind}`} role="img" aria-label={`Original branded illustration: ${label ?? kind}`}>
    <div className="art-grid" />
    {kind === "code" || kind === "robot" ? <><span className="code-line mono">&lt;YOUR_FUTURE /&gt;</span><div className="code-window"><div className="window-bar"><i /><i /><i /><span>next-move.tsx</span></div><pre><span>01</span> const you = &#123;<br /><span>02</span>   ideas: <em>&quot;unlimited&quot;</em>,<br /><span>03</span>   nextMove: <em>&quot;build&quot;</em><br /><span>04</span> &#125;;<br /><span>05</span><br /><span>06</span> <b>makeItHappen(you);</b><br /><span>07</span> <i className="cursor-block" /></pre></div><span className="art-bottom mono">MAKE SOMETHING THAT MATTERS ↗</span></> : kind === "boxing" ? <><div className="boxing-type">FIND<br />YOUR<br /><span>FOCUS.</span></div><div className="boxing-rings" /><span className="art-bottom mono">MOVEMENT / MINDSET / YOU</span></> : kind === "football" ? <><div className="pitch"><div /><span /></div><strong className="football-type">PLAY<br />YOUR<br />PART.</strong><span className="art-bottom mono">SAME TEAM. DIFFERENT STRENGTHS.</span></> : kind === "film" || kind === "maker" ? <><div className="film-frame"><span>REC ●</span><strong>MAKE<br />YOUR<br />MARK.</strong><span>RWM STUDIO / 01:04:26</span></div></> : kind === "sprint" ? <><div className="sprint-lines" /><strong className="sprint-type">ON<br />YOUR<br /><span>MARK.</span></strong><span className="art-bottom mono">YOUR PACE. YOUR PROGRESS.</span></> : <><RouteMotif className="tile-route" /><div className="route-type">THE<br />OTHER<br /><span>ROUTE.</span></div><Pawn className="tile-pawn" /><span className="art-bottom mono">DIFFERENT START. BETTER ENDING.</span></>}
    <span className="art-label mono">RWM® ORIGINAL ART</span>
  </div>;
}
export function ProductArt({
  kind = "hoodie"
}: {
  kind?: string;
}) {
  return <div className={`product-art product-${kind}`} role="img" aria-label={`Original illustration of RWM ${kind}; sample design`}><svg viewBox="0 0 400 400" aria-hidden="true"><ellipse cx="200" cy="356" rx="110" ry="12" fill="#000" opacity=".1" /><path d={kind === "tee" ? "m150 92-56 25-46 78 55 31 30-42v155h134V184l30 42 55-31-46-78-56-25c-14 25-56 25-70 0z" : "m150 95-57 24-37 170 57 12 21-111-4 156h140l-4-156 21 111 57-12-37-170-57-24c-12-16-58-16-70 0z"} fill={kind === "tee" ? "#f2ede5" : kind === "crew" ? "#92928c" : "#242424"} stroke="#161616" strokeWidth="2" />{kind === "hoodie" && <><path d="M151 106c-9-68 107-68 98 0l-48 35z" fill="#303030" stroke="#151515" strokeWidth="3" /><path d="m179 119-3 58m45-58 3 58M163 267h74l10 47h-94z" stroke="#555" fill="none" strokeWidth="2" /></>}<g fill={kind === "tee" ? "#171717" : "#faf4f0"} fontFamily="sans-serif" fontWeight="900" textAnchor="middle" fontSize="26" letterSpacing="-1"><text x="200" y="196">ROLL</text><text x="200" y="221">WITH</text><text x="200" y="246">ME.</text></g><path d="M194 258h12v4h-12z" fill="#ff5500" /></svg><span className="mono">DESIGN SAMPLE / NOT FOR SALE</span></div>;
}
