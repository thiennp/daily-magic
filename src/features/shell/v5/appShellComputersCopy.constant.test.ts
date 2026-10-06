import { describe, expect, it } from "vitest";

import { THIS_MAC_DEVICE_BADGE_LABEL } from "@/components/ui/badge/thisMacDeviceBadgeLabel.constant";
import {
  APP_SHELL_COMPUTERS_COPY,
  SHELL_COMPUTERS_TITLE,
  formatComputersLatestLabel,
} from "@/features/shell/v5/appShellComputersCopy.constant";

describe("APP_SHELL_COMPUTERS_COPY (V5-2 locked EN)", () => {
  it("titles the section Computers (shell.computers.title, never Devices)", () => {
    expect(SHELL_COMPUTERS_TITLE).toBe("Computers");
    expect(APP_SHELL_COMPUTERS_COPY.heading).toBe("Computers");
  });

  it("names the user's computer This computer (never This Mac)", () => {
    expect(THIS_MAC_DEVICE_BADGE_LABEL).toBe("This computer");
    expect(APP_SHELL_COMPUTERS_COPY.thisComputer).toBe("This computer");
    const all = Object.values(APP_SHELL_COMPUTERS_COPY).join(" ");
    expect(all).not.toMatch(
      /This Mac|Macs|Devices|Add a computer|Thien's computer|Bundle|AWL|bot/,
    );
  });

  it("uses the locked empty + connect + update strings", () => {
    expect(APP_SHELL_COMPUTERS_COPY.empty).toBe("No computers connected yet.");
    expect(APP_SHELL_COMPUTERS_COPY.connectThis).toBe("Connect this computer");
    expect(APP_SHELL_COMPUTERS_COPY.connectAnother).toBe(
      "Connect another computer",
    );
    expect(APP_SHELL_COMPUTERS_COPY.updateDisabledOffline).toBe(
      "Offline — update when it's back.",
    );
    expect(APP_SHELL_COMPUTERS_COPY.updateDisabledRemote).toBe(
      "Update it from that computer.",
    );
  });

  it("uses the locked Cursor Cloud helper", () => {
    expect(APP_SHELL_COMPUTERS_COPY.cursorCloudHelper).toBe(
      "To have Cursor Cloud do a task, pick it when you send the task.",
    );
  });
});

describe("formatComputersLatestLabel (computers.latest, I12)", () => {
  it("formats Latest v{n} instead of Bundle jargon", () => {
    expect(formatComputersLatestLabel("260")).toBe("Latest v260");
    expect(formatComputersLatestLabel(" v261 ")).toBe("Latest v261");
  });

  it("returns null when the server version is unknown", () => {
    expect(formatComputersLatestLabel(null)).toBeNull();
    expect(formatComputersLatestLabel("  ")).toBeNull();
  });
});
