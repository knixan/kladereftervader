import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie } from "cookies-next";
import { WeatherData, ForecastData, WeatherTip } from "@/types/weather.d";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5";
const API_ICON_URL = "https://openweathermap.org/img/wn/";

const getWeatherTip = (
  weatherId: number,
  temperature: number,
  windSpeed: number
): WeatherTip => {

  // --- STORM ---
  if (windSpeed >= 24)
    return {
      text: "⛔ STANNA INNE! Det stormar ute. Det är farligt. 🌪️",
      emoji: "🌪️",
    };

  // --- ÅSKA ---
  if (weatherId >= 200 && weatherId <= 232)
    return {
      text: "⚡ ÅSKA! Gå INTE ut om du kan. Om du måste gå ut: Regnkläder 🧥 och gummistövlar 🥾. INGET paraply. BADA INTE. Blixten är farlig!",
      emoji: "⚡",
    };

  // --- SNÖ ---
  if (weatherId >= 600 && weatherId <= 602) {
    if (temperature <= -20)
      return {
        text: "🥶 MYCKET KALLT och snö! Ta på dig: Tjocka underställ 👕 + ylletröja 🧥 + vinterjacka 🧥 + ylle- eller fleecebuksa 👖 + tjocka yllestrumpor 🧦 + vinterstövlar 🥾 + lång mössa 🧢 + tjocka vantar 🧤 + halsduk 🧣. Täck näsa och kinder!",
        emoji: "🥶",
      };
    if (temperature <= -10)
      return {
        text: "🥶 Kallt och snö! Ta på dig: Underställ 👕 + vinterjacka 🧥 + fleecebuksa 👖 + tjocka strumpor 🧦 + vinterstövlar 🥾 + mössa 🧢 + vantar 🧤 + halsduk 🧣.",
        emoji: "🥶",
      };
    return {
      text: "❄️ Snö ute! Ta på dig: Vinterjacka 🧥 + varma byxor 👖 + tjocka strumpor 🧦 + vinterstövlar 🥾 + mössa 🧢 + vantar 🧤.",
      emoji: "❄️",
    };
  }

  // --- SNÖBLANDAT REGN / KALL SLASK ---
  if (weatherId >= 611 && weatherId <= 613)
    return {
      text: "🌨️ Blött och kallt! Ta på dig: Underställ 👕 + vattentät regnjacka 🧥 + regnbyxor 👖 + gummistövlar 🥾 + mössa 🧢 + vantar 🧤.",
      emoji: "🌨️",
    };

  // --- REGN / DUGGREGN / DUSCHREGN ---
  if (
    (weatherId >= 300 && weatherId <= 321) ||
    (weatherId >= 500 && weatherId <= 531)
  ) {
    if (weatherId >= 502 && weatherId <= 531)
      return {
        text: "🌧️ Kraftigt regn! Ta på dig: Regnjacka 🧥 + regnbyxor 👖 + gummistövlar 🥾. Du blir blöt om du inte har allt på dig!",
        emoji: "🌧️",
      };
    return {
      text: "🌧️ Det regnar! Ta på dig: Regnjacka 🧥 + gummistövlar 🥾. Ta med ett paraply ☂️ om du vill.",
      emoji: "🌧️",
    };
  }

  // --- DIMMA ---
  if (weatherId >= 701 && weatherId <= 781)
    return {
      text: "🌫️ Det är dimmigt. Klä dig efter temperaturen. Gå nära vuxna när du är ute, det är svårt att se!",
      emoji: "🌫️",
    };

  // --- KLART ELLER MOLNIGT: TEMPERATURBASERADE RÅD ---

  // Extremt kallt: -40 till -25
  if (temperature <= -25)
    return {
      text: "🥶🥶 EXTREMT KALLT! Stanna helst inne. Om du måste gå ut: Tjocka underställ (byxa + tröja) 👕 + ylletröja 🧶 + tjock vinterjacka 🧥 + tjocka yllebyxor 👖 + två par strumpor 🧦 + varma vinterstövlar 🥾 + lång mössa som täcker öronen 🧢 + tjocka vantar (två par om du har) 🧤 + halsduk som täcker näsa och mun 🧣. Täck ALL hud!",
      emoji: "🥶",
    };

  // Mycket kallt: -25 till -15
  if (temperature <= -15)
    return {
      text: "🥶 MYCKET KALLT! Ta på dig: Underställ (byxa + tröja) 👕 + tjock vinterjacka 🧥 + varma byxor 👖 + tjocka strumpor 🧦 + vinterstövlar 🥾 + mössa som täcker öronen 🧢 + tjocka vantar 🧤 + halsduk 🧣.",
      emoji: "🥶",
    };

  // Kallt: -15 till -5
  if (temperature <= -5)
    return {
      text: "🧊 Kallt ute! Ta på dig: Underställ 👕 + vinterjacka 🧥 + varma byxor 👖 + tjocka strumpor 🧦 + vinterstövlar 🥾 + mössa 🧢 + vantar 🧤.",
      emoji: "🧊",
    };

  // Kyligt: -5 till 0
  if (temperature <= 0)
    return {
      text: "🌡️ Nära nollan. Ta på dig: Mellanjacka eller vinterjacka 🧥 + tjocka byxor 👖 + strumpor 🧦 + kängor eller stövlar 🥾 + mössa 🧢 + vantar 🧤.",
      emoji: "🌡️",
    };

  // Lite kallt: 0 till 5
  if (temperature <= 5)
    return {
      text: "🍂 Lite kallt! Ta på dig: Tjock jacka 🧥 + vanliga byxor 👖 + strumpor 🧦 + skor eller stövlar 👟 + mössa 🧢 + vantar 🧤.",
      emoji: "🍂",
    };

  // Svalt: 5 till 10
  if (temperature <= 10)
    return {
      text: "🌤️ Svalt ute. Ta på dig: Jacka 🧥 + vanliga byxor 👖 + strumpor 🧦 + skor 👟. En tunn mössa eller luva kan vara skönt 🧢.",
      emoji: "🌤️",
    };

  // Milt: 10 till 15
  if (temperature <= 15)
    return {
      text: "😊 Lite svalt. Ta på dig: En tunn jacka eller tjocktröja 🧥 + vanliga byxor 👖 + skor 👟.",
      emoji: "😊",
    };

  // Lagom varmt: 15 till 20
  if (temperature <= 20)
    return {
      text: "😊 Lagom varmt! Ta på dig: En tröja 👕 + vanliga byxor 👖 + skor 👟. Ta med en tunn jacka 🧥 om du känner dig kall.",
      emoji: "😊",
    };

  // Varmt: 20 till 25
  if (temperature <= 25)
    return {
      text: "☀️ Varmt ute! Ta på dig: T-shirt 👕 + shorts eller tunna byxor 🩳 + sandaler eller skor 👟 + keps eller solhatt 🧢. Kom ihåg att dricka vatten! 💧",
      emoji: "☀️",
    };

  // Mycket varmt: 25 till 30
  if (temperature <= 30)
    return {
      text: "🌞 VARMT! Ta på dig: T-shirt 👕 + shorts 🩳 + sandaler 👡 + solhatt 🧢. Smörj in dig med solkräm 🧴. Drick MYCKET vatten! 💧",
      emoji: "🌞",
    };

  // Extremt varmt: över 30
  return {
    text: "🔥 JÄTTEVARMT! Ta på dig: Tunnaste t-shirt 👕 + shorts 🩳 + sandaler 👡 + solhatt 🧢. Smörj in dig med solkräm 🧴. Drick vatten HELA TIDEN 💧. Sök skugga och var inte ute i solen för länge!",
    emoji: "🔥",
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
    const savedCity = getCookie("last_city");
    if (savedCity && typeof savedCity === "string") {
      setCity(savedCity);
      fetchWeatherData(savedCity);
    }
  }, [fetchWeatherData]);

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
