"use client";

import React from "react";
import type { TransitAlert } from "@/types/transit";
import AlertCard from "@/components/alerts/AlertCard";
import EmptyState from "@/components/ui/EmptyState";
import { useT } from "@/lib/i18n-client";

export default function AlertsClient({ alerts }: { alerts: TransitAlert[] }) {
  const t = useT();

  const activeAlerts = alerts.filter((a) => a.status === "active");
  const upcomingAlerts = alerts.filter((a) => a.status === "upcoming");
  const resolvedAlerts = alerts.filter((a) => a.status === "resolved");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 pt-5 pb-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t("alerts.page.title")}</h1>
          {activeAlerts.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeAlerts.length}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {t("alerts.page.subtitle")}
        </p>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Active alerts */}
        <section className="px-4 pt-5" aria-labelledby="active-alerts-heading">
          <h2 id="active-alerts-heading" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            {t("alerts.activeNow")} · {activeAlerts.length}
          </h2>
          {activeAlerts.length === 0 ? (
            <EmptyState
              icon="check"
              title={t("alerts.noActiveTitle")}
              description={t("alerts.noActiveDescription")}
            />
          ) : (
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          )}
        </section>

        {/* Upcoming alerts */}
        {upcomingAlerts.length > 0 && (
          <section className="px-4 mt-8" aria-labelledby="upcoming-alerts-heading">
            <h2 id="upcoming-alerts-heading" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t("alerts.upcoming")} · {upcomingAlerts.length}
            </h2>
            <div className="space-y-3">
              {upcomingAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </section>
        )}

        {/* Resolved alerts */}
        {resolvedAlerts.length > 0 && (
          <section className="px-4 mt-8" aria-labelledby="resolved-alerts-heading">
            <h2 id="resolved-alerts-heading" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t("alerts.resolved")} · {resolvedAlerts.length}
            </h2>
            <div className="space-y-3 opacity-60">
              {resolvedAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} compact />
              ))}
            </div>
          </section>
        )}

        {/* Notification opt-in placeholder */}
        <div className="px-4 mt-8">
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl px-4 py-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2"><span aria-hidden="true"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg></span>{t("alerts.stayUpdated")}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {t("alerts.page.subtitle")}
              {/* TODO: Wire up to notification permission API + user preferences */}
            </p>
            <button
              className="mt-3 w-full bg-blue-600 text-white font-semibold text-sm rounded-xl py-3 min-h-[44px] active:scale-[0.98] transition-transform"
              // TODO: Implement notification subscription after auth integration
              disabled
            >
              {t("alerts.enableNotifications")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
