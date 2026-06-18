import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://kladereftervader.se";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kläder efter Väder",
    template: "%s | Kläder efter Väder",
  },
  description:
    "Kläder efter Väder hjälper barn att förstå vad de ska ha på sig baserat på vädret. Anpassad för barn med IF, autism och språkstörning.",
  keywords: [
    "kläder efter väder",
    "väderapp barn",
    "klä sig efter väder",
    "väder Sverige",
    "app IF autism",
    "barnapp väder",
    "vad ska man ha på sig",
  ],
  authors: [{ name: "Kläder efter Väder" }],
  openGraph: {
    title: "Kläder efter Väder",
    description:
      "Hjälper barn att förstå vad de ska ha på sig baserat på vädret idag.",
    url: BASE_URL,
    siteName: "Kläder efter Väder",
    images: [
      {
        url: "/kladereftervader.png",
        width: 1200,
        height: 630,
        alt: "Kläder efter Väder",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kläder efter Väder",
    description: "Hjälper barn att förstå vad de ska ha på sig efter vädret.",
    images: ["/kladereftervader.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kläder efter Väder",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-gradient-to-br from-[#e1f3ff] via-[#fffaed] to-[#ffeef5] text-[#0f172a] flex flex-col">
        {children}
      </body>
    </html>
  );
}
