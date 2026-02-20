"use client";

import useWeather from "@/hooks/useWeather";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import WeatherCard from "@/components/WeatherCard";
import Forecast from "@/components/Forecast";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  const {
    city,
    setCity,
    weatherData,
    loading,
    error,
    fetchWeatherData,
    getWeatherTip,
    getFilteredForecast,
    API_ICON_URL,
  } = useWeather();

  const forecastItems = getFilteredForecast();

  function handleSearch() {
    fetchWeatherData(city);
  }

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl flex flex-col gap-6 sm:gap-8">
        <Header />

        <main className="w-full rounded-[32px] bg-white/75 backdrop-blur-md border border-white/60 shadow-[0_12px_40px_rgba(15,23,42,0.12)] p-5 sm:p-8">
          <section className="flex flex-col gap-4">
            <SearchInput city={city} setCity={setCity} onSearch={handleSearch} />

            {loading && (
              <div className="text-base sm:text-lg p-4 rounded-2xl bg-[#4279b8] text-[#ffffff] font-semibold animate-pulse">
                Laddar väder...
              </div>
            )}

            {error && (
              <div className="bg-[#cc1622] text-[#ffffff] p-4 rounded-2xl">
                <p className="text-sm sm:text-base font-bold">{error}</p>
              </div>
            )}
          </section>

          {!loading && weatherData && (() => {
            const weatherTip = getWeatherTip(
              weatherData.weather[0].id,
              weatherData.main.temp,
              weatherData.wind.speed
            );
            
            return (
              <>
                <section className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
                  <WeatherCard
                    weatherData={weatherData}
                    iconUrl={`${API_ICON_URL}${weatherData.weather[0].icon}@2x.png`}
                  />

                  <div className="w-full h-full rounded-[32px] p-6 sm:p-8 bg-[#ffffff] shadow-xl flex flex-col items-center justify-center text-[#064e3b]">
                    <Image
                      src={weatherTip.imagePath}
                      alt="Klädrekommendation"
                      width={300}
                      height={300}
                      className="mb-4"
                    />
                    <p className="text-base sm:text-lg font-black leading-snug text-center">
                      {weatherTip.text}
                    </p>
                  </div>
                </section>

                {forecastItems && forecastItems.length > 0 && (
                  <section className="mt-6">
                    <Forecast items={forecastItems} iconUrlBase={API_ICON_URL} />
                  </section>
                )}
              </>
            );
          })()}
        </main>

        <Footer />
      </div>
    </div>
  );
}
