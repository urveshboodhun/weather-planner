import { useState } from "react";
import LocationSearch from "./components/LocationSearch";
import WeatherFetcher from "./components/WeatherFetcher";

export default function App() {
  const [coords, setCoords] = useState<{lat: number; lon: number; name: string} | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <div className="max-w-xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 drop-shadow">
          BC Adventure Weather Planner
        </h1>
        <p className="text-gray-700 mt-1">
          Search any BC city to get live conditions.
        </p>
      </div>

      <LocationSearch 
        onLocation={(lat, lon, name) => setCoords({ lat, lon, name })}
      />

      {coords && (
        <WeatherFetcher 
          lat={coords.lat}
          lon={coords.lon}
          locationName={coords.name}
        />
      )}
    </div>
  );
}





