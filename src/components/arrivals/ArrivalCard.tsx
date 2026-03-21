import type { Arrival } from "@/types/transit";
import RouteChip from "@/components/ui/RouteChip";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatMinutesAway, formatTime } from "@/lib/utils";

interface ArrivalCardProps {
  arrival: Arrival;
}

export default function ArrivalCard({ arrival }: ArrivalCardProps) {
  const { route, headsign, minutesAway, status, estimatedTime, platform, occupancy } = arrival;

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-2xl px-4 py-3.5 shadow-sm border border-slate-100 dark:border-slate-700">
      {/* Route chip */}
      <div className="flex-shrink-0">
        <RouteChip route={route} />
      </div>

      {/* Destination + status */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate leading-tight">
          {headsign}
        </p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <StatusBadge status={status} />
          {platform && (
            <span className="text-xs text-slate-400 dark:text-slate-500">· {platform}</span>
          )}
          {occupancy && (
            <OccupancyDots occupancy={occupancy} />
          )}
        </div>
      </div>

      {/* Minutes away – big tap-friendly area */}
      <div className="flex-shrink-0 text-right min-w-[52px]">
        <p
          className={`text-xl font-bold tabular-nums leading-none ${
            minutesAway <= 2
              ? "text-green-600 dark:text-green-400"
              : minutesAway <= 5
              ? "text-amber-600 dark:text-amber-400"
              : "text-slate-800 dark:text-slate-100"
          }`}
        >
          {formatMinutesAway(minutesAway)}
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 tabular-nums">
          {formatTime(estimatedTime)}
        </p>
      </div>
    </div>
  );
}

// ─── Occupancy indicator ─────────────────────────────────────────────────────

function OccupancyDots({ occupancy }: { occupancy: "low" | "medium" | "high" }) {
  const filled = occupancy === "low" ? 1 : occupancy === "medium" ? 2 : 3;
  const colors = occupancy === "low" ? "bg-green-400" : occupancy === "medium" ? "bg-amber-400" : "bg-red-400";
  return (
    <span className="flex items-center gap-0.5" aria-label={`Occupancy: ${occupancy}`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i <= filled ? colors : "bg-slate-200 dark:bg-slate-600"}`}
        />
      ))}
    </span>
  );
}
