import { MOCK_TRIPS } from "@/data/mock";
import type { Trip } from "@/types/transit";

export async function planTrip(origin: string, destination: string): Promise<Trip[]> {
  if (!origin.trim() || !destination.trim()) return Promise.resolve([]);
  const matches = MOCK_TRIPS.filter(
    (t) =>
      t.origin.toLowerCase().includes(origin.toLowerCase()) ||
      t.destination.toLowerCase().includes(destination.toLowerCase())
  );
  return Promise.resolve(matches);
}

export async function getTrips(): Promise<Trip[]> {
  return Promise.resolve(MOCK_TRIPS);
}
