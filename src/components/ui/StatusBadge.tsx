import type { ArrivalStatus } from "@/types/transit";
import { arrivalStatusColor } from "@/lib/utils";
import { useT } from "@/lib/i18n-client";

interface StatusBadgeProps {
  status: ArrivalStatus;
  className?: string;
}

const KEY_MAP: Record<ArrivalStatus, string> = {
  arriving: "arriving",
  "on-time": "onTime",
  delayed: "delayed",
  cancelled: "cancelled",
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const t = useT();

  const label = t(`status.${KEY_MAP[status]}`);

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${arrivalStatusColor(status)} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${status === "arriving" || status === "on-time"
          ? "bg-green-500"
          : status === "delayed"
            ? "bg-amber-500"
            : "bg-red-500"
          }`}
      />
      {label}
    </span>
  );
}
