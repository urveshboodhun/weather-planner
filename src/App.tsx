import { useState } from "react";
import LocationSearch from "./components/LocationSearch";
import WeatherFetcher from "./components/WeatherFetcher";

export default function App() {
  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
    name: string;
  } | null>(null);

  const handleLocationSelect = (lat: number, lon: number, name: string) => {
    setCoords({ lat, lon, name });
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Weather Planner</h1>

      <LocationSearch onLocation={handleLocationSelect} />

      {coords && (
        <WeatherFetcher lat={coords.lat} lon={coords.lon} name={coords.name} />
      )}
    </div>
  );
}






