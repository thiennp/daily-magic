import { describe, expect, it } from "vitest";

import {
  CURSOR_CLOUD_EXECUTOR_DEVICE_ID,
  isCursorCloudExecutorDeviceId,
} from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";

describe("isCursorCloudExecutorDeviceId", () => {
  it("recognizes the cursor cloud sentinel device id", () => {
    expect(isCursorCloudExecutorDeviceId(CURSOR_CLOUD_EXECUTOR_DEVICE_ID)).toBe(
      true,
    );
    expect(isCursorCloudExecutorDeviceId("device-1")).toBe(false);
  });
});
