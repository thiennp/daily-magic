import { afterEach, describe, expect, it, vi } from "vitest";

import readGoogleAnalyticsMeasurementId from "@/lib/analytics/readGoogleAnalyticsMeasurementId";

describe("readGoogleAnalyticsMeasurementId", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns a valid GA4 measurement id from env", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-ABCDEFGHIJ");

    expect(readGoogleAnalyticsMeasurementId()).toBe("G-ABCDEFGHIJ");
  });

  it("returns null when env is missing or invalid", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");

    expect(readGoogleAnalyticsMeasurementId()).toBeNull();

    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "UA-12345-6");

    expect(readGoogleAnalyticsMeasurementId()).toBeNull();
  });
});
