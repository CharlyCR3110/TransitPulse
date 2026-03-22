/**
 * 
 * Mock transit data for TransitPulse MVP — Heredia, Costa Rica (bus-only).
 * Focused dataset for local buses in Heredia canton and nearby communities.
 * TODO: Replace with real API calls once the backend is available.
 *       Suggested endpoints:
 *         GET /api/stops/nearby?lat=&lon=&radius=
 *         GET /api/stops/:id/arrivals
 *         GET /api/alerts?active=true
 *         GET /api/trips?origin=&destination=&departAt=F
 */

import type {
  Route,
  Stop,
  Arrival,
  TransitAlert,
  Trip,
  UserProfile,
} from "@/types/transit";

// ─── Routes (bus-only, Heredia) ──────────────────────────────────────────────

export const MOCK_ROUTES: Route[] = [
  {
    id: "r1",
    shortName: "101",
    longName: "Heredia Centro - San Joaquín",
    type: "bus",
    color: "0EA5E9",
    textColor: "FFFFFF",
    description: "Local route connecting Heredia centro with the San Joaquín neighborhood.",
  },
  {
    id: "r2",
    shortName: "102",
    longName: "Heredia - Barva",
    type: "bus",
    color: "16A34A",
    textColor: "FFFFFF",
    description: "Interurban service between Heredia and Barva town center.",
  },
  {
    id: "r3",
    shortName: "103",
    longName: "Heredia - Santo Domingo",
    type: "bus",
    color: "F59E0B",
    textColor: "000000",
    description: "Connector to Santo Domingo and nearby residential areas.",
  },
  {
    id: "r4",
    shortName: "104",
    longName: "Heredia - Universidad Nacional",
    type: "bus",
    color: "DC2626",
    textColor: "FFFFFF",
    description: "Frequent shuttle serving the National University campus.",
  },
  {
    id: "r5",
    shortName: "105",
    longName: "Heredia Centro - Cariari",
    type: "bus",
    color: "2563EB",
    textColor: "FFFFFF",
    description: "Route toward Cariari commercial area and nearby neighborhoods.",
  },
];

// ─── Stops (Heredia-area) ───────────────────────────────────────────────────

export const MOCK_STOPS: Stop[] = [
  {
    id: "s1",
    name: "Heredia Centro",
    code: "HRD-CTR",
    lat: 9.9981,
    lon: -84.1197,
    distanceMeters: 80,
    routes: [MOCK_ROUTES[0], MOCK_ROUTES[1], MOCK_ROUTES[4]],
    accessible: true,
  },
  {
    id: "s2",
    name: "San Joaquín",
    code: "HRD-SJ",
    lat: 9.9998,
    lon: -84.1212,
    distanceMeters: 420,
    routes: [MOCK_ROUTES[0], MOCK_ROUTES[3]],
    accessible: true,
  },
  {
    id: "s3",
    name: "Barva Centro",
    code: "BAR-CTR",
    lat: 10.0102,
    lon: -84.1280,
    distanceMeters: 2600,
    routes: [MOCK_ROUTES[1]],
    accessible: false,
  },
  {
    id: "s4",
    name: "Universidad Nacional",
    code: "UNA",
    lat: 9.9945,
    lon: -84.1150,
    distanceMeters: 1200,
    routes: [MOCK_ROUTES[3]],
    accessible: true,
  },
  {
    id: "s5",
    name: "Cariari",
    code: "CAR",
    lat: 9.9930,
    lon: -84.1035,
    distanceMeters: 3500,
    routes: [MOCK_ROUTES[4]],
    accessible: false,
  },
];

// ─── Arrivals ────────────────────────────────────────────────────────────────

function minutesFromNow(minutes: number): string {
  return new Date(Date.now() + minutes * 60_000).toISOString();
}

