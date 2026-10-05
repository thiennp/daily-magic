import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const checkMock = vi.hoisted(() => vi.fn());
const deleteReadMock = vi.hoisted(() => vi.fn());
const dbConfigured = vi.hoisted(() => ({ value: true }));

vi.mock("@/lib/db", () => ({
  isDatabaseUrlConfigured: () => dbConfigured.value,
}));
vi.mock("@/lib/projects/acl/messaging/checkProjectMessageSilence", () => ({
  checkProjectMessageSilence: (input: unknown) => checkMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/deleteReadProjectMessages", () => ({
  deleteReadProjectMessages: () => deleteReadMock(),
}));

import { startProjectMessageSilenceTicker } from "@/lib/cron/startProjectMessageSilenceTicker";
import { stopProjectMessageSilenceTicker } from "@/lib/cron/stopProjectMessageSilenceTicker";
import { PROJECT_B2B_SILENCE_TICK_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";

describe("startProjectMessageSilenceTicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    checkMock.mockReset();
    checkMock.mockResolvedValue(0);
    deleteReadMock.mockReset();
    deleteReadMock.mockResolvedValue(0);
    dbConfigured.value = true;
  });

  afterEach(() => {
    stopProjectMessageSilenceTicker();
    vi.useRealTimers();
  });

  it("starts once when called twice: one timer", async () => {
    expect(startProjectMessageSilenceTicker()).toBe(true);
    expect(startProjectMessageSilenceTicker()).toBe(false);
    expect(vi.getTimerCount()).toBe(1);
    await vi.advanceTimersByTimeAsync(PROJECT_B2B_SILENCE_TICK_MS);
    expect(checkMock).toHaveBeenCalledTimes(1);
  });

  it("start, stop, start leaves exactly one timer", async () => {
    expect(startProjectMessageSilenceTicker()).toBe(true);
    expect(stopProjectMessageSilenceTicker()).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
    expect(stopProjectMessageSilenceTicker()).toBe(false);
    expect(startProjectMessageSilenceTicker()).toBe(true);
    expect(vi.getTimerCount()).toBe(1);
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

  it("logs one disabled line at start without a database, never per tick", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    dbConfigured.value = false;
    expect(startProjectMessageSilenceTicker()).toBe(false);
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy).toHaveBeenCalledWith(
      "project message silence ticker disabled: no database configured",
    );
    await vi.advanceTimersByTimeAsync(PROJECT_B2B_SILENCE_TICK_MS * 3);
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(checkMock).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    infoSpy.mockRestore();
  });

  it("repeat calls without a database stay harmless: no timer, one line each", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    dbConfigured.value = false;
    expect(startProjectMessageSilenceTicker()).toBe(false);
    expect(startProjectMessageSilenceTicker()).toBe(false);
    expect(infoSpy).toHaveBeenCalledTimes(2);
    expect(vi.getTimerCount()).toBe(0);
    infoSpy.mockRestore();
  });

  it("does not log the disabled line when a ticker is already running", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    expect(startProjectMessageSilenceTicker()).toBe(true);
    expect(startProjectMessageSilenceTicker()).toBe(false);
    expect(infoSpy).not.toHaveBeenCalled();
    infoSpy.mockRestore();
  });
});
