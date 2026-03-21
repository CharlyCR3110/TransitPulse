import { MOCK_ARRIVALS, MOCK_ALERTS, MOCK_STOPS } from "@/data/mock";
import AlertBanner from "@/components/alerts/AlertBanner";
import ArrivalCard from "@/components/arrivals/ArrivalCard";
import StopCard from "@/components/stops/StopCard";
import Link from "next/link";

export default function HomePage() {
  // TODO: Replace with user's current location + real-time arrivals API
  // GET /api/stops/nearby?lat=&lon=&radius=500
  // GET /api/stops/:id/arrivals?limit=5
  const upcomingArrivals = MOCK_ARRIVALS.slice(0, 4);
  const activeAlerts = MOCK_ALERTS.filter((a) => a.status === "active");
  const nearbyStops = MOCK_STOPS.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Alert banner – always at the very top if there are active alerts */}
      <AlertBanner alerts={activeAlerts} />

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Greeting */}
        <section className="px-4 pt-5 pb-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Good ride! 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Central Station · {new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
          </p>
        </section>

        {/* Next arrivals */}
        <section className="px-4 mt-5" aria-labelledby="arrivals-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="arrivals-heading" className="text-base font-bold text-slate-800 dark:text-slate-100">
              Next Arrivals
            </h2>
            <span className="text-xs text-slate-400 dark:text-slate-500">Central Station</span>
          </div>
          <div className="space-y-2.5">
            {upcomingArrivals.map((arrival) => (
              <ArrivalCard key={arrival.id} arrival={arrival} />
            ))}
          </div>
        </section>

        {/* Active alerts summary */}
        {activeAlerts.length > 0 && (
          <section className="px-4 mt-6" aria-labelledby="alerts-heading">
            <div className="flex items-center justify-between mb-3">
              <h2 id="alerts-heading" className="text-base font-bold text-slate-800 dark:text-slate-100">
                Active Alerts
              </h2>
              <Link
                href="/alerts"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 min-h-[44px] flex items-center"
              >
                See all →
              </Link>
            </div>
            <div className="space-y-2.5">
              {activeAlerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                  <div
                    className={`flex items-start gap-3 px-4 py-3.5 border-l-4 ${
                      alert.severity === "critical"
                        ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                        : alert.severity === "warning"
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                        : "border-blue-400 bg-blue-50 dark:bg-blue-950/30"
                    }`}
                  >
                    <span className="text-lg flex-shrink-0 mt-0.5">
                      {alert.severity === "critical" ? "🚨" : alert.severity === "warning" ? "⚠️" : "ℹ️"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {alert.title}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {alert.body}
                      </p>
                      {alert.affectedRoutes.length > 0 && (
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {alert.affectedRoutes.map((r) => (
                            <span
                              key={r.id}
                              className="px-1.5 py-0.5 rounded text-[11px] font-bold"
                              style={{ backgroundColor: `#${r.color}`, color: `#${r.textColor}` }}
                            >
                              {r.shortName}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {activeAlerts.length > 2 && (
                <Link
                  href="/alerts"
                  className="block text-center py-3 text-sm font-medium text-blue-600 dark:text-blue-400"
                >
                  +{activeAlerts.length - 2} more alerts
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Nearby stops */}
        <section className="px-4 mt-6" aria-labelledby="stops-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="stops-heading" className="text-base font-bold text-slate-800 dark:text-slate-100">
              Nearby Stops
            </h2>
            <Link
              href="/routes"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 min-h-[44px] flex items-center"
            >
              Map →
            </Link>
          </div>
          <div className="space-y-2.5">
            {nearbyStops.map((stop) => (
              <StopCard key={stop.id} stop={stop} />
            ))}
          </div>
        </section>

        {/* Trip planner CTA */}
        <section className="px-4 mt-6">
          <Link
            href="/routes"
            className="flex items-center justify-between bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-2xl px-5 py-4 min-h-[64px] transition-colors active:scale-[0.98]"
            aria-label="Plan a trip"
          >
            <div>
              <p className="font-bold text-base leading-tight">Plan a Trip</p>
              <p className="text-sm text-blue-100 mt-0.5">Find the best route →</p>
            </div>
            <span className="text-3xl" aria-hidden="true">🗺️</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
