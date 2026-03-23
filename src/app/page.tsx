"use client";

import React from "react";
import { getUpcomingArrivals } from "@/services/arrivals.service";
import { getAlerts } from "@/services/alerts.service";
import { getNearbyStops } from "@/services/stops.service";
import AlertBanner from "@/components/alerts/AlertBanner";
import ArrivalCard from "@/components/arrivals/ArrivalCard";
import StopCard from "@/components/stops/StopCard";
import Link from "next/link";
import { Arrival, Stop, TransitAlert } from "@/types/transit";
import { useT } from "@/lib/i18n-client";


export default function HomePage() {
  const t = useT();
  const [temporaryDate, setDate] = React.useState("");

  const [upcomingArrivals, setUpcomingArrivals] = React.useState<Arrival[]>([]);
  const [alerts, setAlerts] = React.useState<TransitAlert[]>([]);
  const [nearbyStops, setNearbyStops] = React.useState<Stop[]>([]);

  const refreshArrivals = React.useCallback(async () => {
    const arr = await getUpcomingArrivals(4);
    setUpcomingArrivals(arr);
  }, []);

  React.useEffect(() => {
    setDate(
      new Date("2026-01-01T00:00:00").toLocaleTimeString("es-CR", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/Costa_Rica",
      })
    );
  }, []);

  React.useEffect(() => {
    (async () => {
      const arr = await getUpcomingArrivals(4);
      const al = await getAlerts();
      const stops = await getNearbyStops();
      setUpcomingArrivals(arr);
      setAlerts(al);
      setNearbyStops(stops.slice(0, 3));
    })();
  }, []);

  const activeAlertCount = alerts.filter((a) => a.status === "active").length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Alert banner - always at the very top if there are active alerts */}
      <AlertBanner alerts={alerts} />

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* 1) Location / Selected stop - top decision */}
        <section className="px-4 pt-5 pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm text-slate-500 dark:text-slate-400">{temporaryDate}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="min-w-0">
                  <p className="text-lg font-bold text-slate-900 dark:text-white truncate">
                    {/* Note: Using Heredia Centro as fallback, but this should not be hardcoded */}
                    {nearbyStops[0]?.name ? `${nearbyStops[0].name} (${t("home.current")})` : "Heredia Centro (Current)"}
                  </p>
                  <div className="mt-0.5">
                    <Link href="/stops" className="text-sm text-blue-600 dark:text-blue-400">{t("home.change")}</Link>
                  </div>
                </div>
              </div>
            </div>
            {/* compact alert summary */}
            {alerts.length > 0 && (
              <Link href="/alerts" className="ml-auto self-start inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:border-amber-700">
                <span className="text-sm">⚠️</span>
                <span className="text-sm font-medium">{activeAlertCount} {activeAlertCount === 1 ? t("home.activeAlert") : t("home.activeAlerts")}</span>
              </Link>
            )}
          </div>
        </section>

        {/* 2) Next arrivals - concise list (2-4) */}
        <section className="px-4 mt-3" aria-labelledby="arrivals-heading">
          <div className="flex items-center justify-between mb-2">
            <h2 id="arrivals-heading" className="text-base font-bold text-slate-800 dark:text-slate-100">
              {t("home.nextArrivals")}
            </h2>
          </div>
          <div className="space-y-2">
            {upcomingArrivals.slice(0, 4).map((arrival) => (
              <ArrivalCard key={arrival.id} arrival={arrival} />
            ))}
            {upcomingArrivals.length === 0 && (
              <p className="text-sm text-slate-500">{t("home.noImminentArrivals")}</p>
            )}
          </div>
        </section>

        {/* 3) Critical / top alerts (show 1-2) */}
        {alerts.length > 0 && (
          <section className="px-4 mt-4" aria-labelledby="alerts-heading">
            <div className="flex items-center justify-between mb-2">
              <h2 id="alerts-heading" className="text-base font-bold text-slate-800 dark:text-slate-100">
                {t("home.importantAlerts")}
              </h2>
              <Link href="/alerts" className="text-sm text-blue-600 dark:text-blue-400">{t("home.seeAll")}</Link>
            </div>
            <div className="space-y-2">
              {alerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="rounded-2xl overflow-hidden">
                  <AlertBanner alerts={[alert]} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4) Quick actions - decisions the user can take next */}
        <section className="px-4 mt-5" aria-label="Quick actions">
          <div className="space-y-3">
            <Link href="/routes" className="block bg-blue-600 text-white rounded-2xl px-4 py-3 text-center font-bold">
              {t("trips.planner.plan")}
            </Link>
          </div>
        </section>

        {/* 5) Nearby stops - short list (3-5) */}
        <section className="px-4 mt-5" aria-labelledby="stops-heading">
          <div className="flex items-center justify-between mb-2">
            <h2 id="stops-heading" className="text-base font-bold text-slate-800 dark:text-slate-100">
              {t("home.nearbyStops")}
            </h2>
            <Link href="/routes" className="text-sm text-blue-600 dark:text-blue-400">{t("home.seeAll")}</Link>
          </div>
          <div className="space-y-2">
            {nearbyStops.slice(0, 3).map((stop) => (
              <StopCard key={stop.id} stop={stop} />
            ))}
            {nearbyStops.length === 0 && (
              <p className="text-sm text-slate-500">{t("home.noNearbyStopsFound")}</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
