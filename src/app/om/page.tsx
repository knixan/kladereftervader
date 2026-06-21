import Image from "next/image";
import Link from "next/link";
import ClothIcon from "@/components/ClothIcon";
import { IoLogoAndroid } from "react-icons/io";
import { IoLogoApple } from "react-icons/io5";

const weatherCards = [
  {
    imagePath: "/klader/superkallt.png",
    title: "Superkallt",
    condition: "Under -3°C",
    description:
      "Tjock vinterjacka, termobyxor, långkalsonger, mössa, halsduk och varma vantar.",
    clothes: [
      "tshirt",
      "hoodie",
      "jacka",
      "langkalsonger",
      "termobyxor",
      "halsduk",
      "mossa",
      "vantar",
      "strumpor",
      "vinterskor",
    ],
  },
  {
    imagePath: "/klader/kallt.png",
    title: "Kallt",
    condition: "-3°C till 4°C",
    description: "Vinterjacka, termobyxor, mössa, halsduk och varma vantar.",
    clothes: [
      "tshirt",
      "hoodie",
      "jacka",
      "termobyxor",
      "halsduk",
      "mossa",
      "vantar",
      "strumpor",
      "vinterskor",
    ],
  },
  {
    imagePath: "/klader/snöstorm.png",
    title: "Snöstorm / Blåst",
    condition: "Storm och kyla",
    description: "Vindtät jacka, termobyxor, mössa, halsduk och varma vantar.",
    clothes: [
      "tshirt",
      "hoodie",
      "jacka",
      "termobyxor",
      "halsduk",
      "mossa",
      "vantar",
      "strumpor",
      "vinterskor",
    ],
  },
  {
    imagePath: "/klader/slask.png",
    title: "Slask",
    condition: "Snöblandat regn",
    description: "Fleecefodrade regnkläder och gummistövlar.",
    clothes: ["tshirt", "hoodie", "regnklader", "strumpor", "gummistovlar"],
  },
  {
    imagePath: "/klader/kyligt.png",
    title: "Kyligt",
    condition: "4°C till 10°C",
    description: "Jacka, byxor, mössa och tunna vantar.",
    clothes: [
      "tshirt",
      "hoodie",
      "jacka",
      "byxor",
      "mossa",
      "tunnavantar",
      "strumpor",
      "skor",
    ],
  },
  {
    imagePath: "/klader/svalt.png",
    title: "Svalt",
    condition: "10°C till 14°C",
    description: "Jacka eller tjock tröja och vanliga byxor.",
    clothes: ["tshirt", "jacka", "byxor", "strumpor", "skor"],
  },
  {
    imagePath: "/klader/milt.png",
    title: "Milt",
    condition: "14°C till 18°C",
    description: "Tunn jacka och vanliga kläder.",
    clothes: ["tshirt", "hoodie", "byxor", "strumpor", "skor"],
  },
  {
    imagePath: "/klader/jummet.png",
    title: "Lagom",
    condition: "18°C till 21°C",
    description: "T-shirt och vanliga byxor.",
    clothes: ["tshirt", "byxor", "strumpor", "skor"],
  },
  {
    imagePath: "/klader/varmt.png",
    title: "Varmt",
    condition: "21°C till 24°C",
    description: "T-shirt, shorts och skor. Drick vatten.",
    clothes: ["tshirt", "shorts", "vatten", "strumpor", "skor"],
  },
  {
    imagePath: "/klader/supervarmt.png",
    title: "Supervarmt",
    condition: "Över 24°C",
    description: "Sommarkläder, tofflor, solkräm och vatten.",
    clothes: [
      "tshirt",
      "linne",
      "shorts",
      "tofflor",
      "keps",
      "vatten",
      "solkram",
    ],
  },
  {
    imagePath: "/klader/regn.png",
    title: "Regn",
    condition: "Regn",
    description: "Regnkläder och paraply. Vid kyla: gummistövlar.",
    clothes: ["tshirt", "regnklader", "strumpor", "paraply"],
  },
  {
    imagePath: "/klader/åska.png",
    title: "Åska",
    condition: "Åskväder",
    description: "Gå in. Ta på regnkläder och stövlar om du måste gå ut.",
    clothes: ["tshirt", "regnklader", "strumpor", "gummistovlar"],
  },
  {
    imagePath: "/klader/storm.png",
    title: "Storm",
    condition: "Kraftig vind",
    description: "Jacka och byxor. Stanna inne om du kan.",
    clothes: ["tshirt", "jacka", "byxor", "strumpor", "skor"],
  },
];

