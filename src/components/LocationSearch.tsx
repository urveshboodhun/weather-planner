import { useState } from "react";

export default function LocationSearch({
  onLocation,
}: {
  onLocation: (lat: number, lon: number, name: string) => void;
}) {
  const [query, setQuery] = useState("");

  const searchLocation = async () => {
    if (!query.trim()) return;

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=10&language=en&format=json`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      alert("Location not found.");
      return;
    }

    // Prefer Canadian results when searching Vancouver
    const best =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.results.find((x: any) => x.country_code === "CA") ||
      data.results[0];

    onLocation(best.latitude, best.longitude, best.name);
  };

  return (
    <div className="flex gap-2 items-center w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Enter city…"
        className="border p-2 rounded w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={searchLocation}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}



