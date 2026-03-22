"use client";
import { Bus, CheckCircle } from "lucide-react";

interface EmptyStateProps {
  // accept either a React node or a string key to render a client-side icon
  icon?: React.ReactNode | string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function renderIcon(icon?: React.ReactNode | string) {
  if (!icon) return null;
  if (typeof icon === "string") {
    switch (icon) {
      case "check":
        return <CheckCircle size={36} className="text-green-600" />;
      case "bus":
      default:
        return <Bus size={48} />;
    }
  }
  return icon;
}

export default function EmptyState({
  icon = "bus",
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
      <span aria-hidden="true">{renderIcon(icon)}</span>
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
