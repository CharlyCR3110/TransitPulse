import { MOCK_STOPS } from "@/data/mock";
import type { Stop } from "@/types/transit";

export async function getNearbyStops(): Promise<Stop[]> {
  return Promise.resolve(MOCK_STOPS);
}

export async function getAllStops(): Promise<Stop[]> {
  return Promise.resolve(MOCK_STOPS);
}
