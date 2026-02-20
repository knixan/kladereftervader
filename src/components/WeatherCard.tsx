import { WeatherData } from "@/types/weather.d";
import Image from "next/image";

interface WeatherCardProps {
  weatherData: WeatherData;
  iconUrl: string;
}

export default function WeatherCard({ weatherData, iconUrl }: WeatherCardProps) {
  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;

  return (
    <div className="w-full h-full rounded-[32px] p-5 sm:p-7 md:p-9 text-center text-[#ffffff] shadow-xl bg-gradient-to-br from-[#51b1e8] to-[#827bd4] flex flex-col justify-between">
      <h2 className="text-2xl sm:text-3xl md:text-3xl font-black mb-3 sm:mb-5 tracking-tight">
        {name}
      </h2>

      <Image
        src={iconUrl}
        alt={weather[0].description}
        width={135}
        height={135}
        className="mx-auto"
      />

      <p className="text-4xl sm:text-5xl md:text-6xl font-black mt-2 sm:mt-3">
        {Math.round(main.temp)}°
      </p>

      <p className="text-base sm:text-lg mt-2 opacity-95">
        Känns som {Math.round(main.feels_like)}°
      </p>

      <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-base sm:text-lg font-bold">
        <div className="bg-[#ffffff]/95 text-[#1e293b] rounded-2xl p-3 sm:p-4">
          {main.humidity}% fukt
        </div>

        <div className="bg-[#ffffff]/95 text-[#1e293b] rounded-2xl p-3 sm:p-4">
          {wind.speed} m/s vind
        </div>
      </div>
    </div>
  );
}
