import { describe, expect, it } from "vitest";

import { parseUpdateDeviceLabelBody } from "@/lib/agentWitch/parseUpdateDeviceLabelBody";

describe("parseUpdateDeviceLabelBody", () => {
  it("accepts a trimmed device label", () => {
    expect(parseUpdateDeviceLabelBody({ deviceLabel: " Office Mac " })).toBe(
      "Office Mac",
    );
  });

  it("rejects empty labels", () => {
    expect(parseUpdateDeviceLabelBody({ deviceLabel: "   " })).toBeUndefined();
  });
});
