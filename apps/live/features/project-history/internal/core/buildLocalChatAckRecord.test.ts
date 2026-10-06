import { describe, expect, it } from "vitest";

import { buildLocalChatAckRecord } from "./buildLocalChatAckRecord";

describe("buildLocalChatAckRecord", () => {
  it("builds {deviceId, messageId, ackedAt, lastSeenAt}", () => {
    expect(
      buildLocalChatAckRecord({
        deviceId: "dev-1",
        messageId: "m1",
        ackedAt: "2026-01-01T00:00:00.000Z",
      }),
    ).toEqual({
      deviceId: "dev-1",
      messageId: "m1",
      ackedAt: "2026-01-01T00:00:00.000Z",
      lastSeenAt: "2026-01-01T00:00:00.000Z",
    });
  });

  it("rejects empty deviceId / messageId", () => {
    expect(() =>
      buildLocalChatAckRecord({ deviceId: " ", messageId: "m1" }),
    ).toThrow("invalid_device_id");
    expect(() =>
      buildLocalChatAckRecord({ deviceId: "d1", messageId: "" }),
    ).toThrow("invalid_message_id");
  });
});
