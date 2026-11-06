import type { Metadata, Viewport } from "next";
import { Header, Footer, MobilePillarNav } from "@/components/header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContextSupport } from "@/components/context-support";
import { Motion } from "@/components/motion";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? "http://localhost:3000"),
  title: {
    default: "ROLL WITH ME — Your city. Your move.",
    template: "%s — ROLL WITH ME",
  },
  description:
    "Move together. Become more. Stories, skills and a world of possibilities for young Londoners.",
  robots: {
    index: false,
    follow: false,
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#FAF4F0",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#121212",
    },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('rwm-theme')||'system';document.documentElement.dataset.theme=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t}catch(e){}",
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Breadcrumbs />
          {children}
          <ContextSupport />
        </main>
        <Footer />
        <MobilePillarNav />
        <Motion />
      </body>
    </html>
  );
}
