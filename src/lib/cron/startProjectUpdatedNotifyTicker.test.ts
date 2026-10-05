import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const flushMock = vi.hoisted(() => vi.fn());
const dbConfigured = vi.hoisted(() => ({ value: true }));

vi.mock("@/lib/db", () => ({
  isDatabaseUrlConfigured: () => dbConfigured.value,
}));
vi.mock(
  "@/lib/projects/acl/messaging/flushDueProjectUpdatedNotifies",
  () => ({
    flushDueProjectUpdatedNotifies: (input: unknown) => flushMock(input),
  }),
);

import { startProjectUpdatedNotifyTicker } from "@/lib/cron/startProjectUpdatedNotifyTicker";
import { stopProjectUpdatedNotifyTicker } from "@/lib/cron/stopProjectUpdatedNotifyTicker";
import { PROJECT_UPDATED_NOTIFY_TICK_MS } from "@/lib/cron/projectUpdatedNotifyTicker.constants";

describe("startProjectUpdatedNotifyTicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    flushMock.mockReset();
    flushMock.mockResolvedValue(0);
    dbConfigured.value = true;
  });

  afterEach(() => {
    stopProjectUpdatedNotifyTicker();
    vi.useRealTimers();
  });

  it("starts once and flushes on each tick", async () => {
    expect(startProjectUpdatedNotifyTicker()).toBe(true);
    expect(startProjectUpdatedNotifyTicker()).toBe(false);
    expect(vi.getTimerCount()).toBe(1);
    await vi.advanceTimersByTimeAsync(PROJECT_UPDATED_NOTIFY_TICK_MS);
    expect(flushMock).toHaveBeenCalledTimes(1);
  });

  it("logs one disabled line without a database", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    dbConfigured.value = false;
    expect(startProjectUpdatedNotifyTicker()).toBe(false);
    expect(infoSpy).toHaveBeenCalledWith(
      "project.updated notify ticker disabled: no database configured",
    );
    await vi.advanceTimersByTimeAsync(PROJECT_UPDATED_NOTIFY_TICK_MS * 2);
    expect(flushMock).not.toHaveBeenCalled();
    infoSpy.mockRestore();
  });
});
