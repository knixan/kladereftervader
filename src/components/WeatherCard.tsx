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
    <div className="w-full h-full rounded-[32px] p-6 sm:p-8 md:p-10 text-center text-[#ffffff] shadow-xl bg-gradient-to-br from-[#51b1e8] to-[#827bd4] flex flex-col justify-between">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 tracking-tight">
        {name}
      </h2>

      <Image
        src={iconUrl}
        alt={weather[0].description}
        width={150}
        height={150}
        className="mx-auto"
      />

      <p className="text-5xl sm:text-6xl md:text-7xl font-black mt-3 sm:mt-4">
        {Math.round(main.temp)}°
      </p>

      <p className="text-base sm:text-lg mt-2 opacity-95">
        Känns som {Math.round(main.feels_like)}°
      </p>

      <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-base sm:text-lg font-bold">
        <div className="bg-[#ffffff]/95 text-[#1e293b] rounded-2xl p-4">
          {main.humidity}% fukt
        </div>

        <div className="bg-[#ffffff]/95 text-[#1e293b] rounded-2xl p-4">
          {wind.speed} m/s vind
        </div>
      </div>
    </div>
  );
}
