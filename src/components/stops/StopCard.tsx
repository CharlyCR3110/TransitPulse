"use client";
import type { Stop } from "@/types/transit";
import RouteChip from "@/components/ui/RouteChip";
import { Accessibility } from "lucide-react";
import { formatDistance } from "@/lib/utils";
import Link from "next/link";
import { useT } from "@/lib/i18n-client";

interface StopCardProps {
  stop: Stop;
}

export default function StopCard({ stop }: StopCardProps) {
  const t = useT();
  return (
    <Link
      href={`/routes?stop=${stop.id}`}
      className="block bg-white dark:bg-slate-800 rounded-2xl px-4 py-3.5 shadow-sm border border-slate-100 dark:border-slate-700 active:scale-[0.98] transition-transform"
      aria-label={`${stop.name}${stop.distanceMeters ? `, ${formatDistance(stop.distanceMeters)} ${t("labels.away")}` : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        {/* Stop info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
              {stop.name}
            </span>
            {stop.accessible && (
              <span className="text-sm" aria-label={t("stops.accessible")} title={t("stops.accessible")}>
                <Accessibility className="h-4 w-4 inline" />
              </span>
            )}
          </div>
          {stop.code && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t("stops.stopPrefix")} {stop.code}</p>
          )}

          {/* Routes at this stop */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {stop.routes.map((route) => (
              <RouteChip key={route.id} route={route} size="sm" />
            ))}
          </div>
        </div>

        {/* Distance */}
        {stop.distanceMeters !== undefined && (
          <div className="flex-shrink-0 text-right">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {formatDistance(stop.distanceMeters)}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">away</p>
          </div>
        )}
      </div>
    </Link>
  );
}
