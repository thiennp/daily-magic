import { describe, expect, it } from "vitest";

import { THIS_MAC_DEVICE_BADGE_LABEL } from "@/components/ui/badge/thisMacDeviceBadgeLabel.constant";
import {
  APP_SHELL_DEVICES_COPY,
  formatDevicesLatestLabel,
} from "@/features/shell/v5/appShellDevicesCopy.constant";

describe("APP_SHELL_DEVICES_COPY (V5-2 locked EN)", () => {
  it("names the user's computer This computer (never This Mac)", () => {
    expect(THIS_MAC_DEVICE_BADGE_LABEL).toBe("This computer");
    expect(APP_SHELL_DEVICES_COPY.thisComputer).toBe("This computer");
    const all = Object.values(APP_SHELL_DEVICES_COPY).join(" ");
    expect(all).not.toMatch(/This Mac|Thien's computer|Bundle|AWL|bot/);
  });

  it("uses the locked connect + offline update strings", () => {
    expect(APP_SHELL_DEVICES_COPY.connectThis).toBe("Connect this computer");
    expect(APP_SHELL_DEVICES_COPY.connectAnother).toBe(
      "Connect another computer",
    );
    expect(APP_SHELL_DEVICES_COPY.updateDisabledOffline).toBe(
      "Offline — update when it's back.",
    );
  });
});

describe("formatDevicesLatestLabel (devices.latest, I12)", () => {
  it("formats Latest v{n} instead of Bundle jargon", () => {
    expect(formatDevicesLatestLabel("260")).toBe("Latest v260");
    expect(formatDevicesLatestLabel(" v261 ")).toBe("Latest v261");
  });

  it("returns null when the server version is unknown", () => {
    expect(formatDevicesLatestLabel(null)).toBeNull();
    expect(formatDevicesLatestLabel("  ")).toBeNull();
  });
});
