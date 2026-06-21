import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description: "Integritetspolicy för Kläder efter Väder.",
};

export default function IntegritetspolicyPage() {
  return (
    <div className="w-full min-h-screen px-4 py-8 flex flex-col items-center gap-8">
      <div className="w-full max-w-2xl bg-white/75 backdrop-blur-md rounded-[32px] shadow-xl p-6 sm:p-8 flex flex-col gap-6">
        <Link
          href="/"
          className="text-sm font-bold text-[#164559] hover:text-[#0f2f3d] transition w-fit"
        >
          ← Tillbaka
        </Link>

        <h1 className="text-3xl sm:text-4xl font-black text-[#1e293b] leading-tight">
          Integritetspolicy
        </h1>

        <p className="text-sm text-[#64748b]">Senast uppdaterad: juni 2026</p>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#1e293b]">Om appen</h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            Kläder efter Väder är en gratis väderapp riktad till barn, särskilt
            anpassad för barn med IF, autism eller språkstörning. Appen visar
            vädret och ger tips på lämpliga kläder för dagen.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#1e293b]">
            Vilken data samlar vi in?
          </h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            Vi samlar inte in någon personlig information om dig. Appen sparar
            följande data <strong>lokalt på din enhet</strong>:
          </p>
          <ul className="list-disc list-inside text-sm text-[#475569] leading-relaxed flex flex-col gap-1 pl-2">
            <li>Senast sökt stad (i en cookie på din enhet)</li>
            <li>
              Din ungefärliga GPS-position om du väljer att använda
              &ldquo;Min plats&rdquo; (sparas lokalt, skickas inte vidare)
            </li>
          </ul>
          <p className="text-sm text-[#475569] leading-relaxed">
            Ingen av denna data skickas till oss eller delas med tredje part.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#1e293b]">
            Tredjepartstjänster
          </h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            Appen hämtar väderdata från{" "}
            <strong>OpenWeatherMap</strong> (openweathermap.org). När du söker
            efter en stad eller använder &ldquo;Min plats&rdquo; skickas din
            sökning eller dina koordinater till OpenWeatherMaps API för att
            hämta aktuell väderinformation. OpenWeatherMap har en egen
            integritetspolicy som du hittar på deras webbplats.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#1e293b]">Annonser</h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            Appen innehåller inga annonser.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#1e293b]">Barn</h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            Appen är avsedd för barn men samlar inte in någon personlig
            information från barn eller vuxna. Vi följer tillämpliga lagar om
            barns integritet.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-[#1e293b]">Kontakt</h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            Har du frågor om integritetspolicyn? Kontakta oss på{" "}
            <a
              href="mailto:josefinelouiseeriksson@gmail.com"
              className="underline hover:text-[#1e293b] transition"
            >
              josefinelouiseeriksson@gmail.com
            </a>
          </p>
        </section>

        <p className="text-xs text-[#94a3b8] pt-2">
          © 2026 Josefine Eriksson &mdash; Kläder efter Väder
        </p>
      </div>
    </div>
  );
}
