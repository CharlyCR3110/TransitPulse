"use client";

import type { TransitAlert } from "@/types/transit";
import { alertSeverityClasses, formatTime, formatRelativeDay } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";
import { useT } from "@/lib/i18n-client";

interface AlertCardProps {
  alert: TransitAlert;
  compact?: boolean;
}


export default function AlertCard({ alert, compact = false }: AlertCardProps) {
  const t = useT();
  const classes = alertSeverityClasses(alert.severity);

  return (
    <div
      className={`rounded-2xl border-l-4 p-4 ${classes.border} ${classes.bg}`}
      role="article"
      aria-label={`Alert: ${alert.title}`}
    >
      {/* Header row */}
      <div className="flex items-start gap-2">
        <span className={`text-lg flex-shrink-0 mt-0.5 ${classes.icon}`} aria-hidden="true">
          {alert.severity === "critical" ? (
            <AlertTriangle size={18} />
          ) : alert.severity === "warning" ? (
            <AlertTriangle size={18} />
          ) : (
            <Info size={18} />
          )}
        </span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold leading-tight ${classes.text}`}>{alert.title}</p>
          {!compact && (
            <p className={`text-sm mt-1 leading-relaxed ${classes.text} opacity-90`}>
              {alert.body}
            </p>
          )}
        </div>
        {/* Status pill */}
        <StatusPill status={alert.status} t={t} />
      </div>

      {/* Affected routes */}
      {alert.affectedRoutes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {alert.affectedRoutes.map((r) => (
            <span
              key={r.id}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold"
              style={{ backgroundColor: `#${r.color}`, color: `#${r.textColor}` }}
            >
              {r.shortName}
            </span>
          ))}
        </div>
      )}

      {/* Time range */}
      <p className={`text-xs mt-2 opacity-70 ${classes.text}`}>
        {formatRelativeDay(alert.startTime)} · {formatTime(alert.startTime)}
        {alert.endTime && ` - ${formatTime(alert.endTime)}`}
      </p>
    </div>
  );
}

function StatusPill({ status, t }: { status: TransitAlert["status"]; t: (k: string) => string }) {
  if (status === "resolved") return null;
  return (
    <span
      className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${status === "active"
        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
        : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
        }`}
    >
      {status === "active" ? t("alerts.status.active") : t("alerts.status.upcoming")}
    </span>
  );
}
