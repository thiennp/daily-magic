import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  resolveAgentWitchLocalLayout,
  sanitizeProfileEmailForDir,
  sanitizeProfileEmailForLaunchAgentLabel,
} from "./resolveAgentWitchLocalLayout";

describe("sanitizeProfileEmailForDir", () => {
  it("normalizes email casing and whitespace", () => {
    expect(sanitizeProfileEmailForDir("  NguyenPhongThien@Gmail.COM ")).toBe(
      "nguyenphongthien@gmail.com",
    );
  });
});

describe("sanitizeProfileEmailForLaunchAgentLabel", () => {
  it("builds a launchd-safe suffix", () => {
    expect(
      sanitizeProfileEmailForLaunchAgentLabel("nguyenphongthien@gmail.com"),
    ).toBe("nguyenphongthien-at-gmail-com");
  });
});

describe("resolveAgentWitchLocalLayout", () => {
  it("uses profile-scoped paths when email is provided", () => {
    const layout = resolveAgentWitchLocalLayout("nguyenphongthien@gmail.com");

    expect(layout.profileEmail).toBe("nguyenphongthien@gmail.com");
    expect(layout.configPath).toBe(
      path.join(
        os.homedir(),
        ".agent-witch",
        "profiles",
        "nguyenphongthien@gmail.com",
        "config.json",
      ),
    );
    expect(layout.harnessRootDir).toBe(
      path.join(
        os.homedir(),
        ".agent-witch",
        "profiles",
        "nguyenphongthien@gmail.com",
        "harness",
      ),
    );
  });

  it("falls back to legacy root paths without a profile email", () => {
    const layout = resolveAgentWitchLocalLayout(null);

    expect(layout.profileEmail).toBe(null);
    expect(layout.configPath).toBe(
      path.join(os.homedir(), ".agent-witch", "config.json"),
    );
    expect(layout.harnessRootDir).toBe(
      path.join(os.homedir(), ".agent-witch", "harness"),
    );
  });
});
