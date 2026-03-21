/**
 * Utility helpers for TransitPulse.
 * TODO: Many of these will be superseded by real-time data helpers once the
 *       backend is integrated.
 */

import type { ArrivalStatus, AlertSeverity, RouteType } from "@/types/transit";

// ─── Time formatting ─────────────────────────────────────────────────────────

/** Returns a human-readable "N min" or "Now" string for an arrival. */
export function formatMinutesAway(minutes: number): string {
  if (minutes <= 0) return "Now";
  if (minutes === 1) return "1 min";
  return `${minutes} min`;
}

/** Formats an ISO date string to a short time, e.g. "3:45 PM". */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Formats a duration in minutes to a compact string, e.g. "37 min" or "1 h 5 min". */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/** Returns a relative label for a date like "Today", "Tomorrow", or the date. */
export function formatRelativeDay(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  if (date.toDateString() === now.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

/** Formats a distance in meters to a user-friendly string. */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

// ─── Status helpers ──────────────────────────────────────────────────────────

/** Tailwind color classes for arrival statuses. */
export function arrivalStatusColor(status: ArrivalStatus): string {
  switch (status) {
    case "arriving":
      return "text-green-600 dark:text-green-400";
    case "on-time":
      return "text-green-600 dark:text-green-400";
    case "delayed":
      return "text-amber-600 dark:text-amber-400";
    case "cancelled":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-slate-500";
  }
}

/** Tailwind border/background classes for alert severity. */
export function alertSeverityClasses(severity: AlertSeverity): {
  border: string;
  bg: string;
  icon: string;
  text: string;
} {
  switch (severity) {
    case "critical":
      return {
        border: "border-red-500",
        bg: "bg-red-50 dark:bg-red-950",
        icon: "text-red-500",
        text: "text-red-800 dark:text-red-200",
      };
    case "warning":
      return {
        border: "border-amber-500",
        bg: "bg-amber-50 dark:bg-amber-950",
        icon: "text-amber-500",
        text: "text-amber-800 dark:text-amber-200",
      };
    case "info":
    default:
      return {
        border: "border-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950",
        icon: "text-blue-500",
        text: "text-blue-800 dark:text-blue-200",
      };
  }
}

/** Returns a CSS color string for a route. */
export function routeColor(hex: string): string {
  return `#${hex}`;
}

/** Returns a short label for a route type. */
export function routeTypeLabel(type: RouteType): string {
  switch (type) {
    case "bus":
      return "Bus";
    case "subway":
      return "Subway";
    case "tram":
      return "Tram";
    case "rail":
      return "Rail";
    case "ferry":
      return "Ferry";
    default:
      return "Transit";
  }
}

/** Returns an emoji icon for a route type (used where SVG icons aren't available). */
export function routeTypeIcon(type: RouteType): string {
  switch (type) {
    case "bus":
      return "🚌";
    case "subway":
      return "🚇";
    case "tram":
      return "🚊";
    case "rail":
      return "🚆";
    case "ferry":
      return "⛴️";
    default:
      return "🚏";
  }
}
