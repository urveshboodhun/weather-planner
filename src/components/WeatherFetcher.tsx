import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  wind: number;
  rain: number;
  condition: string;
}

export default function WeatherFetcher({
  lat,
  lon,
  locationName,
}: {
  lat: number;
  lon: number;
  locationName: string;
}) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      setLoading(true);

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code,precipitation`;

      const res = await fetch(url);
      const data = await res.json();

      const w = data.current;

      const mapped: WeatherData = {
        temperature: w.temperature_2m,
        wind: w.wind_speed_10m,
        rain: w.precipitation,
        condition: mapWeatherCode(w.weather_code),
      };

      setWeather(mapped);
      setLoading(false);
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) {
    return <div className="text-center mt-4 text-gray-600">Loading weather…</div>;
  }

  if (!weather) return null;

return (
  <div className="mt-6 bg-white rounded-xl shadow-lg p-6 max-w-xl mx-auto">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
      Weather in {locationName}
    </h2>

    <div className="grid grid-cols-2 gap-4 text-gray-700">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌡️</span>
        <span>{weather.temperature}°C</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-2xl">💨</span>
        <span>{weather.wind} km/h</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-2xl">🌧️</span>
        <span>{weather.rain} mm</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-2xl">☁️</span>
        <span>{weather.condition}</span>
      </div>
    </div>
  </div>
);

}

function mapWeatherCode(code: number): string {
  const map: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    61: "Rain",
    80: "Rain showers",
    95: "Thunderstorm",
  };

  return map[code] || "Unknown conditions";
}
