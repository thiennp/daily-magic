import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { THIS_MAC_DEVICE_BADGE_LABEL } from "@/components/ui/badge/thisMacDeviceBadgeLabel.constant";

describe("MacDeviceRowMainContent", () => {
  it("MAC_DEVICES-002: keeps this Mac badge label without parentheses", () => {
    expect(THIS_MAC_DEVICE_BADGE_LABEL).toBe("this Mac");
  });

  it("MAC_DEVICES-002: renders bundle detail inline with the this Mac badge", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "MacDeviceRowMainContent.tsx"),
      "utf8",
    );

    expect(source).toContain("<MacDeviceThisMacBadge />");
    expect(source).toContain("{detailText ? (");
    expect(source).toContain("{detailText && !isThisMac ? (");
  });
});
