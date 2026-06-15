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
}

const getWeatherTip = (
weatherId: number,
temperature: number,
windSpeed: number
): WeatherTip => {

// ÅSKA
if (weatherId >= 200 && weatherId <= 232)
return {
text: "Det åskar. Gå inomhus om du kan.",
imagePath: "/klader/åska.png",
color: "#64748b", // Gråblå
};

// STORM
if (windSpeed >= 24) {
if (temperature <= 5)
return {
text: "Det stormar. Ta på dig varma kläder.",
imagePath: "/klader/snöstorm.png",
color: "#3b82f6",
};


return {
  text: "Det stormar ute. Var försiktig.",
  imagePath: "/klader/storm.png",
  color: "#475569",
};


}

// SNÖ
if (weatherId >= 600 && weatherId <= 622)
return {
text:
temperature <= -3
? "Det snöar. Ta på dig vinterjacka, mössa och vantar."
: "Det snöar. Ta på dig varma kläder.",
imagePath:
temperature <= -3
? "/klader/superkallt.png"
: "/klader/kallt.png",
color: temperature <= -3 ? "#2563eb" : "#60a5fa",
};

// SNÖBLANDAT REGN / SLASK
if (weatherId >= 611 && weatherId <= 613)
return {
text: "Det är blött ute. Ta på dig fleecefodrat regnställ.",
imagePath: "/klader/regn.png",
color: "#3b82f6",
};

// REGN
if (
(weatherId >= 300 && weatherId <= 321) ||
(weatherId >= 500 && weatherId <= 531)
) {
if (temperature <= 10)
return {
text: "Det regnar. Ta på dig fleecefodrat regnställ.",
imagePath: "/klader/regn.png",
color: "#3b82f6",
};


return {
  text: "Det regnar. Ta på dig regnkläder.",
  imagePath: "/klader/regn.png",
  color: "#60a5fa",
};


}

// DIMMA
if (weatherId >= 701 && weatherId <= 781) {
if (temperature <= -3)
return {
text: "Det är dimmigt ute.",
imagePath: "/klader/superkallt.png",
color: "#2563eb",
};

if (temperature <= 4)
  return {
    text: "Det är dimmigt ute.",
    imagePath: "/klader/kallt.png",
    color: "#60a5fa",
  };

if (temperature <= 10)
  return {
    text: "Det är dimmigt ute.",
    imagePath: "/klader/kyligt.png",
    color: "#0d9488",
  };

if (temperature <= 16)
  return {
    text: "Det är dimmigt ute.",
    imagePath: "/klader/svalt.png",
    color: "#16a34a",
  };

if (temperature <= 18)
  return {
    text: "Det är dimmigt ute.",
    imagePath: "/klader/jummet.png",
    color: "#facc15",
  };

if (temperature <= 22)
  return {
    text: "Det är dimmigt ute.",
    imagePath: "/klader/varmt.png",
    color: "#ea580c",
  };

return {
  text: "Det är dimmigt ute.",
  imagePath: "/klader/supervarmt.png",
  color: "#dc2626",
};


}

// TEMPERATURBASERADE RÅD

if (temperature <= -3)
return {
text: "Mycket kallt. Ta på dig vinterjacka, mössa och vantar.",
imagePath: "/klader/superkallt.png",
color: "#2563eb", // Blå
};

if (temperature <= 4)
return {
text: "Kallt ute. Ta på dig jacka och mössa.",
imagePath: "/klader/kallt.png",
color: "#60a5fa", // Ljusblå
};

if (temperature <= 10)
return {
text: "Lite kyligt. Ta på dig vår- eller höstjacka, byxor, mössa och fingervantar.",
imagePath: "/klader/kyligt.png",
color: "#0d9488", // Turkos
};

if (temperature <= 16)
return {
text: "Lite svalt. En tröja räcker.",
imagePath: "/klader/svalt.png",
color: "#16a34a", // Grön
};

if (temperature <= 18)
return {
text: "Skönt ute. T-shirt och byxor passar bra.",
imagePath: "/klader/jummet.png",
color: "#facc15", // Gul
};

if (temperature <= 22)
return {
text: "Varmt ute. T-shirt och shorts passar bra.",
imagePath: "/klader/varmt.png",
color: "#ea580c", // Orange
};

return {
text: "Mycket varmt ute. Ta med vatten.",
imagePath: "/klader/supervarmt.png",
color: "#dc2626", // Röd
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
      setError(
        "Du stavade antagligen fel prova igen. Skriv inna mellanslag efter en ort."
      );
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
    if (!forecastData) {
      return null;
    }
    // `list` är en array med prognoser i 3-timmarsintervall
    const forecastList = forecastData.list;
    // Här filtrerar vi ut de fyra första prognoserna
    return forecastList.slice(0, 4);
  }, [forecastData]);

  useEffect(() => {
    // In Next/React dev körs effekter ibland två gånger (StrictMode) -> kan ge "blink".
    // Vi använder en window-scope flagga som resetas vid reload men överlever remount.
    if (typeof window === "undefined") return;
    const w = window as typeof window & { __mammasvaderInitialLoadDone?: boolean };
    if (w.__mammasvaderInitialLoadDone) return;
    w.__mammasvaderInitialLoadDone = true;

    const loadInitial = async () => {
      // 1) Om vi har sparad position och användaren inte tidigare nekat -> använd den.
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

      // 2) Fallback: senaste stad (cookie)
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
