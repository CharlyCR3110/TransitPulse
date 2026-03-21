# TransitPulse 🚌

A **mobile-first** public transit information app built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

Designed for commuters checking transit info on the go - one-hand use, quick-glance cards, large tap targets, and clear information hierarchy.

> **Current state:** Frontend MVP with mock data. Backend integrations are marked with `// TODO` comments throughout the codebase.

---

## Screenshots

| Home | Alerts | Routes | Profile |
|------|--------|--------|---------|
| Next arrivals, alert banner, nearby stops, trip planner CTA | Active + upcoming service alerts | Trip planner form + all routes & stops | Favorites, preferences, sign-in CTA |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Fonts | Geist (via `next/font`) |
| Data | Static mock data (`src/data/mock.ts`) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server (hot reload)
npm run dev

# Open on your phone (replace IP with your machine's local IP)
# http://192.168.x.x:3000

# Build for production
npm run build

# Lint
npm run lint
```

---

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout: viewport meta, BottomNav, font
│   ├── page.tsx            # Home - next arrivals, alerts, nearby stops
│   ├── routes/
│   │   └── page.tsx        # Trip planner + all routes & stops
│   ├── alerts/
│   │   └── page.tsx        # Full alerts list (active, upcoming, resolved)
│   └── profile/
│       └── page.tsx        # User profile, favorites, preferences
│
├── components/
│   ├── navigation/
│   │   └── BottomNav.tsx   # Sticky bottom tab bar (Home/Routes/Alerts/Profile)
│   ├── ui/                 # Generic reusable primitives
│   │   ├── StatusBadge.tsx # Arrival status indicator (on-time, delayed…)
│   │   ├── RouteChip.tsx   # Colored route badge (e.g. "42 🚌")
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorState.tsx
│   ├── arrivals/
│   │   └── ArrivalCard.tsx # Next arrival row card
│   ├── alerts/
│   │   ├── AlertCard.tsx   # Full alert card with body + affected routes
│   │   └── AlertBanner.tsx # Compact banner for active alerts
│   ├── stops/
│   │   └── StopCard.tsx    # Nearby stop card with distance + routes
│   └── trips/
│       ├── TripCard.tsx    # Trip result card (legs, times, fare)
│       └── TripPlanner.tsx # Origin/destination form + search results
│
├── data/
│   └── mock.ts             # All mock transit data (routes, stops, arrivals, alerts, trips, profile)
│
├── lib/
│   └── utils.ts            # Utility helpers (time formatting, status colors, etc.)
│
└── types/
    └── transit.ts          # TypeScript interfaces for all transit domain types
```

---

## Mobile-First UX Principles

- **One-hand use:** All primary actions are in the bottom half of the screen
- **Bottom navigation:** Fixed tab bar, 56px height, 44px minimum tap targets
- **Quick-glance cards:** Minutes-away count is the largest element on arrival cards
- **Alert banner:** Critical/warning alerts surface at the very top of the home screen
- **Large inputs:** 48px minimum height on all form fields
- **High contrast:** Slate/white palette with strong color coding for status and routes
- **Max-width 448px:** The layout centers on tablets/desktops but is fully optimized for phones

---

## Planned Integrations (TODOs)

Each integration point is marked with a `// TODO` comment in the relevant file.

| Feature | Location | Notes |
|---------|----------|-------|
| Real-time arrivals | `src/data/mock.ts`, `src/app/page.tsx` | GTFS-RT or custom API |
| Nearby stops (geolocation) | `src/app/page.tsx` | `navigator.geolocation` + stops API |
| Map view | `src/app/routes/page.tsx` | Mapbox GL JS or Google Maps |
| Trip search API | `src/components/trips/TripPlanner.tsx` | OTP (OpenTripPlanner) or custom |
| Authentication | `src/app/profile/page.tsx` | NextAuth.js / OAuth |
| Push notifications | `src/app/alerts/page.tsx` | Web Push + service worker |
| Fare payments | `src/components/trips/TripCard.tsx` | Stripe / transit fare API |
| AI predictions | `src/data/mock.ts` | Crowding / delay prediction model |
| PWA / offline | `src/app/layout.tsx` | next-pwa + service worker |

---

## Architecture Notes

- **Server Components by default:** All pages are React Server Components unless they need interactivity (`"use client"` in `TripPlanner.tsx` and `BottomNav.tsx`)
- **Type safety:** All transit domain types live in `src/types/transit.ts` and are used throughout
- **Mock data:** All mock data is in `src/data/mock.ts`; replacing it with API calls requires only updating that file and adding fetch logic to the pages
- **No external icon libraries:** Icons are inline SVGs to keep the bundle small
