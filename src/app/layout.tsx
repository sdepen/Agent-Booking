import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentBooking – Agent de Réservation 24/7",
  description:
    "Ne perdez plus une seule réservation : un agent IA qui répond, qualifie et confirme 24h/24, 7j/7.",
  icons: {
    icon: "/favicon.png",          // 👈 ton fichier actuel
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth" style={{ scrollPaddingTop: "80px" }}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#101726] text-gray-300`}>
        {children}
      </body>
    </html>
  );
}
