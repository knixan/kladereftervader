import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAMMAS VÄDERTIPS",
  description: "En rolig väderapp för barn skapad i Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-gradient-to-br from-sky-100 via-amber-50 to-pink-100 text-slate-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}
