"use client";

import { useState, useEffect, useCallback } from "react";

interface LocationButtonProps {
  onLocationFound: (lat: number, lon: number) => void;
  loading?: boolean;
}

export default function LocationButton({ onLocationFound, loading = false }: LocationButtonProps) {
  const [gettingLocation, setGettingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Läs bara in tidigare nekad behörighet (UI-hjälp). Själva auto-laddningen av väder
  // sköts i hooken för att undvika dubbelhämtning och blink i dev (StrictMode).
  useEffect(() => {
    try {
      const deniedBefore = localStorage.getItem("locationDenied") === "true";
      if (deniedBefore) setPermissionDenied(true);
    } catch {
      // ignore
    }
  }, []);

  const handleGetLocation = useCallback(() => {
    setError(null);
    setGettingLocation(true);

    if (!navigator.geolocation) {
      setError("Geolocation stöds inte i din webbläsare.");
      setGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Spara position lokalt
        try {
          localStorage.setItem("lastLocation", `${lat},${lon}`);
          localStorage.removeItem("locationDenied");
        } catch {}

        setGettingLocation(false);
        setPermissionDenied(false);
        onLocationFound(lat, lon);
      },
      (err) => {
        if (err.code === 1) {
          setPermissionDenied(true);
          setError("Åtkomst till plats nekades. Skriv en stad i sökfältet eller aktivera platstjänster.");
          try {
            localStorage.setItem("locationDenied", "true");
          } catch {}
        } else {
          setError(err.message || "Kunde inte hämta position.");
        }
        setGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [onLocationFound]);

  const handleRetry = () => {
    try {
      localStorage.removeItem("locationDenied");
    } catch {}
    setPermissionDenied(false);
    setError(null);
    handleGetLocation();
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleGetLocation}
        disabled={loading || gettingLocation}
        className="text-base sm:text-lg font-extrabold px-7 py-4 sm:py-5 rounded-3xl bg-[#4279b8] text-[#ffffff] shadow-md
                   hover:bg-[#3a6ba3] active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {gettingLocation || loading ? "📍 Hämtar..." : "📍 Min plats"}
      </button>

      {error && (
        <div className="bg-[#cc1622] text-[#ffffff] p-3 rounded-2xl text-sm">
          {error}
        </div>
      )}

      {permissionDenied && (
        <div className="p-4 bg-[#f9fafb] border-2 border-[#9dd5ff] rounded-2xl">
          <p className="text-sm font-bold text-[#1e293b] mb-2">
            Platstjänst inaktiverad
          </p>
          <p className="text-xs text-[#64748b] mb-3">
            Ange en stad i sökfältet eller aktivera behörighet och försök igen.
          </p>
          <button
            onClick={handleRetry}
            className="text-sm font-bold px-4 py-2 rounded-xl bg-[#e8f4fa] text-[#164559] border border-[#c7e2ee]
                       hover:bg-[#d4ebf7] transition"
          >
            Försök igen
          </button>
        </div>
      )}
    </div>
  );
}
