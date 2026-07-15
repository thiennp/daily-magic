import { GoogleAnalytics } from "@next/third-parties/google";

import readGoogleAnalyticsMeasurementId from "@/lib/analytics/readGoogleAnalyticsMeasurementId";

export default function AppGoogleAnalytics() {
  const measurementId = readGoogleAnalyticsMeasurementId();

  if (measurementId === null) {
    return null;
  }

  return <GoogleAnalytics gaId={measurementId} />;
}
