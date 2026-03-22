import { getAlerts } from "@/services/alerts.service";
import AlertsClient from "./AlertsClient";

export const metadata = {
  title: "Alerts - TransitPulse",
  description: "Service alerts and disruptions",
};

export default async function AlertsPage() {
  const all = await getAlerts();

  return <AlertsClient alerts={all} />;
}
