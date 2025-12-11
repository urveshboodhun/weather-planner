import { useState } from "react";

export default function LocationSearch({ onLocation }) {
  const [query, setQuery] = useState("");

  const searchLocation = async () => {
    if (!query.trim()) return;

    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const best = data.results.find((x) => x.country_code === "CA" && x?.admin1 === "British Columbia") || data.results[0];
      onLocation(best.latitude, best.longitude, best.name);
    } else {
      alert("Location not found.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 max-w-xl mx-auto">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search city…"
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchLocation}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
}


