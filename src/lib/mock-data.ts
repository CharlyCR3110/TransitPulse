/**
 * Mock transit data for TransitPulse MVP.
 * TODO: Replace with real API calls once the backend is available.
 *       Suggested endpoints:
 *         GET /api/stops/nearby?lat=&lon=&radius=
 *         GET /api/stops/:id/arrivals
 *         GET /api/alerts?active=true
 *         GET /api/trips?origin=&destination=&departAt=
 */

import type {
  Route,
  Stop,
  Arrival,
  TransitAlert,
  Trip,
  UserProfile,
} from "@/types/transit";

// ─── Routes ─────────────────────────────────────────────────────────────────

export const MOCK_ROUTES: Route[] = [
  {
    id: "r1",
    shortName: "42",
    longName: "Downtown Express",
    type: "bus",
    color: "2563EB",
    textColor: "FFFFFF",
    description: "Runs between Westside and Downtown every 10 minutes.",
  },
  {
    id: "r2",
    shortName: "A",
    longName: "Red Line",
    type: "subway",
    color: "DC2626",
    textColor: "FFFFFF",
    description: "North–South subway corridor.",
  },
  {
    id: "r3",
    shortName: "7",
    longName: "Airport Shuttle",
    type: "bus",
    color: "16A34A",
    textColor: "FFFFFF",
    description: "Express service to the international airport.",
  },
  {
    id: "r4",
    shortName: "B",
    longName: "Blue Line",
    type: "subway",
    color: "0EA5E9",
    textColor: "FFFFFF",
    description: "East–West subway corridor connecting the university district.",
  },
  {
    id: "r5",
    shortName: "15",
    longName: "Crosstown",
    type: "tram",
    color: "D97706",
    textColor: "FFFFFF",
    description: "Street-level tram linking neighborhoods.",
  },
];

// ─── Stops ──────────────────────────────────────────────────────────────────

export const MOCK_STOPS: Stop[] = [
  {
    id: "s1",
    name: "Central Station",
    code: "CTR",
    lat: 37.7749,
    lon: -122.4194,
    distanceMeters: 120,
    routes: [MOCK_ROUTES[0], MOCK_ROUTES[1], MOCK_ROUTES[4]],
    accessible: true,
  },
  {
    id: "s2",
    name: "Market & 3rd",
    code: "MK3",
    lat: 37.7852,
    lon: -122.4065,
    distanceMeters: 350,
    routes: [MOCK_ROUTES[0], MOCK_ROUTES[3]],
    accessible: true,
  },
  {
    id: "s3",
    name: "Westside Hub",
    code: "WSH",
    lat: 37.7671,
    lon: -122.4284,
    distanceMeters: 720,
    routes: [MOCK_ROUTES[2], MOCK_ROUTES[4]],
    accessible: false,
  },
  {
    id: "s4",
    name: "University Ave",
    code: "UNI",
    lat: 37.7891,
    lon: -122.3984,
    distanceMeters: 980,
    routes: [MOCK_ROUTES[1], MOCK_ROUTES[3]],
    accessible: true,
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
    headsign: "Downtown Terminal",
    scheduledTime: minutesFromNow(3),
    estimatedTime: minutesFromNow(3),
    minutesAway: 3,
    status: "arriving",
    stopId: "s1",
    occupancy: "medium",
    platform: "Bay A",
  },
  {
    id: "a2",
    route: MOCK_ROUTES[1],
    headsign: "North Terminal",
    scheduledTime: minutesFromNow(7),
    estimatedTime: minutesFromNow(9),
    minutesAway: 9,
    status: "delayed",
    stopId: "s1",
    occupancy: "high",
    platform: "Track 1",
  },
  {
    id: "a3",
    route: MOCK_ROUTES[4],
    headsign: "Eastgate",
    scheduledTime: minutesFromNow(12),
    estimatedTime: minutesFromNow(12),
    minutesAway: 12,
    status: "on-time",
    stopId: "s1",
    occupancy: "low",
  },
  {
    id: "a4",
    route: MOCK_ROUTES[0],
    headsign: "Westside Hub",
    scheduledTime: minutesFromNow(18),
    estimatedTime: minutesFromNow(18),
    minutesAway: 18,
    status: "on-time",
    stopId: "s2",
    occupancy: "low",
    platform: "Bay B",
  },
  {
    id: "a5",
    route: MOCK_ROUTES[3],
    headsign: "Airport North",
    scheduledTime: minutesFromNow(22),
    estimatedTime: minutesFromNow(25),
    minutesAway: 25,
    status: "delayed",
    stopId: "s2",
    occupancy: "medium",
  },
];

// ─── Alerts ──────────────────────────────────────────────────────────────────

