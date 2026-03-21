// Core transit data types for TransitPulse
// TODO: Replace with types generated from backend API schema when available

export type RouteType = "bus" | "subway" | "tram" | "rail" | "ferry";

export type AlertSeverity = "info" | "warning" | "critical";

export type AlertStatus = "active" | "resolved" | "upcoming";

export type ArrivalStatus = "on-time" | "delayed" | "cancelled" | "arriving";

export type TripStatus = "scheduled" | "in-progress" | "completed" | "cancelled";

// ─── Route ──────────────────────────────────────────────────────────────────

export interface Route {
  id: string;
  shortName: string;        // e.g. "42", "A", "Red Line"
  longName: string;         // e.g. "Downtown Express"
  type: RouteType;
  color: string;            // hex without #
  textColor: string;        // hex without #
  description?: string;
}

// ─── Stop ───────────────────────────────────────────────────────────────────

export interface Stop {
  id: string;
  name: string;
  code?: string;            // Short code displayed at the stop
  lat: number;
  lon: number;
  distanceMeters?: number;  // Distance from user (populated at runtime)
  routes: Route[];
  accessible: boolean;
}

// ─── Arrival ────────────────────────────────────────────────────────────────

export interface Arrival {
  id: string;
  route: Route;
  headsign: string;         // Destination displayed on the vehicle
  scheduledTime: string;    // ISO-8601
  estimatedTime: string;    // ISO-8601 – TODO: populate from real-time feed
  minutesAway: number;
  status: ArrivalStatus;
  stopId: string;
  vehicleId?: string;
  occupancy?: "low" | "medium" | "high";
  platform?: string;
}

// ─── Alert ──────────────────────────────────────────────────────────────────

export interface TransitAlert {
  id: string;
  title: string;
  body: string;
  severity: AlertSeverity;
  status: AlertStatus;
  affectedRoutes: Route[];
  affectedStops?: Stop[];
  startTime: string;        // ISO-8601
  endTime?: string;         // ISO-8601 – undefined means "until further notice"
  url?: string;             // Link to more details
}

// ─── Trip / Journey ─────────────────────────────────────────────────────────

export interface TripLeg {
  id: string;
  route: Route;
  fromStop: Stop;
  toStop: Stop;
  departureTime: string;    // ISO-8601
  arrivalTime: string;      // ISO-8601
  numStops: number;
  status: TripStatus;
  notes?: string;
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;    // ISO-8601
  arrivalTime: string;      // ISO-8601
  durationMinutes: number;
  legs: TripLeg[];
  status: TripStatus;
  fare?: number;            // TODO: populate from fare API
  currency?: string;
}

// ─── User / Profile ─────────────────────────────────────────────────────────

export interface FavoriteStop {
  stop: Stop;
  alias?: string;           // Custom name, e.g. "Home Stop"
}

export interface FavoriteRoute {
  route: Route;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email?: string;           // TODO: populate after auth integration
  favoriteStops: FavoriteStop[];
  favoriteRoutes: FavoriteRoute[];
  preferAccessible: boolean;
  preferredModes: RouteType[];
  notificationsEnabled: boolean;
}