export const MOCK_ARRIVALS: Arrival[] = [
  {
    id: "a1",
    route: MOCK_ROUTES[0],
    headsign: "San Joaquín",
    scheduledTime: minutesFromNow(4),
    estimatedTime: minutesFromNow(4),
    minutesAway: 4,
    status: "arriving",
    stopId: "s1",
    occupancy: "medium",
    platform: "Parada A",
  },
  {
    id: "a2",
    route: MOCK_ROUTES[3],
    headsign: "Universidad Nacional",
    scheduledTime: minutesFromNow(10),
    estimatedTime: minutesFromNow(12),
    minutesAway: 12,
    status: "delayed",
    stopId: "s2",
    occupancy: "high",
    platform: "Parada B",
  },
  {
    id: "a3",
    route: MOCK_ROUTES[1],
    headsign: "Barva Centro",
    scheduledTime: minutesFromNow(18),
    estimatedTime: minutesFromNow(18),
    minutesAway: 18,
    status: "on-time",
    stopId: "s1",
    occupancy: "low",
  },
  {
    id: "a4",
    route: MOCK_ROUTES[4],
    headsign: "Cariari",
    scheduledTime: minutesFromNow(26),
    estimatedTime: minutesFromNow(26),
    minutesAway: 26,
    status: "on-time",
    stopId: "s1",
    occupancy: "low",
  },
  {
    id: "a5",
    route: MOCK_ROUTES[2],
    headsign: "Santo Domingo",
    scheduledTime: minutesFromNow(33),
    estimatedTime: minutesFromNow(33),
    minutesAway: 33,
    status: "on-time",
    stopId: "s3",
    occupancy: "medium",
  },
];

// ─── Alerts ──────────────────────────────────────────────────────────────────

export const MOCK_ALERTS: TransitAlert[] = [
  {
    id: "al1",
    title: "Desvío por obra - Ruta 101",
    body: "La Ruta 101 está desviada por obras en calle principal. Algunas paradas se encuentran temporalmente fuera de servicio.",
    severity: "warning",
    status: "active",
    affectedRoutes: [MOCK_ROUTES[0]],
    affectedStops: [MOCK_STOPS[1]],
    startTime: new Date(Date.now() - 20 * 60_000).toISOString(),
    endTime: new Date(Date.now() + 3 * 60 * 60_000).toISOString(),
  },
  {
    id: "al2",
    title: "Alta demanda - Universidad",
    body: "Servicio con alta demanda hacia la Universidad Nacional. Espere buses llenos en horas punta.",
    severity: "info",
    status: "active",
    affectedRoutes: [MOCK_ROUTES[3]],
    affectedStops: [MOCK_STOPS[3]],
    startTime: new Date(Date.now() - 10 * 60_000).toISOString(),
  },
];

// ─── Trips ───────────────────────────────────────────────────────────────────

export const MOCK_TRIPS: Trip[] = [
  {
    id: "t1",
    origin: "Heredia Centro",
    destination: "Barva Centro",
    departureTime: minutesFromNow(8),
    arrivalTime: minutesFromNow(32),
    durationMinutes: 24,
    status: "scheduled",
    fare: 250, // CRC colones (example)
    currency: "CRC",
    legs: [
      {
        id: "tl1",
        route: MOCK_ROUTES[0],
        fromStop: MOCK_STOPS[0],
        toStop: MOCK_STOPS[1],
        departureTime: minutesFromNow(8),
        arrivalTime: minutesFromNow(18),
        numStops: 5,
        status: "scheduled",
      },
      {
        id: "tl2",
        route: MOCK_ROUTES[1],
        fromStop: MOCK_STOPS[1],
        toStop: MOCK_STOPS[2],
        departureTime: minutesFromNow(20),
        arrivalTime: minutesFromNow(32),
        numStops: 6,
        status: "scheduled",
      },
    ],
  },
  {
    id: "t2",
    origin: "Heredia Centro",
    destination: "Universidad Nacional",
    departureTime: minutesFromNow(5),
    arrivalTime: minutesFromNow(20),
    durationMinutes: 15,
    status: "scheduled",
    fare: 200,
    currency: "CRC",
    legs: [
      {
        id: "tl3",
        route: MOCK_ROUTES[3],
        fromStop: MOCK_STOPS[0],
        toStop: MOCK_STOPS[3],
        departureTime: minutesFromNow(5),
        arrivalTime: minutesFromNow(20),
        numStops: 4,
        status: "scheduled",
        notes: "Servicio frecuente durante horas lectivas",
      },
    ],
  },
];

// ─── User Profile ─────────────────────────────────────────────────────────────

export const MOCK_USER_PROFILE: UserProfile = {
  id: "u1",
  displayName: "Usuario Heredia",
  favoriteStops: [
    { stop: MOCK_STOPS[0] },
    { stop: MOCK_STOPS[3] },
  ],
  favoriteRoutes: [
    { route: MOCK_ROUTES[0] },
    { route: MOCK_ROUTES[3] },
  ],
  preferAccessible: true,
  preferredModes: ["bus"],
  notificationsEnabled: true,
};
