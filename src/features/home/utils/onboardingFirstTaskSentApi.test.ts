import { describe, expect, it, beforeEach, vi } from "vitest";

import {
  fetchOnboardingFirstTaskSent,
  persistOnboardingFirstTaskSent,
} from "@/features/home/utils/onboardingFirstTaskSentApi";

describe("onboardingFirstTaskSentApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when GET reports firstTaskSent", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, firstTaskSent: true }),
      }),
    );

    await expect(fetchOnboardingFirstTaskSent()).resolves.toBe(true);
  });

  it("returns false when GET fails or payload is incomplete", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ ok: false }),
      }),
    );

    await expect(fetchOnboardingFirstTaskSent()).resolves.toBe(false);

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );

    await expect(fetchOnboardingFirstTaskSent()).resolves.toBe(false);
  });

  it("returns false when GET throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    await expect(fetchOnboardingFirstTaskSent()).resolves.toBe(false);
  });

  it("POSTs without throwing when persist fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    await expect(persistOnboardingFirstTaskSent()).resolves.toBeUndefined();
  });

  it("POSTs to first-task-sent endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await persistOnboardingFirstTaskSent();

    expect(fetchMock).toHaveBeenCalledWith("/api/onboarding/first-task-sent", {
      method: "POST",
    });
  });
});
