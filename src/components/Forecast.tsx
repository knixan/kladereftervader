import Image from "next/image";
import type { ForecastItem } from "@/types/weather.d";

interface ForecastProps {
  items: ForecastItem[];
  iconUrlBase: string;
}

export default function Forecast({ items, iconUrlBase }: ForecastProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <aside className="w-full rounded-[32px] bg-sky-50 border border-sky-100 p-5 sm:p-6 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-black text-slate-800 text-center mb-4 sm:mb-5">
        Prognos
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={item.dt}
            className="bg-white rounded-3xl p-4 text-center shadow-sm border border-slate-100"
          >
            <p className="font-bold text-sm sm:text-base text-slate-700 mb-1">
              Om {3 * (index + 1)}h
            </p>

            <Image
              src={`${iconUrlBase}${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              width={64}
              height={64}
              className="mx-auto"
            />

            <p className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">
              {Math.round(item.main.temp)}°
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
