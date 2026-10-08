import { afterEach, describe, expect, it, vi } from "vitest";

import type { AgentWitchClientConfig } from "./agentWitchClientConfig.type";
import { waitForAgentWitchClientConfigsWithDeps } from "./waitForAgentWitchClientConfigs";

const sampleConfig = {} as AgentWitchClientConfig;

describe("waitForAgentWitchClientConfigsWithDeps", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns immediately when legacy config exists", async () => {
    const readConfig = vi.fn((profile: string | null | undefined) =>
      profile === null ? sampleConfig : null,
    );

    await expect(
      waitForAgentWitchClientConfigsWithDeps({
        listProfileEmails: () => [],
        readConfig,
        pollIntervalMs: 10,
        logWaiting: vi.fn(),
      }),
    ).resolves.toEqual([sampleConfig]);
  });

  it("polls until a profile config appears", async () => {
    vi.useFakeTimers();
    const readConfig = vi
      .fn()
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(sampleConfig);

    const promise = waitForAgentWitchClientConfigsWithDeps({
      listProfileEmails: () => ["a@example.com"],
      readConfig,
      pollIntervalMs: 100,
      logWaiting: vi.fn(),
    });

    await vi.advanceTimersByTimeAsync(100);

    await expect(promise).resolves.toEqual([sampleConfig]);
  });
});

describe("waitForAgentWitchClientConfigsWithDeps onlyProfileEmail (AWL-ISO-1)", () => {
  it("returns only the account host's own profile", async () => {
    const readConfig = vi.fn((email?: string | null) =>
      email === "b@example.com" ? sampleConfig : null,
    );
    await expect(
      waitForAgentWitchClientConfigsWithDeps({
        listProfileEmails: () => ["a@example.com", "b@example.com"],
        readConfig,
        pollIntervalMs: 100,
        logWaiting: vi.fn(),
        onlyProfileEmail: "B@example.com",
      }),
    ).resolves.toEqual([sampleConfig]);
    expect(readConfig).toHaveBeenCalledTimes(1);
    expect(readConfig).toHaveBeenCalledWith("b@example.com");
  });
});
