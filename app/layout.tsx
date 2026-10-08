import type { Metadata } from "next";
import { Caveat, Cormorant_Garamond, Inter } from "next/font/google";
import Preloader from "@/components/layout/Preloader";
import RevealController from "@/components/layout/RevealController";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SketchTrail from "@/components/layout/SketchTrail";
import SkipLink from "@/components/layout/SkipLink";
import { home } from "@/content/home";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Handwritten annotations (drawing labels, margin notes).
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: home.metaTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

// Without JavaScript: no preloader, and everything the reveal system would
// animate in is simply shown.
const noScriptCss =
  "[data-preloader]{display:none}[data-reveal],[data-line],[data-slide]{opacity:1!important;transform:none!important}.w{transform:none!important}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cormorant.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <noscript>
          <style>{noScriptCss}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <Preloader tagline={site.tagline} />
        <ScrollProgress />
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <SketchTrail />
        <RevealController />
      </body>
    </html>
  );
}
