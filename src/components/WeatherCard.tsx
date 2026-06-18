import { WeatherData } from "@/types/weather.d";
import Image from "next/image";
import ClothIcon from "@/components/ClothIcon";

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
            className="w-8 h-8 sm:w-12 sm:h-12"
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
          className="mx-auto rounded-xl object-contain w-[200px] sm:w-[350px]"
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
            <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-3">
              Ta på dig det här:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-white/10 p-3 sm:p-4 rounded-xl">
              {weatherTip.clothes.map((item, index) => (
                <div
                  key={index}
                  className="p-2 sm:p-3 bg-white text-slate-800 rounded-2xl shadow-md flex items-center justify-center transform hover:scale-105 transition"
                >
                  <ClothIcon clothKey={item} size={44} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
