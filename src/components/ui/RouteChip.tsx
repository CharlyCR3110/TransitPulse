import type { Route } from "@/types/transit";
import { routeColor, routeTypeIcon } from "@/lib/utils";

interface RouteChipProps {
  route: Route;
  size?: "sm" | "md";
}

export default function RouteChip({ route, size = "md" }: RouteChipProps) {
  const bg = routeColor(route.color);
  const text = routeColor(route.textColor);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-bold ${
        size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm"
      }`}
      style={{ backgroundColor: bg, color: text }}
      aria-label={`${route.shortName} – ${route.longName}`}
    >
      <span aria-hidden="true">{routeTypeIcon(route.type)}</span>
      {route.shortName}
    </span>
  );
}
