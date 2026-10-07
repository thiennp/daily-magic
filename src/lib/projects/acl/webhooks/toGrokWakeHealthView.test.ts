import { describe, expect, it } from "vitest";

import { toGrokWakeHealthView } from "@/lib/projects/acl/webhooks/toGrokWakeHealthView";

const AT = "2026-10-07T21:15:00.000Z";

const view = (lastGrokWakeResult: string | null, lastGrokWakeAt = AT) =>
  toGrokWakeHealthView({ lastGrokWakeResult, lastGrokWakeAt });

describe("toGrokWakeHealthView", () => {
  it("no attempt yet → both null", () => {
    expect(
      toGrokWakeHealthView({ lastGrokWakeResult: null, lastGrokWakeAt: null }),
    ).toEqual({ lastWakeAt: null, lastFailureReason: null });
  });

  it("skipped_by_policy is not a wake", () => {
    expect(view("skipped_by_policy")).toEqual({
      lastWakeAt: null,
      lastFailureReason: null,
    });
  });

  it("success returns the time and clears the reason", () => {
    const ok = { lastWakeAt: AT, lastFailureReason: null };
    expect(view("http_200")).toEqual(ok);
    expect(view("http_202")).toEqual(ok);
  });

  it("non-2xx HTTP → 'HTTP nnn'", () => {
    expect(view("http_429")).toEqual({
      lastWakeAt: AT,
      lastFailureReason: "HTTP 429",
    });
    expect(view("http_500").lastFailureReason).toBe("HTTP 500");
    expect(view("http_401").lastFailureReason).toBe("HTTP 401");
    expect(view("http_404").lastFailureReason).toBe("HTTP 404");
  });

  it("fetch_failed and not_postable map to fixed plain text", () => {
    expect(view("fetch_failed")).toEqual({
      lastWakeAt: AT,
      lastFailureReason: "Fetch failed (timeout, DNS or refused)",
    });
    expect(view("not_postable")).toEqual({
      lastWakeAt: AT,
      lastFailureReason: "Not postable",
    });
  });

  it("never echoes an unknown / unsafe stored value", () => {
    const leaky = "https://hooks.example.com/wake?key=awc_secret body";
    const out = view(leaky);
    expect(out.lastFailureReason).toBeNull();
    expect(JSON.stringify(out)).not.toContain("hooks.example.com");
    expect(JSON.stringify(out)).not.toContain("awc_secret");
  });

  it("returns exactly the two additive keys", () => {
    expect(Object.keys(view("http_500")).sort()).toEqual([
      "lastFailureReason",
      "lastWakeAt",
    ]);
  });
});
