import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie } from "cookies-next";
import { WeatherData, ForecastData, ForecastItem } from "@/types/weather.d";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5";
const API_ICON_URL = "https://openweathermap.org/img/wn/";

export interface WeatherTip {
  text: string;
  imagePath: string;
  color: string;
  clothes: string[];
}

const getWeatherTip = (
  weatherId: number,
  temperature: number,
  windSpeed: number,
): WeatherTip => {
  // ÅSKA
  if (weatherId >= 200 && weatherId <= 232)
    return {
      text: "Det åskar. Gå in nu.",
      imagePath: "/klader/åska.png",
      color: "#64748b",
      clothes: ["tshirt", "regnklader", "strumpor", "gummistovlar"],
    };

  // STORM (≥24 m/s)
  if (windSpeed >= 24) {
    if (temperature <= 5)
      return {
        text: "Mycket vind och kallt. Ta på varma kläder.",
        imagePath: "/klader/snöstorm.png",
        color: "#3b82f6",
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
      };
    return {
      text: "Mycket vind ute. Stanna inne om du vill.",
      imagePath: "/klader/storm.png",
      color: "#475569",
      clothes: ["tshirt", "jacka", "byxor", "strumpor", "skor"],
    };
  }

  // MÅTTLIG VIND + VINTERKYLA (10–23 m/s och ≤0°C)
  if (windSpeed >= 10 && temperature <= 0)
    return {
      text: "Blåsigt och kallt. Skydda dig mot vinden.",
      imagePath: "/klader/snöstorm.png",
      color: "#3b82f6",
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
    };

  // SNÖBLANDAT REGN / SLASK — måste ligga FÖRE snö-blocket (611–613 ingår i 600–622)
  if (weatherId >= 611 && weatherId <= 613)
    return {
      text: "Det är slask ute. Ta på fleasfodrade regnkläder och gummistövlar.",
      imagePath: "/klader/slask.png",
      color: "#3b82f6",
      clothes: ["tshirt", "hoodie", "regnklader", "strumpor", "gummistovlar"],
    };

  // SNÖ
  if (weatherId >= 600 && weatherId <= 622) {
    if (temperature <= -3)
      return {
        text: "Det snöar och är superkallt. Ta på tjock vinterjacka, mössa, halsduk och vantar.",
        imagePath: "/klader/superkallt.png",
        color: "#2563eb",
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
      };
    return {
      text: "Det snöar. Ta på vinterjacka, mössa, halsduk och vantar.",
      imagePath: "/klader/kallt.png",
      color: "#60a5fa",
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
    };
  }

  // REGN
  if (
    (weatherId >= 300 && weatherId <= 321) ||
    (weatherId >= 500 && weatherId <= 531)
  ) {
    if (temperature <= 10)
      return {
        text: "Det regnar och är kallt. Ta på regnkläder och gummistövlar.",
        imagePath: "/klader/regn.png",
        color: "#3b82f6",
        clothes: ["tshirt", "regnklader", "strumpor", "gummistovlar"],
      };
    return {
      text: "Det regnar. Ta på regnkläder eller ta paraply.",
      imagePath: "/klader/regn.png",
      color: "#60a5fa",
      clothes: ["tshirt", "regnklader", "strumpor", "paraply"],
    };
  }

  // DIMMA — temperaturmedveten
  if (weatherId >= 701 && weatherId <= 781) {
    if (temperature <= 0)
      return {
        text: "Dimma och kallt. Ta på jacka, mössa, halsduk och vantar.",
        imagePath: "/klader/kallt.png",
        color: "#475569",
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
      };
    if (temperature <= 10)
      return {
        text: "Det är dimma ute. Lite kallt — ta på jacka och mössa.",
        imagePath: "/klader/kyligt.png",
        color: "#64748b",
        clothes: [
          "tshirt",
          "hoodie",
          "jacka",
          "byxor",
          "mossa",
          "strumpor",
          "skor",
        ],
      };
    return {
      text: "Det är dimma ute. Svårt att se.",
      imagePath: "/klader/svalt.png",
      color: "#9ca3af",
      clothes: ["tshirt", "jacka", "byxor", "strumpor", "skor"],
    };
  }

  // TEMPERATURBASERADE RÅD
  if (temperature <= -3)
    return {
      text: "Superkallt! Ta på tjock vinterjacka, termobyxor, mössa, halsduk och vantar.",
      imagePath: "/klader/superkallt.png",
      color: "#2563eb",
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
    };

  if (temperature <= 4)
    return {
      text: "Kallt ute. Ta på vinterjacka, termobyxor, mössa, halsduk och vantar.",
      imagePath: "/klader/kallt.png",
      color: "#60a5fa",
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
    };

  if (temperature <= 10)
    return {
      text: "Lite kallt. Ta på jacka, byxor, mössa och tunna vantar.",
      imagePath: "/klader/kyligt.png",
      color: "#0d9488",
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
    };

  if (temperature <= 14)
    return {
      text: "Svalt ute. Ta på en tröja och vanliga byxor.",
      imagePath: "/klader/svalt.png",
      color: "#16a34a",
      clothes: ["tshirt", "jacka", "byxor", "strumpor", "skor"],
    };

  if (temperature <= 18)
    return {
      text: "Milt ute. En tunn jacka och vanliga kläder räcker.",
      imagePath: "/klader/milt.png",
      color: "#22c55e",
      clothes: ["tshirt", "hoodie", "byxor", "strumpor", "skor"],
    };

  if (temperature <= 21)
    return {
      text: "Skönt ute. Du kan ha t-shirt och vanliga byxor.",
      imagePath: "/klader/jummet.png",
      color: "#facc15",
      clothes: ["tshirt", "byxor", "strumpor", "skor"],
    };

  if (temperature <= 24)
    return {
      text: "Varmt ute. Ta på t-shirt och shorts. Drick vatten.",
      imagePath: "/klader/varmt.png",
      color: "#ea580c",
      clothes: ["tshirt", "shorts", "vatten", "strumpor", "skor"],
    };

  return {
    text: "Mycket varmt! Ta på sommarkläder. Kom ihåg solkräm och vatten.",
    imagePath: "/klader/supervarmt.png",
    color: "#dc2626",
    clothes: [
      "tshirt",
      "linne",
      "shorts",
      "tofflor",
      "keps",
      "vatten",
      "solkram",
    ],
  };
};

