import { MOCK_ALERTS } from "@/data/mock";
import type { TransitAlert } from "@/types/transit";

export async function getAlerts(): Promise<TransitAlert[]> {
  return Promise.resolve(MOCK_ALERTS);
}
