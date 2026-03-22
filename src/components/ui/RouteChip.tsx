"use client";

import type { Route } from "@/types/transit";
import { routeColor, routeTypeIcon } from "@/lib/utils";
import { Bus, Train, TramFront, Ship, MapPin } from "lucide-react";

interface RouteChipProps {
  route: Route;
  size?: "sm" | "md";
}

function iconFor(type: string) {
  switch (type) {
    case "bus":
      return <Bus size={14} />;
    case "subway":
      return <Train size={14} />;
    case "tram":
      return <TramFront size={14} />;
    case "rail":
      return <Train size={14} />;
    case "ferry":
      return <Ship size={14} />;
    default:
      return <MapPin size={14} />;
  }
}

export default function RouteChip({ route, size = "md" }: RouteChipProps) {
  const bg = routeColor(route.color);
  const text = routeColor(route.textColor);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-bold ${size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm"
        }`}
      style={{ backgroundColor: bg, color: text }}
      aria-label={`${route.shortName} - ${route.longName}`}
    >
      <span aria-hidden="true">{iconFor(routeTypeIcon(route.type))}</span>
      {route.shortName}
    </span>
  );
}
