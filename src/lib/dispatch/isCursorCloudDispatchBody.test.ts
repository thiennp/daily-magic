import { describe, expect, it } from "vitest";

import { CURSOR_CLOUD_EXECUTOR_DEVICE_ID } from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";
import { isCursorCloudDispatchBody } from "@/lib/dispatch/isCursorCloudDispatchBody";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";

const baseBody: AgentRunDispatchBody = {
  prompt: "test",
  groupId: null,
  capabilityId: null,
};

describe("isCursorCloudDispatchBody", () => {
  it("detects cursor-cloud writer agent", () => {
    expect(
      isCursorCloudDispatchBody({ ...baseBody, writerAgent: "cursor-cloud" }),
    ).toBe(true);
  });

  it("detects cursor cloud executor device id", () => {
    expect(
      isCursorCloudDispatchBody({
        ...baseBody,
        targetDeviceId: CURSOR_CLOUD_EXECUTOR_DEVICE_ID,
      }),
    ).toBe(true);
  });

  it("returns false for mac dispatch bodies", () => {
    expect(
      isCursorCloudDispatchBody({ ...baseBody, targetDeviceId: "device-1" }),
    ).toBe(false);
  });
});
