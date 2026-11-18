import type { Metadata } from "next";
import { Inter, Instrument_Serif, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const metadata: Metadata = {
  metadataBase: new URL("https://jeevankorah.vercel.app"),
  title: "Jeevan Biju Korah · Full-stack & AI engineer",
  description:
    "Full-stack engineer building AI products people can trust. Product Engineer Intern at CareStack, final-year CS at FISAT.",
  openGraph: {
    title: "Jeevan Biju Korah",
    description: "Full-stack engineer building AI products people can trust.",
    images: ["/profile.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${hand.variable}`}>
      <body>
        <div className="col">{children}</div>
      </body>
    </html>
  );
}
