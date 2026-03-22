import { MOCK_ARRIVALS } from "@/data/mock";
import type { Arrival } from "@/types/transit";

export async function getUpcomingArrivals(limit = 5): Promise<Arrival[]> {
  return Promise.resolve(MOCK_ARRIVALS.slice(0, limit));
}

export async function getArrivalsByStop(stopId: string): Promise<Arrival[]> {
  return Promise.resolve(MOCK_ARRIVALS.filter((a) => a.stopId === stopId));
}
