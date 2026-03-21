import type { ArrivalStatus } from "@/types/transit";
import { arrivalStatusColor } from "@/lib/utils";

interface StatusBadgeProps {
  status: ArrivalStatus;
  className?: string;
}

const STATUS_LABEL: Record<ArrivalStatus, string> = {
  arriving: "Arriving",
  "on-time": "On Time",
  delayed: "Delayed",
  cancelled: "Cancelled",
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${arrivalStatusColor(status)} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "arriving" || status === "on-time"
            ? "bg-green-500"
            : status === "delayed"
            ? "bg-amber-500"
            : "bg-red-500"
        }`}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}
