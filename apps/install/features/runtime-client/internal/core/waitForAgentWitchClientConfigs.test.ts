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
