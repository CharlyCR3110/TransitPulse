import TripPlanner from "@/components/trips/TripPlanner";
import { MOCK_ROUTES, MOCK_STOPS } from "@/data/mock";
import RouteChip from "@/components/ui/RouteChip";
import StopCard from "@/components/stops/StopCard";

export const metadata = {
  title: "Routes – TransitPulse",
  description: "Plan your trip and browse transit routes",
};

export default function RoutesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 pt-5 pb-4 sticky top-0 z-40">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Trip Planner</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Find your fastest route
        </p>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Trip planner form + results */}
        <section className="px-4 pt-5">
          <TripPlanner />
        </section>

        {/* All routes */}
        <section className="px-4 mt-8" aria-labelledby="all-routes-heading">
          <h2 id="all-routes-heading" className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">
            All Routes
          </h2>
          <div className="space-y-2.5">
            {MOCK_ROUTES.map((route) => (
              <div
                key={route.id}
                className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-3.5 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3"
              >
                <RouteChip route={route} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                    {route.longName}
                  </p>
                  {route.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {route.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All stops */}
        <section className="px-4 mt-8" aria-labelledby="all-stops-heading">
          <h2 id="all-stops-heading" className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">
            All Stops
          </h2>
          {/* TODO: Add map view (Mapbox / Google Maps) here */}
          <div className="space-y-2.5">
            {MOCK_STOPS.map((stop) => (
              <StopCard key={stop.id} stop={stop} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
