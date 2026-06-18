import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kläder efter Väder",
  description: "Se vad du ska ha på dig baserat på vädret idag",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kläder efter Väder",
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
