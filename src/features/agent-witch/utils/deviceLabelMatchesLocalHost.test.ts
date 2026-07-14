import { describe, expect, it } from "vitest";

import { deviceLabelMatchesLocalHost } from "@/features/agent-witch/utils/deviceLabelMatchesLocalHost";

describe("deviceLabelMatchesLocalHost", () => {
  it("matches hostnames case-insensitively", () => {
    expect(deviceLabelMatchesLocalHost("Studio-Mac", "studio-mac")).toBe(true);
  });

  it("ignores a trailing .local suffix", () => {
    expect(
      deviceLabelMatchesLocalHost("Studio-Mac.local", "Studio-Mac"),
    ).toBe(true);
  });

  it("returns false for different machines", () => {
    expect(deviceLabelMatchesLocalHost("Office-iMac", "Studio-Mac")).toBe(
      false,
    );
  });
});