export const MOCK_ALERTS: TransitAlert[] = [
  {
    id: "al1",
    title: "Red Line Delays",
    body: "Red Line trains are running 5–10 minutes behind schedule due to track maintenance between Central Station and University Ave. Buses are providing shuttle service.",
    severity: "warning",
    status: "active",
    affectedRoutes: [MOCK_ROUTES[1]],
    affectedStops: [MOCK_STOPS[0], MOCK_STOPS[3]],
    startTime: new Date(Date.now() - 30 * 60_000).toISOString(),
    endTime: new Date(Date.now() + 90 * 60_000).toISOString(),
  },
  {
    id: "al2",
    title: "Route 42 Detour – Main St",
    body: "Route 42 buses are detouring via Oak Ave due to a road closure on Main St. Stops between 4th and 8th will not be served.",
    severity: "info",
    status: "active",
    affectedRoutes: [MOCK_ROUTES[0]],
    startTime: new Date(Date.now() - 2 * 60 * 60_000).toISOString(),
    endTime: new Date(Date.now() + 4 * 60 * 60_000).toISOString(),
  },
  {
    id: "al3",
    title: "Westside Hub – Elevator Out of Service",
    body: "The northbound elevator at Westside Hub is temporarily out of service. Customers needing step-free access should use the Main St entrance.",
    severity: "info",
    status: "active",
    affectedRoutes: [],
    affectedStops: [MOCK_STOPS[2]],
    startTime: new Date(Date.now() - 60 * 60_000).toISOString(),
  },
  {
    id: "al4",
    title: "Airport Shuttle – Capacity Alert",
    body: "Route 7 Airport Shuttle is operating at reduced capacity due to high demand. Passengers may experience longer wait times.",
    severity: "warning",
    status: "active",
    affectedRoutes: [MOCK_ROUTES[2]],
    startTime: new Date(Date.now() - 15 * 60_000).toISOString(),
  },
  {
    id: "al5",
    title: "Planned Maintenance – Blue Line",
    body: "The Blue Line will have limited service on Saturday night from midnight to 5 AM for scheduled track maintenance.",
    severity: "info",
    status: "upcoming",
    affectedRoutes: [MOCK_ROUTES[3]],
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60_000).toISOString(),
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60_000 + 5 * 60 * 60_000).toISOString(),
  },
];

// ─── Trips ───────────────────────────────────────────────────────────────────

export const MOCK_TRIPS: Trip[] = [
  {
    id: "t1",
    origin: "Central Station",
    destination: "Airport",
    departureTime: minutesFromNow(5),
    arrivalTime: minutesFromNow(42),
    durationMinutes: 37,
    status: "scheduled",
    fare: 3.5,
    currency: "USD",
    legs: [
      {
        id: "tl1",
        route: MOCK_ROUTES[0],
        fromStop: MOCK_STOPS[0],
        toStop: MOCK_STOPS[1],
        departureTime: minutesFromNow(5),
        arrivalTime: minutesFromNow(15),
        numStops: 4,
        status: "scheduled",
      },
      {
        id: "tl2",
        route: MOCK_ROUTES[2],
        fromStop: MOCK_STOPS[1],
        toStop: MOCK_STOPS[2],
        departureTime: minutesFromNow(18),
        arrivalTime: minutesFromNow(42),
        numStops: 6,
        status: "scheduled",
      },
    ],
  },
  {
    id: "t2",
    origin: "Central Station",
    destination: "University Ave",
    departureTime: minutesFromNow(9),
    arrivalTime: minutesFromNow(28),
    durationMinutes: 19,
    status: "scheduled",
    fare: 2.75,
    currency: "USD",
    legs: [
      {
        id: "tl3",
        route: MOCK_ROUTES[1],
        fromStop: MOCK_STOPS[0],
        toStop: MOCK_STOPS[3],
        departureTime: minutesFromNow(9),
        arrivalTime: minutesFromNow(28),
        numStops: 5,
        status: "scheduled",
        notes: "5–10 min delay expected",
      },
    ],
  },
  {
    id: "t3",
    origin: "Westside Hub",
    destination: "Downtown",
    departureTime: minutesFromNow(2),
    arrivalTime: minutesFromNow(20),
    durationMinutes: 18,
    status: "scheduled",
    fare: 2.75,
    currency: "USD",
    legs: [
      {
        id: "tl4",
        route: MOCK_ROUTES[4],
        fromStop: MOCK_STOPS[2],
        toStop: MOCK_STOPS[0],
        departureTime: minutesFromNow(2),
        arrivalTime: minutesFromNow(20),
        numStops: 8,
        status: "scheduled",
      },
    ],
  },
];

// ─── User Profile ─────────────────────────────────────────────────────────────

export const MOCK_USER_PROFILE: UserProfile = {
  id: "u1",
  displayName: "Transit Rider",
  // TODO: populate email after authentication is integrated
  favoriteStops: [
    { stop: MOCK_STOPS[0], alias: "Work Stop" },
    { stop: MOCK_STOPS[2], alias: "Home" },
  ],
  favoriteRoutes: [
    { route: MOCK_ROUTES[0] },
    { route: MOCK_ROUTES[1] },
  ],
  preferAccessible: false,
  preferredModes: ["bus", "subway"],
  notificationsEnabled: true,
};
