import { afterEach, describe, expect, it, vi } from "vitest";

import { shouldFetchWakeIdentityViaAppServer } from "@/lib/agentWitch/shouldFetchWakeIdentityViaAppServer";

describe("shouldFetchWakeIdentityViaAppServer (HOME-051)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns true on loopback hostnames", () => {
    vi.stubGlobal("window", {
      location: { hostname: "localhost" },
    });

    expect(shouldFetchWakeIdentityViaAppServer()).toBe(true);
  });

  it("returns false on production hostnames", () => {
    vi.stubGlobal("window", {
      location: { hostname: "www.agentwitch.com" },
    });

    expect(shouldFetchWakeIdentityViaAppServer()).toBe(false);
  });
});
