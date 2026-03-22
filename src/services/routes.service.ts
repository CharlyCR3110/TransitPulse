import { MOCK_ROUTES } from "@/data/mock";
import type { Route } from "@/types/transit";

export async function getRoutes(): Promise<Route[]> {
  return Promise.resolve(MOCK_ROUTES);
}
