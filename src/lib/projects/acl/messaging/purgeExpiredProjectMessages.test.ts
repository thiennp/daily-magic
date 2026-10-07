import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  purgeExpiredProjectMessages,
  resetProjectMessagePurgeForTests,
} from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";

const historySide = vi.hoisted(() => ({
  wake: vi.fn(async () => 0),
  staleAcks: vi.fn(async () => 0),
}));

vi.mock(
  "@/lib/projects/acl/messaging/wakeProjectComputerForUnsavedOverdue",
  () => ({
    wakeProjectComputersForUnsavedOverdue: historySide.wake,
  }),
);

vi.mock(
  "@/lib/projects/acl/messaging/purgeStaleProjectMessageComputerAcks",
  () => ({
    purgeStaleProjectMessageComputerAcks: historySide.staleAcks,
  }),
);

describe("purgeExpiredProjectMessages", () => {
  beforeEach(() => {
    historySide.wake.mockClear();
    historySide.staleAcks.mockClear();
    resetProjectMessagePurgeForTests();
  });

  it("does not age-delete messages; runs wake + stale ack cleanup", async () => {
    expect(await purgeExpiredProjectMessages({ force: true })).toBe(0);
    expect(historySide.wake).toHaveBeenCalledTimes(1);
    expect(historySide.staleAcks).toHaveBeenCalledTimes(1);
  });

  it("throttles repeat calls within the min interval", async () => {
    expect(await purgeExpiredProjectMessages({ force: true })).toBe(0);
    expect(await purgeExpiredProjectMessages()).toBe(0);
    expect(historySide.wake).toHaveBeenCalledTimes(1);
    expect(historySide.staleAcks).toHaveBeenCalledTimes(1);
  });
});
