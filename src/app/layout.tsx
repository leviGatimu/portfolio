import type { Metadata } from "next";
import { Anton, Inter, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import PersistentPortrait from "@/components/ui/PersistentPortrait";
import Nav from "@/components/layout/Nav";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Levi Gatimu — Software Developer",
  description:
    "Software developer in Kigali, Rwanda. Designing and building web applications, platforms and dashboards that ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${inter.variable} ${spaceMono.variable} antialiased`}
    >
      <body data-custom-cursor>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <Nav />
          {children}
          <CustomCursor />
          <GrainOverlay />
          <PersistentPortrait />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
