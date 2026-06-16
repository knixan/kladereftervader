// src\components\Forecast.tsx
import Image from "next/image";
import type { ForecastItem } from "@/types/weather.d";

interface ForecastProps {
  items: ForecastItem[];
  iconUrlBase: string;
}

function getForecastClothes(temp: number) {
  if (temp <= -3)
    return {
      image: "/klader/superkallt.png",
      color: "#2563eb",
    };

  if (temp <= 4)
    return {
      image: "/klader/kallt.png",
      color: "#60a5fa",
    };

  if (temp <= 10)
    return {
      image: "/klader/kyligt.png",
      color: "#0d9488",
    };

  if (temp <= 16)
    return {
      image: "/klader/svalt.png",
      color: "#16a34a",
    };

  if (temp <= 18)
    return {
      image: "/klader/jummet.png",
      color: "#facc15",
    };

  if (temp <= 22)
    return {
      image: "/klader/varmt.png",
      color: "#ea580c",
    };

  return {
    image: "/klader/supervarmt.png",
    color: "#dc2626",
  };
}

export default function Forecast({
  items,
  iconUrlBase,
}: ForecastProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <aside className="w-full rounded-[32px] bg-[#eaf6ff] border border-[#d5edff] p-5 sm:p-6 shadow-sm">
      <h3 className="text-2xl font-black text-center mb-6">
        Prognos - Senare idag
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => {
          const clothes = getForecastClothes(
            Math.round(item.main.temp)
          );

          return (
            <div
              key={item.dt}
              className="rounded-3xl p-4 text-center text-white shadow-lg"
              style={{
                backgroundColor: clothes.color,
              }}
            >
              <p className="font-black text-lg">
                Kl{" "}
                {new Date(item.dt * 1000).toLocaleTimeString(
                  "sv-SE",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>

              <Image
                src={`${iconUrlBase}${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                width={70}
                height={70}
                className="mx-auto"
              />

              <Image
                src={clothes.image}
                alt="Klädtips"
                width={100}
                height={100}
                className="mx-auto"
              />

              

              <p className="text-4xl font-black">
                {Math.round(item.main.temp)}°
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}