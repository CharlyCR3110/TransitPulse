import { MOCK_USER_PROFILE } from "@/data/mock";
import RouteChip from "@/components/ui/RouteChip";
import StopCard from "@/components/stops/StopCard";

export const metadata = {
  title: "Profile – TransitPulse",
  description: "Your transit preferences and saved routes",
};

export default function ProfilePage() {
  const profile = MOCK_USER_PROFILE;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page header / hero */}
      <header className="bg-blue-600 dark:bg-blue-700 px-4 pt-8 pb-6">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          {/* TODO: Replace with real user avatar once auth is integrated */}
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">
            👤
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-tight">{profile.displayName}</h1>
            {profile.email ? (
              <p className="text-sm text-blue-100 mt-0.5">{profile.email}</p>
            ) : (
              <p className="text-sm text-blue-200 mt-0.5">
                {/* TODO: Show email after sign-in */}
                Not signed in
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 bg-slate-50 dark:bg-slate-950">
        {/* Sign-in CTA */}
        <div className="px-4 pt-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              🔐 Sign in to sync your preferences
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Save favorites, get personalized alerts, and track your trips across devices.
            </p>
            {/* TODO: Implement authentication (OAuth, magic link, etc.) */}
            <button
              className="mt-3 w-full bg-blue-600 text-white font-semibold text-sm rounded-xl py-3 min-h-[44px] active:scale-[0.98] transition-transform"
              disabled
            >
              Sign In (coming soon)
            </button>
          </div>
        </div>

        {/* Favorite stops */}
        <section className="px-4 mt-6" aria-labelledby="fav-stops-heading">
          <h2 id="fav-stops-heading" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            Favorite Stops
          </h2>
          {profile.favoriteStops.length === 0 ? (
            <p className="text-sm text-slate-400 px-1">No favorites yet.</p>
          ) : (
            <div className="space-y-2.5">
              {profile.favoriteStops.map(({ stop, alias }) => (
                <div key={stop.id} className="relative">
                  {alias && (
                    <span className="absolute top-3 right-4 text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                      {alias}
                    </span>
                  )}
                  <StopCard stop={stop} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Favorite routes */}
        <section className="px-4 mt-6" aria-labelledby="fav-routes-heading">
          <h2 id="fav-routes-heading" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            Favorite Routes
          </h2>
          {profile.favoriteRoutes.length === 0 ? (
            <p className="text-sm text-slate-400 px-1">No favorites yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.favoriteRoutes.map(({ route }) => (
                <div
                  key={route.id}
                  className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl px-3 py-2.5 shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <RouteChip route={route} />
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {route.longName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Preferences */}
        <section className="px-4 mt-6" aria-labelledby="prefs-heading">
          <h2 id="prefs-heading" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            Preferences
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm divide-y divide-slate-100 dark:divide-slate-700">
            <PreferenceRow
              label="Accessible routes only"
              value={profile.preferAccessible ? "On" : "Off"}
              icon="♿"
            />
            <PreferenceRow
              label="Preferred modes"
              value={profile.preferredModes
                .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
                .join(", ")}
              icon="🚌"
            />
            <PreferenceRow
              label="Notifications"
              value={profile.notificationsEnabled ? "On" : "Off"}
              icon="🔔"
              // TODO: Wire to notification preferences API
            />
          </div>
        </section>

        {/* App info */}
        <section className="px-4 mt-8 pb-4">
          <p className="text-center text-xs text-slate-400 dark:text-slate-600">
            TransitPulse MVP · Mock data only · v0.1.0
          </p>
          <p className="text-center text-xs text-slate-300 dark:text-slate-700 mt-1">
            {/* TODO: Add real version from package.json via build config */}
            Backend integration coming soon
          </p>
        </section>
      </main>
    </div>
  );
}

// ─── Preference row ──────────────────────────────────────────────────────────

function PreferenceRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 min-h-[52px]">
      <span className="text-lg flex-shrink-0" aria-hidden="true">{icon}</span>
      <p className="flex-1 text-sm text-slate-700 dark:text-slate-300">{label}</p>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{value}</p>
    </div>
  );
}