export default function OmPage() {
  return (
    <div className="w-full min-h-screen px-4 py-8 flex flex-col items-center gap-8">
      <div className="w-full max-w-2xl bg-white/75 backdrop-blur-md rounded-[32px] shadow-xl p-6 sm:p-8 flex flex-col gap-4">
        <Link
          href="/"
          className="text-sm font-bold text-[#164559] hover:text-[#0f2f3d] transition w-fit"
        >
          ← Tillbaka
        </Link>

        <h1 className="text-3xl sm:text-4xl font-black text-[#1e293b] leading-tight">
          Om Kläder efter Väder
        </h1>

        <div className="flex flex-col gap-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-4">
          <p className="text-sm font-bold text-[#166534]">
            Ladda ned Android-appen
          </p>
          <a
            href="/android/KläderVäder.apk"
            download
            className="inline-block text-center bg-[#22c55e] hover:bg-[#16a34a] active:scale-[0.99] transition text-white font-extrabold rounded-2xl py-3 px-6 shadow-md text-sm"
          >
            <IoLogoAndroid className="inline mr-2 text-lg" />
            Ladda ned för android
          </a>
          <p className="text-xs text-[#166534] leading-relaxed">
            <strong>OBS:</strong> Android kan visa en varning som säger{" "}
            <em>&ldquo;Installera okänd app?&rdquo;</em> eller{" "}
            <em>
              &ldquo;Din telefon är mer utsatt för angrepp från okända
              källor&rdquo;
            </em>
            . Det är normalt för appar som inte laddas ned via Google Play.
            Appen är säker att installera. Du kan behöva tillåta installation
            från okända källor i dina inställningar. Appen kommer snart även till Google Play!
          </p>
        </div>
        <div className="flex flex-col gap-3 bg-[#f8f8f8] border border-[#d1d5db] rounded-2xl p-4">
          <p className="text-sm font-bold text-[#1e293b] flex items-center gap-2">
            <IoLogoApple className="text-lg" /> iPhone / iOS
          </p>
          <p className="text-xs text-[#475569] leading-relaxed">
            Appen finns inte i App Store men du kan lägga till den på hemskärmen:
          </p>
          <ol className="text-xs text-[#475569] leading-relaxed flex flex-col gap-1 list-decimal list-inside pl-1">
            <li>Öppna <strong>kladereftervader.se</strong> i Safari</li>
            <li>Tryck på <strong>dela-knappen</strong> (rutan med pilen uppåt) längst ner i webbläsaren</li>
            <li>Välj <strong>&ldquo;Lägg till på hemskärmen&rdquo;</strong></li>
          </ol>
          <p className="text-xs text-[#475569]">Då fungerar den som en app — ingen nedladdning krävs.</p>
        </div>
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
          Kläder efter Väder är en app som hjälper alla barn, men är speciellt
          anpassad för barn med IF, autism eller språkstörning att förstå vilket
          väder det är och vad de ska ha på sig. Bilderna nedan visar alla olika
          vädertyper som appen kan visa.
        </p>
       

        <p className="text-xs text-[#64748b]">
          Skapad av Josefine Eriksson &mdash;{" "}
          <a
            href="https://kodochdesign.se"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#1e293b] transition"
          >
            kodochdesign.se
          </a>
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-black text-[#1e293b] mb-4 px-1">
          Alla väderbilder
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {weatherCards.map((card) => (
            <div
              key={card.title}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-4 flex flex-col items-center gap-3 text-center"
            >
              <div className="bg-white rounded-xl p-2 shadow-sm w-full">
                <Image
                  src={card.imagePath}
                  alt={card.title}
                  width={200}
                  height={220}
                  className="mx-auto object-contain rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-black text-[#1e293b] text-base leading-tight">
                  {card.title}
                </p>
                <p className="text-xs font-bold text-[#22c55e]">
                  {card.condition}
                </p>
                <p className="text-xs text-[#475569] leading-snug">
                  {card.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  {card.clothes.map((item) => (
                    <div
                      key={item}
                      className="p-2 bg-white border border-slate-100 text-slate-800 rounded-xl shadow-sm flex items-center justify-center"
                    >
                      <ClothIcon clothKey={item} size={32} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#94a3b8] pb-4">© 2026 Josefine Eriksson</p>
    </div>
  );
}
