import { afterEach, describe, expect, it, vi } from "vitest";

import { startAgentWitchConnectionRegistryMaintenance } from "@/lib/agentWitch/startAgentWitchConnectionRegistryMaintenance";

describe("startAgentWitchConnectionRegistryMaintenance", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not start intervals when DATABASE_URL is unset", () => {
    const previousDatabaseUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;
    const setIntervalSpy = vi.spyOn(globalThis, "setInterval");

    startAgentWitchConnectionRegistryMaintenance();

    expect(setIntervalSpy).not.toHaveBeenCalled();

    if (previousDatabaseUrl !== undefined) {
      process.env.DATABASE_URL = previousDatabaseUrl;
    }
  });
});
