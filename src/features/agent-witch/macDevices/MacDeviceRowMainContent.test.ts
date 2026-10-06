import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { THIS_MAC_DEVICE_BADGE_LABEL } from "@/components/ui/badge/thisMacDeviceBadgeLabel.constant";

describe("MacDeviceRowMainContent", () => {
  it("MAC_DEVICES-002: keeps this computer badge label without parentheses", () => {
    expect(THIS_MAC_DEVICE_BADGE_LABEL).toBe("This computer");
  });

  it("MAC_DEVICES-002: renders bundle detail inline with the this computer badge", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "MacDeviceRowMainContent.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("<MacDeviceThisMacBadge />");
    expect(source).toContain("{detailText ? (");
    expect(source).toContain("{detailText && !isThisMac && !showAnotherComputerBadge ? (");
  });
});

describe("MacDeviceRowMainContent another-computer seat badge", () => {
  it("can render Another computer badge when picker requests it", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/agent-witch/macDevices/MacDeviceRowMainContent.tsx",
      ),
      "utf8",
    );
    expect(source).toContain("showAnotherComputerBadge");
    expect(source).toContain("MacDeviceAnotherComputerBadge");
  });
});
