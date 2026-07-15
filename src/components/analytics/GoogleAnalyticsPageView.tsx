"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import readGoogleAnalyticsMeasurementId from "@/lib/analytics/readGoogleAnalyticsMeasurementId";
import reportGoogleAnalyticsPageView from "@/lib/analytics/reportGoogleAnalyticsPageView";

export default function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const measurementId = readGoogleAnalyticsMeasurementId();

  useEffect(() => {
    if (measurementId === null) {
      return;
    }

    const query = searchParams.toString();
    const path = query.length > 0 ? `${pathname}?${query}` : pathname;

    reportGoogleAnalyticsPageView(measurementId, path);
  }, [measurementId, pathname, searchParams]);

  return null;
}