export default function useWeather() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Sök via stadsnamn
  const fetchWeatherData = useCallback(async (searchCity: string) => {
    if (!searchCity || !API_KEY) {
      setError("Skriv en stad och prova igen.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const currentWeatherResponse = await fetch(
        `${API_URL}/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=sv`,
      );
      if (!currentWeatherResponse.ok) {
        throw new Error("Staden hittades inte, kontrollera stavningen!");
      }
      const currentData: WeatherData = await currentWeatherResponse.json();

      const forecastResponse = await fetch(
        `${API_URL}/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${API_KEY}&units=metric&lang=sv`,
      );
      if (!forecastResponse.ok) {
        throw new Error("Kunde inte hämta prognosdata.");
      }
      const fData: ForecastData = await forecastResponse.json();

      setWeatherData(currentData);
      setForecastData(fData);
      setCookie("last_city", searchCity, { maxAge: 60 * 60 * 24 * 30 });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ett okänt fel inträffade.");
      }
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Sök via GPS / Min plats
  const getWeatherByLocation = useCallback(
    async (lat?: number, lon?: number) => {
      if (!API_KEY) {
        setError("API-nyckeln saknas. Kontrollera din .env-fil.");
        return;
      }

      const hasCoords = typeof lat === "number" && typeof lon === "number";
      const getCoords = () =>
        new Promise<GeolocationPosition>((resolve, reject) => {
          if (typeof navigator === "undefined" || !navigator.geolocation) {
            reject(new Error("Geolocation stöds inte i din webbläsare."));
            return;
          }
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
          });
        });

      setLoading(true);
      setError(null);

      try {
        let latitude = lat;
        let longitude = lon;

        if (!hasCoords) {
          const position = await getCoords();
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        }

        const currentWeatherResponse = await fetch(
          `${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=sv`,
        );
        if (!currentWeatherResponse.ok) {
          throw new Error("Kunde inte hämta väder för din plats.");
        }
        const currentData: WeatherData = await currentWeatherResponse.json();

        const forecastResponse = await fetch(
          `${API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=sv`,
        );
        if (!forecastResponse.ok) {
          throw new Error("Kunde inte hämta prognosdata för din plats.");
        }
        const fData: ForecastData = await forecastResponse.json();

        setWeatherData(currentData);
        setForecastData(fData);
        setCity(currentData.name || "");
        setCookie("last_city", currentData.name || "", {
          maxAge: 60 * 60 * 24 * 30,
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ett okänt fel inträffade.");
        }
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // 3. Filtrera timprognos (senare idag)
  const getFilteredForecast = useCallback(() => {
    if (!forecastData) return null;
    return forecastData.list.slice(0, 4);
  }, [forecastData]);

  // 4. Filtrera fram 7-dagarsprognosen — väljer datapunkten närmast kl 12:00 per dag
  const getSevenDayForecast = useCallback(() => {
    if (!forecastData) return null;

    const today = new Date().toLocaleDateString("sv-SE");
    const byDate: Record<string, ForecastItem[]> = {};

    forecastData.list.forEach((item) => {
      const dateStr = new Date(item.dt * 1000).toLocaleDateString("sv-SE");
      if (dateStr === today) return;
      if (!byDate[dateStr]) byDate[dateStr] = [];
      byDate[dateStr].push(item);
    });

    const dailyForecasts = Object.values(byDate).map((items) =>
      items.reduce((best, item) => {
        const hour = new Date(item.dt * 1000).getHours();
        const bestHour = new Date(best.dt * 1000).getHours();
        return Math.abs(hour - 12) < Math.abs(bestHour - 12) ? item : best;
      }),
    );

    return dailyForecasts.slice(0, 5);
  }, [forecastData]);

  // 5. Automatisk laddning vid start
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as typeof window & {
      __mammasvaderInitialLoadDone?: boolean;
    };
    if (w.__mammasvaderInitialLoadDone) return;
    w.__mammasvaderInitialLoadDone = true;

    const loadInitial = async () => {
      try {
        const deniedBefore = localStorage.getItem("locationDenied") === "true";
        const lastLocation = localStorage.getItem("lastLocation");
        if (!deniedBefore && lastLocation) {
          const [latStr, lonStr] = lastLocation.split(",");
          const lat = parseFloat(latStr);
          const lon = parseFloat(lonStr);
          if (!isNaN(lat) && !isNaN(lon)) {
            await getWeatherByLocation(lat, lon);
            return;
          }
        }
      } catch {
        // ignore
      }

      const savedCity = getCookie("last_city");
      if (savedCity && typeof savedCity === "string") {
        setCity(savedCity);
        await fetchWeatherData(savedCity);
      }
    };

    void loadInitial();
  }, [fetchWeatherData, getWeatherByLocation]);

  return {
    city,
    setCity,
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeatherData,
    getWeatherByLocation,
    getWeatherTip,
    getFilteredForecast,
    getSevenDayForecast, // Nu korrekt tillgänglig för din Page-komponent!
    API_ICON_URL,
  };
}
