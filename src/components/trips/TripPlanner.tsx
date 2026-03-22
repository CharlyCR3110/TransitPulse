"use client";

import { useState } from "react";
import type { Trip } from "@/types/transit";
import { planTrip } from "@/services/trips.service";
import TripCard from "@/components/trips/TripCard";
import EmptyState from "@/components/ui/EmptyState";
import { useT } from "@/lib/i18n-client";

// Uses the trips service to plan trips (currently backed by mock data)

export default function TripPlanner() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [results, setResults] = useState<Trip[] | null>(null);
  const t = useT();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    (async () => {
      const res = await planTrip(origin, destination);
      setResults(res);
    })();
  }

  function handleSwap() {
    setOrigin(destination);
    setDestination(origin);
    setResults(null);
  }

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSearch} className="space-y-3" noValidate>
        <div className="relative">
          <label htmlFor="origin" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
            {t("trips.planner.from")}
          </label>
          <input
            id="origin"
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder={t("trips.planner.placeholders.origin")}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px]"
          // TODO: Add autocomplete from stops API
          />
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 active:scale-95 transition-transform min-h-[44px] min-w-[44px]"
            aria-label="Swap origin and destination"
          >
            ⇅
          </button>
        </div>

        <div>
          <label htmlFor="destination" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
            {t("trips.planner.to")}
          </label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder={t("trips.planner.placeholders.destination")}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px]"
          // TODO: Add autocomplete from stops API
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl py-4 text-base min-h-[52px] transition-colors active:scale-[0.98]"
          disabled={!origin.trim() || !destination.trim()}
        >
          {t("trips.planner.search")}
        </button>
      </form>

      {/* Results */}
      {results !== null && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            {results.length > 0 ? `${results.length} option${results.length > 1 ? "s" : ""} found` : t("trips.planner.noResults")}
          </h2>
          {results.length === 0 ? (
            <EmptyState
              icon="🗺️"
              title={t("trips.planner.noResults")}
              description={t("trips.planner.noResultsDescription")}
            />
          ) : (
            <div className="space-y-3">
              {results.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
