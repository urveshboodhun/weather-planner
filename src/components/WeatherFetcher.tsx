import { useEffect, useState } from "react";

export default function WeatherFetcher({
  lat,
  lon,
  name,
}: {
  lat: number;
  lon: number;
  name: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data.current_weather);
    }
    load();
  }, [lat, lon]);

  if (!weather) return <p className="text-center">Loading weather…</p>;

  return (
    <div className="p-4 bg-white rounded shadow text-center space-y-2">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-4xl font-bold">{weather.temperature}°C</p>
      <p className="text-gray-600">Wind: {weather.windspeed} km/h</p>
    </div>
  );
}
