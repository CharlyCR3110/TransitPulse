import type { TransitAlert } from "@/types/transit";
import Link from "next/link";

interface AlertBannerProps {
  alerts: TransitAlert[];
}

/** Compact banner shown at the top of the Home page when there are active alerts. */
export default function AlertBanner({ alerts }: AlertBannerProps) {
  const active = alerts.filter((a) => a.status === "active");
  if (active.length === 0) return null;

  const hasCritical = active.some((a) => a.severity === "critical");
  const hasWarning = active.some((a) => a.severity === "warning");

  const { bg, text, icon } = hasCritical
    ? { bg: "bg-red-600", text: "text-white", icon: "🚨" }
    : hasWarning
    ? { bg: "bg-amber-500", text: "text-white", icon: "⚠️" }
    : { bg: "bg-blue-600", text: "text-white", icon: "ℹ️" };

  const first = active[0];

  return (
    <Link
      href="/alerts"
      className={`flex items-center gap-2.5 px-4 py-3 ${bg} ${text} active:opacity-80`}
      aria-label={`${active.length} active alert${active.length > 1 ? "s" : ""}. Tap to view.`}
    >
      <span className="text-lg flex-shrink-0" aria-hidden="true">{icon}</span>
      <p className="flex-1 text-sm font-medium leading-snug truncate">{first.title}</p>
      {active.length > 1 && (
        <span className="flex-shrink-0 bg-white/20 rounded-full text-xs font-bold px-2 py-0.5">
          +{active.length - 1}
        </span>
      )}
      <ChevronRightIcon className="h-4 w-4 flex-shrink-0 opacity-70" />
    </Link>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
