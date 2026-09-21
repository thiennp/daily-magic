import { afterEach, describe, expect, it, vi } from "vitest";

import { shouldFetchWakeIdentityViaAppServer } from "@/lib/agentWitch/shouldFetchWakeIdentityViaAppServer";

describe("shouldFetchWakeIdentityViaAppServer (HOME-051/052)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns true on loopback hostnames", () => {
    vi.stubGlobal("window", {
      location: {
        hostname: "localhost",
        origin: "http://localhost:3000",
        protocol: "http:",
      },
    });

    expect(shouldFetchWakeIdentityViaAppServer()).toBe(true);
  });

  it("returns true on non-production http origins", () => {
    vi.stubGlobal("window", {
      location: {
        hostname: "192.168.1.10",
        origin: "http://192.168.1.10:3000",
        protocol: "http:",
      },
    });

    expect(shouldFetchWakeIdentityViaAppServer()).toBe(true);
  });

  it("returns false on production agentwitch.com", () => {
    vi.stubGlobal("window", {
      location: {
        hostname: "www.agentwitch.com",
        origin: "https://www.agentwitch.com",
        protocol: "https:",
      },
    });

    expect(shouldFetchWakeIdentityViaAppServer()).toBe(false);
  });
});
