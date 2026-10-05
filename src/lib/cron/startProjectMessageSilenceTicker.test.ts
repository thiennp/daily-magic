import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const checkMock = vi.hoisted(() => vi.fn());
const dbConfigured = vi.hoisted(() => ({ value: true }));

vi.mock("@/lib/db", () => ({
  isDatabaseUrlConfigured: () => dbConfigured.value,
}));
vi.mock("@/lib/projects/acl/messaging/checkProjectMessageSilence", () => ({
  checkProjectMessageSilence: (input: unknown) => checkMock(input),
}));

import { startProjectMessageSilenceTicker } from "@/lib/cron/startProjectMessageSilenceTicker";
import { PROJECT_B2B_SILENCE_TICK_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";

const KEY = "__dailyMagicProjectMessageSilenceTicker";
const globalState = globalThis as Record<string, unknown>;

describe("startProjectMessageSilenceTicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    checkMock.mockReset();
    checkMock.mockResolvedValue(0);
    dbConfigured.value = true;
  });

  afterEach(() => {
    clearInterval(globalState[KEY] as ReturnType<typeof setInterval>);
    delete globalState[KEY];
    vi.useRealTimers();
  });

  it("starts once when called twice", async () => {
    expect(startProjectMessageSilenceTicker()).toBe(true);
    expect(startProjectMessageSilenceTicker()).toBe(false);
    await vi.advanceTimersByTimeAsync(PROJECT_B2B_SILENCE_TICK_MS);
    expect(checkMock).toHaveBeenCalledTimes(1);
  });

  it("calls the check with a fresh Date on each tick", async () => {
    startProjectMessageSilenceTicker();
    await vi.advanceTimersByTimeAsync(PROJECT_B2B_SILENCE_TICK_MS - 1);
    expect(checkMock).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    await vi.advanceTimersByTimeAsync(PROJECT_B2B_SILENCE_TICK_MS);
    expect(checkMock).toHaveBeenCalledTimes(2);
    const [first, second] = checkMock.mock.calls.map(
      (call) => (call[0] as { now: Date }).now,
    );
    expect(first).toBeInstanceOf(Date);
    expect(second.getTime() - first.getTime()).toBe(PROJECT_B2B_SILENCE_TICK_MS);
  });

  it("swallows a failing tick and keeps ticking", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    checkMock.mockRejectedValueOnce(new Error("db down"));
    startProjectMessageSilenceTicker();
    await vi.advanceTimersByTimeAsync(PROJECT_B2B_SILENCE_TICK_MS * 2);
    expect(checkMock).toHaveBeenCalledTimes(2);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    errorSpy.mockRestore();
  });

  it("does not start without a database", async () => {
    dbConfigured.value = false;
    expect(startProjectMessageSilenceTicker()).toBe(false);
    await vi.advanceTimersByTimeAsync(PROJECT_B2B_SILENCE_TICK_MS);
    expect(checkMock).not.toHaveBeenCalled();
  });
});
