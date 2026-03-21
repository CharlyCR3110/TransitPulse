import { MOCK_ALERTS } from "@/data/mock";
import AlertCard from "@/components/alerts/AlertCard";
import EmptyState from "@/components/ui/EmptyState";

export const metadata = {
  title: "Alerts – TransitPulse",
  description: "Service alerts and disruptions",
};

export default function AlertsPage() {
  const activeAlerts = MOCK_ALERTS.filter((a) => a.status === "active");
  const upcomingAlerts = MOCK_ALERTS.filter((a) => a.status === "upcoming");
  const resolvedAlerts = MOCK_ALERTS.filter((a) => a.status === "resolved");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 pt-5 pb-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Alerts</h1>
          {activeAlerts.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeAlerts.length}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Service disruptions and notices
        </p>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Active alerts */}
        <section className="px-4 pt-5" aria-labelledby="active-alerts-heading">
          <h2 id="active-alerts-heading" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            Active Now · {activeAlerts.length}
          </h2>
          {activeAlerts.length === 0 ? (
            <EmptyState
              icon="✅"
              title="No active alerts"
              description="All services are running normally."
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
              Upcoming · {upcomingAlerts.length}
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
              Resolved · {resolvedAlerts.length}
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
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">🔔 Stay updated</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Get push notifications for your saved routes.
              {/* TODO: Wire up to notification permission API + user preferences */}
            </p>
            <button
              className="mt-3 w-full bg-blue-600 text-white font-semibold text-sm rounded-xl py-3 min-h-[44px] active:scale-[0.98] transition-transform"
              // TODO: Implement notification subscription after auth integration
              disabled
            >
              Enable Notifications (coming soon)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
