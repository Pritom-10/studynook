"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

const AMENITIES = [
  "WiFi",
  "TV Screen",
  "AC",
  "Coffee Machine",
  "Whiteboard",
  "Projector",
];

const RefineSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedAmenities, setSelectedAmenities] = useState(
    searchParams.get("amenities")
      ? searchParams.get("amenities").split(",")
      : [],
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // ✅ search real-time
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`/all_rooms?${params.toString()}`);
  };

  // ✅ amenities real-time
  const toggleAmenity = (amenity) => {
    const updated = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(updated);
    const params = new URLSearchParams(searchParams.toString());
    if (updated.length > 0) {
      params.set("amenities", updated.join(","));
    } else {
      params.delete("amenities");
    }
    router.push(`/all_rooms?${params.toString()}`);
  };

  // ✅ price real-time
  const handlePriceChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "min") {
      setMinPrice(value);
      if (value) params.set("minPrice", value);
      else params.delete("minPrice");
    } else {
      setMaxPrice(value);
      if (value) params.set("maxPrice", value);
      else params.delete("maxPrice");
    }
    router.push(`/all_rooms?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setSelectedAmenities([]);
    setMinPrice("");
    setMaxPrice("");
    router.push("/all_rooms");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">Refine</h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Search by name
        </label>
        <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-blue-500 transition-colors">
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="e.g. Quiet Pod"
            value={search}
            onChange={handleSearchChange}
            className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent"
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">
          Amenities
        </label>
        <div className="space-y-2">
          {AMENITIES.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-4 h-4 rounded border-slate-300 accent-blue-600"
              />
              <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ✅ Hourly rate ফিরিয়ে আনা হয়েছে */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Hourly rate ($)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 transition-colors"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default RefineSidebar;
