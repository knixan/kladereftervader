"use client";

import { useCallback } from "react";
import useWeather from "@/hooks/useWeather";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import LocationButton from "@/components/LocationButton";
import WeatherCard from "@/components/WeatherCard";
import Forecast from "@/components/Forecast";
import SevenDayForecast from "@/components/SevenDayForecast"; // Fixat: Tog bort det lösa snedstrecket här!
import Footer from "@/components/Footer";

export default function Home() {
  const {
    city,
    setCity,
    weatherData,
    loading,
    error,
    fetchWeatherData,
    getWeatherByLocation,
    getWeatherTip,
    getFilteredForecast,
    getSevenDayForecast,
    API_ICON_URL,
  } = useWeather();

  const forecastItems = getFilteredForecast();
  const sevenDayItems = getSevenDayForecast();

  function handleSearch() {
    fetchWeatherData(city);
  }

  const handleLocationFound = useCallback(
    (lat: number, lon: number) => {
      getWeatherByLocation(lat, lon);
    },
    [getWeatherByLocation]
  );

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-6 sm:gap-8">
        <Header />

        <main className="w-full rounded-[32px] bg-white/75 backdrop-blur-md border border-white/60 shadow-[0_12px_40px_rgba(15,23,42,0.12)] p-5 sm:p-8">
          <section className="flex flex-col gap-4">
            
            {/* 1. Sökrutan i full bredd högst upp */}
            <div className="w-full">
              <SearchInput city={city} setCity={setCity} onSearch={handleSearch} />
            </div>

            {/* 2. Sökknappen och Min plats bredvid varandra */}
            <div className="flex flex-row gap-2 sm:gap-4 w-full">
              <button
                onClick={handleSearch}
                className="flex-1 text-base sm:text-lg font-extrabold rounded-3xl bg-[#dd3957] text-[#ffffff] shadow-md
                           hover:bg-[#cc1622] active:scale-[0.99] transition h-[62px] whitespace-nowrap"
              >
                SÖK 🔍
              </button>
              
              <div className="flex-1">
                <LocationButton onLocationFound={handleLocationFound} loading={loading} />
              </div>
            </div>

            {loading && (
              <div className="text-base sm:text-lg p-4 rounded-2xl bg-[#4279b8] text-[#ffffff] font-semibold animate-pulse text-center">
                Laddar väder...
              </div>
            )}

            {error && (
              <div className="bg-[#cc1622] text-[#ffffff] p-4 rounded-2xl text-center">
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
                {/* Det stora väderkortet med den stora bilden överst */}
                <section className="mt-6 w-full">
                  <WeatherCard
                    weatherData={weatherData}
                    iconUrl={`${API_ICON_URL}${weatherData.weather[0].icon}@2x.png`}
                    weatherTip={weatherTip}
                  />
                </section>

                {/* Prognos senare idag */}
                {forecastItems && forecastItems.length > 0 && (
                  <section className="mt-6">
                    <Forecast items={forecastItems} iconUrlBase={API_ICON_URL} />
                  </section>
                )}

                {/* NYHET: Prognos - 7 dagar framåt */}
                {sevenDayItems && sevenDayItems.length > 0 && (
                  <section className="mt-6">
                    <SevenDayForecast items={sevenDayItems} iconUrlBase={API_ICON_URL} />
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