import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full text-center py-6 mt-2 text-[#475569] text-xs sm:text-sm flex flex-col gap-3">
      
      {/* Information om appens fina syfte */}
      <div className="max-w-md mx-auto px-4 opacity-90">
        <p className="text-xs sm:text-sm font-medium leading-relaxed">
          Denna app är skapad för att göra det lättare och roligare för barn med IF, autism eller språkstörning att se vilka kläder som passar för dagens väder. ☀️🧥
        </p>
         <p className="mt-2">
          <Link href="/om" className="underline hover:text-[#1e293b] transition">
            Om Kläder efter Väder - Se alla kläder och iconer
          </Link>
            <Link
            href="/om"
        
            className="inline-block text-center bg-[#22c55e] hover:bg-[#16a34a] active:scale-[0.99] transition text-white font-extrabold rounded-2xl py-3 px-6 shadow-md text-sm"
          >
            Ladda ner appen!
          </Link>
        </p>
      </div>

      {/* PAYPAL-KNAPP: Donera en kopp kaffe
      <div className="my-2">
        <a
          href="https://paypal.me/DittNamn/40" // <-- BYT UT "DittNamn" mot ditt riktiga PayPal.Me-namn!
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#ffdd00] hover:bg-[#fada00] text-slate-800 font-extrabold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105 active:scale-95 text-xs sm:text-sm border border-yellow-400"
        >
          <span>Bjud på en kopp kaffe? ☕</span>
        </a>
      </div> */}

      <hr className="w-16 mx-auto border-slate-300 my-1" />

      {/* Din befintliga copyright och info */}
      <div>
        <p>© 2026 Kod och Design av Josefine Eriksson | <a href="https://kodochdesign.se" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1e293b] transition">kodochdesign.se</a></p>
        <p className="mt-1 text-[11px] sm:text-xs opacity-75">
          Webbappen är under utveckling och en mobilapp planeras inom kort.
        </p>
       
      </div>
      
    </footer>
  );
}