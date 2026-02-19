import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kläder Efter Väder",
  description: "En app som tipsar om hur man ska klä sig efter vädret idag, baserat på aktuella väderdata och personliga preferenser.",
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
