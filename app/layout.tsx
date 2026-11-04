import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: { default: "Learning UX Laws", template: "%s · Learning UX Laws" },
  description: "A journal of one UX law a day, with notes and a small example for each.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} ${cormorant.variable}`}>
      <body>
        <div className="wrap">
          <SiteHeader />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
