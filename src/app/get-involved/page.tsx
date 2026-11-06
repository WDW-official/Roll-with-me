import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Trophy,
  Users,
  Building2,
  MessageCircle,
  HeartHandshake,
} from "lucide-react";
import { PageIntro } from "@/components/ui";
export const metadata = {
  title: "Get involved",
};
const ways = [
  {
    title: "FIND YOUR THING.",
    text: "Sport, tech, creativity, practical skills and new routines. Start with your area.",
    href: "/opportunities",
    Icon: Code2,
  },
  {
    title: "TAKE ON A CHALLENGE.",
    text: "Football skills, sprint sessions and creative briefs. Explore the programme concepts.",
    href: "/challenges",
    Icon: Trophy,
  },
  {
    title: "HAVE YOUR SAY.",
    text: "Help shape RWM through feedback and future youth advisory opportunities.",
    href: "/the-circle",
    Icon: MessageCircle,
  },
  {
    title: "BRING AN OPPORTUNITY.",
    text: "Are you a youth organisation, school or supervised activity provider? Submit for manual review.",
    href: "/partners",
    Icon: Building2,
  },
  {
    title: "SUPPORT THE MOVEMENT.",
    text: "Learn about funding, governance and the evidence we intend to report responsibly.",
    href: "/partners",
    Icon: HeartHandshake,
  },
  {
    title: "SHOW UP FOR SOMEONE.",
    text: "Parent and carer resources, safer conversations and a separate adult community.",
    href: "/parents",
    Icon: Users,
  },
];
export default function Involved() {
  return (
    <div className="page-width page-content">
      <PageIntro
        label="GET INVOLVED / EVERY MOVE COUNTS"
        title={"COME AS YOU ARE.\nSEE WHAT’S POSSIBLE."}
        description="There’s more than one way to be part of RWM. Find yours."
      />
      <div className="feature-grid">
        {ways.map((w) => (
          <Link className="feature-card" href={w.href} key={w.title}>
            <w.Icon />
            <h2>{w.title}</h2>
            <p>{w.text}</p>
            <span className="text-link">
              Take a look <ArrowUpRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
