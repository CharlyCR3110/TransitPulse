import type { Trip } from "@/types/transit";
import RouteChip from "@/components/ui/RouteChip";
import { formatTime, formatDuration } from "@/lib/utils";

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const { origin, destination, departureTime, arrivalTime, durationMinutes, legs, fare, currency } =
    trip;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">
            {origin} → {destination}
          </p>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            {formatTime(departureTime)} – {formatTime(arrivalTime)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {formatDuration(durationMinutes)}
          </p>
          {fare !== undefined && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {currency} {fare.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Legs */}
      <div className="px-4 py-3 space-y-3">
        {legs.map((leg, i) => (
          <div key={leg.id} className="flex items-center gap-3">
            {/* Leg icon / connector */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              {i < legs.length - 1 && (
                <div className="w-0.5 h-4 bg-slate-200 dark:bg-slate-700" />
              )}
            </div>

            {/* Leg detail */}
            <div className="flex-1 flex items-center gap-2 min-w-0">
              <RouteChip route={leg.route} size="sm" />
              <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
                {leg.fromStop.name}
                <span className="text-slate-400 dark:text-slate-500 mx-1">→</span>
                {leg.toStop.name}
              </p>
            </div>

            <p className="flex-shrink-0 text-xs text-slate-400 dark:text-slate-500 tabular-nums">
              {formatTime(leg.departureTime)}
            </p>
          </div>
        ))}

        {/* Last stop dot */}
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500 flex-shrink-0" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {legs[legs.length - 1]?.toStop.name}
          </p>
          <p className="ml-auto text-xs text-slate-400 tabular-nums">
            {formatTime(arrivalTime)}
          </p>
        </div>
      </div>
    </div>
  );
}
