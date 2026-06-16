import { WeatherData } from "@/types/weather.d";
import Image from "next/image";

// React Icons
import { GiMonclerJacket, GiArmoredPants, GiSkirt, GiShorts, GiLargeDress, GiGloves, GiWinterGloves } from "react-icons/gi";
import { FaSocks, FaUmbrella } from "react-icons/fa";
import { FaBottleWater, FaRedhat } from "react-icons/fa6";
import { IoShirtOutline } from "react-icons/io5";
import { PiPants, PiPantsFill, PiBaseballCap, PiSneakerFill } from "react-icons/pi";
import { CgCap } from "react-icons/cg";
import { CiShirt } from "react-icons/ci";

interface WeatherCardProps {
  weatherData: WeatherData;
  iconUrl: string;
  weatherTip: {
    text: string;
    imagePath: string;
    color: string;
    clothes: string[];
  };
}

export default function WeatherCard({
  weatherData,
  iconUrl,
  weatherTip,
}: WeatherCardProps) {
  if (!weatherData) return null;

  const { name, main, weather } = weatherData;

  // Funktion för att mappa textsträng till rätt ikon eller lokal bildfil
  const renderClothIcon = (clothKey: string) => {
    const iconSize = 44; // Stora ikoner för barnen
    switch (clothKey) {
      case "jacka": return <GiMonclerJacket size={iconSize} title="Jacka" />;
      case "strumpor": return <FaSocks size={iconSize} title="Strumpor" />;
      case "tshirt": return <IoShirtOutline size={iconSize} title="T-shirt" />;
      case "byxor": return <PiPants size={iconSize} title="Byxor" />;
      case "langkalsonger": return <GiArmoredPants size={iconSize} title="Långkalsonger" />;
      case "termobyxor": return <PiPantsFill size={iconSize} title="Tjocka byxor" />;
      case "kjor": return <GiSkirt size={iconSize} title="Kjol" />;
      case "linne": return <CiShirt size={iconSize} title="Linne" />;
      case "shorts": return <GiShorts size={iconSize} title="Shorts" />;
      case "klanning": return <GiLargeDress size={iconSize} title="Klänning" />;
      case "tunnavantar": return <GiGloves size={iconSize} title="Tunna vantar" />;
      case "vantar": return <GiWinterGloves size={iconSize} title="Varma vantar" />;
      case "mossa": return <CgCap size={iconSize} title="Mössa" />;
      case "keps": return <PiBaseballCap size={iconSize} title="Keps" />;
      case "hatt": return <FaRedhat size={iconSize} title="Hatt" />;
      case "vinterskor": return <PiSneakerFill size={iconSize} title="Vinterskor" />;
      case "vatten": return <FaBottleWater size={iconSize} title="Vattenflaska" />;
      case "paraply": return <FaUmbrella size={iconSize} title="Paraply" />;
      
      // Lokala bilder från public/icons/
      case "skor": 
        return <Image src="/icons/sneakers.png" alt="Skor" width={iconSize} height={iconSize} className="object-contain" />;
      case "tofflor": 
        return <Image src="/icons/slippers.png" alt="Tofflor" width={iconSize} height={iconSize} className="object-contain" />;
      case "solkram": 
        return <Image src="/icons/sunlotion.png" alt="Solkräm" width={iconSize} height={iconSize} className="object-contain" />;
      default: return null;
    }
  };

  return (
    <div
      className="w-full rounded-[32px] p-6 sm:p-8 text-center text-white shadow-xl flex flex-col gap-6"
      style={{
        background: `linear-gradient(135deg, ${weatherTip.color}, ${weatherTip.color}cc)`,
      }}
    >
   {/* 1. Stad, Mindre Väderikon och Mindre Temperatur högst upp */}
      <div className="flex flex-col items-center justify-center gap-1">
        <h2 className="text-2xl font-black tracking-wide">{name}</h2>
        <div className="flex items-center justify-center gap-2">
          <Image
            src={iconUrl}
            alt={weather[0].description}
            width={48} 
            height={48}
          />
          <p className="text-3xl font-black">{Math.round(main.temp)}°</p> 
          <span className="text-sm font-bold opacity-75">
            (Känns som {Math.round(main.feels_like)}°)
          </span>
        </div>
      </div>

  {/* 2. Den stora bilden som är under väderikonen - Med vit bakgrund och vit ram */}
<div className="bg-white border-4 border-white rounded-2xl p-3 inline-block mx-auto shadow-lg max-w-full">
  <Image
    src={weatherTip.imagePath}
    alt="Klädtips bild"
    width={350}
    height={450}
    className="mx-auto rounded-xl object-contain"
    priority
  />
</div>

      {/* 3. Kommentarerna ligger nu DIREKT under bilden */}
      <div className="bg-black/15 rounded-2xl p-5 border border-white/10">
        <p className="text-xl sm:text-2xl font-black leading-snug tracking-wide">
          {weatherTip.text}
        </p>

        {/* 4. Klädikoner (klädesplagg) som passar till vädret, placerade längst ner i sektionen */}
        {weatherTip.clothes && weatherTip.clothes.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-3">Ta på dig det här:</p>
            <div className="flex flex-wrap justify-center gap-4 bg-white/10 p-4 rounded-xl">
              {weatherTip.clothes.map((item, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-white text-slate-800 rounded-2xl shadow-md flex items-center justify-center transform hover:scale-105 transition"
                >
                  {renderClothIcon(item)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}