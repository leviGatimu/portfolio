import type { Metadata } from "next";
import { Anton, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import PersistentPortrait from "@/components/ui/PersistentPortrait";
import Nav from "@/components/layout/Nav";
import Preloader from "@/components/layout/Preloader";

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

/** Runs before paint: repeat visits skip the preloader without a flash. */
const bootScript = `try{if(sessionStorage.getItem("lg-booted"))document.documentElement.setAttribute("data-booted","")}catch(e){}`;

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
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <Nav />
          {children}
          <CustomCursor />
          <GrainOverlay />
          <Preloader />
          <PersistentPortrait />
        </Providers>
      </body>
    </html>
  );
}
