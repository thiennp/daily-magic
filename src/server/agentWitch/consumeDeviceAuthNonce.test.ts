import { beforeEach, describe, expect, it } from "vitest";

import {
  consumeDeviceAuthNonce,
  resetDeviceAuthNonceCacheForTests,
} from "@/server/agentWitch/consumeDeviceAuthNonce";

describe("consumeDeviceAuthNonce", () => {
  beforeEach(resetDeviceAuthNonceCacheForTests);

  it("accepts a hello once and refuses its replay", () => {
    expect(consumeDeviceAuthNonce("key", "n1")).toBe(true);
    expect(consumeDeviceAuthNonce("key", "n1")).toBe(false);
    expect(consumeDeviceAuthNonce("key", "n2")).toBe(true);
    expect(consumeDeviceAuthNonce("other", "n1")).toBe(true);
  });

  it("forgets a nonce after a day", () => {
    const t0 = 1_000_000;
    expect(consumeDeviceAuthNonce("key", "n1", t0)).toBe(true);
    expect(consumeDeviceAuthNonce("key", "n1", t0 + 25 * 60 * 60 * 1000)).toBe(
      true,
    );
  });
});
