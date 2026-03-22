"use client";

import React from "react";
import type { UserProfile } from "@/types/transit";
import RouteChip from "@/components/ui/RouteChip";
import StopCard from "@/components/stops/StopCard";
import { Bus, User, Lock, Accessibility, Bell, Globe } from "lucide-react";
import { useT } from "@/lib/i18n-client";
import LanguageSwitcher from "@/components/profile/LanguageSwitcher";

export default function ProfileClient({ profile }: { profile: UserProfile }) {
  const t = useT();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page header / hero */}
      <header className="bg-blue-600 dark:bg-blue-700 px-4 pt-8 pb-6">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-tight">{profile.displayName}</h1>
            {profile.email ? (
              <p className="text-sm text-blue-100 mt-0.5">{profile.email}</p>
            ) : (
              <p className="text-sm text-blue-200 mt-0.5">{t("profile.notSignedIn")}</p>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 bg-slate-50 dark:bg-slate-950">
        {/* Sign-in CTA */}
        <div className="px-4 pt-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
              <Lock className="h-4 w-4" /> {t("profile.signInTitle")}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t("profile.signInDesc")}
            </p>
            <button
              className="mt-3 w-full bg-blue-600 text-white font-semibold text-sm rounded-xl py-3 min-h-[44px] active:scale-[0.98] transition-transform"
              disabled
            >
              {t("profile.signInButton")}
            </button>
          </div>
        </div>

        {/* Favorite stops */}
        <section className="px-4 mt-6" aria-labelledby="fav-stops-heading">
          <h2 id="fav-stops-heading" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            {t("profile.favoriteStops")}
          </h2>
          {profile.favoriteStops.length === 0 ? (
            <p className="text-sm text-slate-400 px-1">{t("profile.noFavorites")}</p>
          ) : (
            <div className="space-y-2.5">
              {profile.favoriteStops.map(({ stop }) => (
                <div key={stop.id} className="relative">
                  <StopCard stop={stop} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Favorite routes */}
        <section className="px-4 mt-6" aria-labelledby="fav-routes-heading">
          <h2 id="fav-routes-heading" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            {t("profile.favoriteRoutes")}
          </h2>
          {profile.favoriteRoutes.length === 0 ? (
            <p className="text-sm text-slate-400 px-1">{t("profile.noFavorites")}</p>
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
            {t("profile.preferences")}
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm divide-y divide-slate-100 dark:divide-slate-700">
            <PreferenceRow
              label={t("profile.preferenceLabels.accessibleRoutesOnly")}
              value={profile.preferAccessible ? t("profile.on") : t("profile.off")}
              icon={<Accessibility size={18} />}
            />
            <PreferenceRow
              label={t("profile.preferenceLabels.preferredModes")}
              value={profile.preferredModes
                .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
                .join(", ")}
              icon={<Bus size={16} />}
            />
            <PreferenceRow
              label={t("profile.preferenceLabels.notifications")}
              value={profile.notificationsEnabled ? t("profile.on") : t("profile.off")}
              icon={<Bell size={18} />}
            />
            <div className="flex items-center gap-3 px-4 py-3.5 min-h-[52px]">
              <span className="text-lg flex-shrink-0" aria-hidden="true"><Globe size={18} /></span>
              <p className="flex-1 text-sm text-slate-700 dark:text-slate-300">{t("profile.language")}</p>
              <LanguageSwitcher />
            </div>
          </div>
        </section>

        {/* App info */}
        <section className="px-4 mt-8 pb-4">
          <p className="text-center text-xs text-slate-400 dark:text-slate-600">
            TransitPulse MVP · Mock data only · v0.1.0
          </p>
          <p className="text-center text-xs text-slate-300 dark:text-slate-700 mt-1">
            Backend integration coming soon
          </p>
        </section>
      </main>
    </div>
  );
}

function PreferenceRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 min-h-[52px]">
      <span className="text-lg flex-shrink-0" aria-hidden="true">{icon}</span>
      <p className="flex-1 text-sm text-slate-700 dark:text-slate-300">{label}</p>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{value}</p>
    </div>
  );
}
