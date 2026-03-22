export const metadata = {
  title: "Routes - TransitPulse",
  description: "Plan your trip and browse transit routes",
};

import { getRoutes } from "@/services/routes.service";
import { getAllStops } from "@/services/stops.service";
import RoutesClient from "./RoutesClient";

export default async function RoutesPage() {
  const routes = await getRoutes();
  const stops = await getAllStops();
  return <RoutesClient routes={routes} stops={stops} />;
}
