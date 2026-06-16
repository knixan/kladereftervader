import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie } from "cookies-next";
import { WeatherData, ForecastData } from "@/types/weather.d";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5";
const API_ICON_URL = "https://openweathermap.org/img/wn/";

export interface WeatherTip {
  text: string;
  imagePath: string;
  color: string;
  clothes: string[]; // Innehåller nycklar för vilka ikoner som ska visas
}

const getWeatherTip = (
  weatherId: number,
  temperature: number,
  windSpeed: number
): WeatherTip => {

  // ÅSKA
  if (weatherId >= 200 && weatherId <= 232)
    return {
      text: "Det åskar. Gå in nu.",
      imagePath: "/klader/åska.png",
      color: "#64748b",
      clothes: ["jacka", "byxor", "skor"],
    };

  // STORM
  if (windSpeed >= 24) {
    if (temperature <= 5)
      return {
        text: "Mycket vind och kallt. Ta på varma kläder.",
        imagePath: "/klader/snöstorm.png",
        color: "#3b82f6",
        clothes: ["jacka", "termobyxor", "mossa", "vantar", "vinterskor"],
      };

    return {
      text: "Mycket vind ute. Stanna inne om du vill.",
      imagePath: "/klader/storm.png",
      color: "#475569",
      clothes: ["jacka", "byxor", "skor"],
    };
  }

  // SNÖ
  if (weatherId >= 600 && weatherId <= 622)
    return {
      text: "Det snöar. Ta på tjock jacka, mössa och vantar.",
      imagePath: temperature <= -3 ? "/klader/superkallt.png" : "/klader/kallt.png",
      color: temperature <= -3 ? "#2563eb" : "#60a5fa",
      clothes: ["jacka", "termobyxor", "mossa", "vantar", "vinterskor"],
    };

  // SNÖBLANDAT REGN / SLASK
  if (weatherId >= 611 && weatherId <= 613)
    return {
      text: "Det är blött och kallt. Ta på regnkläder.",
      imagePath: "/klader/regn.png",
      color: "#3b82f6",
      clothes: ["jacka", "termobyxor", "vantar", "vinterskor", "paraply"],
    };

  // REGN
  if ((weatherId >= 300 && weatherId <= 321) || (weatherId >= 500 && weatherId <= 531)) {
    if (temperature <= 10)
      return {
        text: "Det regnar och är kallt. Ta på regnkläder.",
        imagePath: "/klader/regn.png",
        color: "#3b82f6",
        clothes: ["jacka", "termobyxor", "vantar", "vinterskor", "paraply"],
      };

    return {
      text: "Det regnar. Ta på regnkläder eller ta paraply.",
      imagePath: "/klader/regn.png",
      color: "#60a5fa",
      clothes: ["jacka", "byxor", "skor", "paraply"],
    };
  }

  // DIMMA
  if (weatherId >= 701 && weatherId <= 781) {
    return {
      text: "Det är dimma. Svårt att se.",
      imagePath: "/klader/kallt.png",
      color: "#475569",
      clothes: ["jacka", "byxor", "skor"],
    };
  }

  // TEMPERATURBASERADE RÅD
  if (temperature <= -3)
    return {
      text: "Superkallt! Ta på tjock jacka, mössa, vantar och varma byxor.",
      imagePath: "/klader/superkallt.png",
      color: "#2563eb",
      clothes: ["jacka", "langkalsonger", "termobyxor", "mossa", "vantar", "vinterskor"],
    };

  if (temperature <= 4)
    return {
      text: "Kallt ute. Ta på jacka, byxor och mössa.",
      imagePath: "/klader/kallt.png",
      color: "#60a5fa",
      clothes: ["jacka", "byxor", "mossa", "skor"],
    };

  if (temperature <= 10)
    return {
      text: "Lite kallt. Ta på jacka, byxor, mössa och tunna vantar.",
      imagePath: "/klader/kyligt.png",
      color: "#0d9488",
      clothes: ["jacka", "byxor", "mossa", "tunnavantar", "skor"],
    };

  if (temperature <= 16)
    return {
      text: "Svalt ute. Ta på dig en tjock tröja eller tunn jacka.",
      imagePath: "/klader/svalt.png",
      color: "#16a34a",
      clothes: ["jacka", "byxor", "skor"],
    };

  if (temperature <= 18)
    return {
      text: "Skönt ute. Du kan ha tröja och vanliga byxor.",
      imagePath: "/klader/jummet.png",
      color: "#facc15",
      clothes: ["tshirt", "byxor", "skor"],
    };

  if (temperature <= 22)
    return {
      text: "Varmt ute. Ta på t-shirt och shorts.",
      imagePath: "/klader/varmt.png",
      color: "#ea580c",
      clothes: ["tshirt", "shorts", "skor", "keps"],
    };

  return {
    text: "Mycket varmt! Ta på t-shirt och shorts. Drick vatten.",
    imagePath: "/klader/supervarmt.png",
    color: "#dc2626",
    clothes: ["linne", "shorts", "tofflor", "keps", "vatten", "solkram"],
  };
};

export default function useWeather() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (searchCity: string) => {
    if (!searchCity || !API_KEY) {
      setError("Skriv en stad och prova igen.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const currentWeatherResponse = await fetch(
        `${API_URL}/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=sv`
      );
      if (!currentWeatherResponse.ok) {
        throw new Error("Staden hittades inte, kontrollera stavningen!");
      }
      const currentData: WeatherData = await currentWeatherResponse.json();

      const forecastResponse = await fetch(
        `${API_URL}/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${API_KEY}&units=metric&lang=sv`
      );
      if (!forecastResponse.ok) {
        throw new Error("Kunde inte hämta prognosdata.");
      }
      const forecastData: ForecastData = await forecastResponse.json();

      setWeatherData(currentData);
      setForecastData(forecastData);
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
          `${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=sv`
        );
        if (!currentWeatherResponse.ok) {
          throw new Error("Kunde inte hämta väder för din plats.");
        }
        const currentData: WeatherData = await currentWeatherResponse.json();

        const forecastResponse = await fetch(
          `${API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=sv`
        );
        if (!forecastResponse.ok) {
          throw new Error("Kunde inte hämta prognosdata för din plats.");
        }
        const forecastData: ForecastData = await forecastResponse.json();

        setWeatherData(currentData);
        setForecastData(forecastData);
        setCity(currentData.name || "");
        setCookie("last_city", currentData.name || "", { maxAge: 60 * 60 * 24 * 30 });
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
    []
  );

  const getFilteredForecast = useCallback(() => {
    if (!forecastData) return null;
    return forecastData.list.slice(0, 4);
  }, [forecastData]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as typeof window & { __mammasvaderInitialLoadDone?: boolean };
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
    API_ICON_URL,
  };
}