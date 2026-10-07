import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  formatProjectConnectionsCopy,
  PROJECT_CONNECTIONS_COPY as C,
} from "@/features/projects/settings/connections/projectConnectionsCopy.constant";

describe("projectConnectionsCopy", () => {
  it("ships COPY.md soft needles (Expired, assistants reconnect, short error)", () => {
    expect(C.statusExpired).toBe("Expired");
    expect(C.statusExpired).not.toBe("Sign-in expired");
    expect(C.reconnectHint).toContain("so assistants can keep using");
    expect(C.error).toBe("Could not load connections. Try again.");
    expect(C.vsResources).toContain("Pasted links in Resources stay bookmarks");
    expect(C.vsConnectHint).toBe(
      "Connect pairs this computer. Connections link services for this project.",
    );
    expect(C.unavailable).toBe(
      "Connections are not available on this deploy yet.",
    );
    expect(formatProjectConnectionsCopy(C.disconnectTitle, { service: "Slack" })).toBe(
      "Disconnect Slack?",
    );
  });

  it("Settings panel mounts Connections after folder, before danger", () => {
    const panel = readFileSync(
      path.join(
        process.cwd(),
        "src/features/projects/AwcProjectDetailSettingsPanel.tsx",
      ),
      "utf8",
    );
    expect(panel).toContain("AwcProjectConnectionsSection");
    // Use the JSX return body so import order does not fake the mount order.
    const body = panel.slice(panel.indexOf("return ("));
    const folderAt = body.indexOf("<AwcProjectSettingsFolderRow");
    const connAt = body.indexOf("<AwcProjectConnectionsSection");
    const dangerAt = body.indexOf("<AwcProjectSettingsDangerZone");
    expect(folderAt).toBeGreaterThan(-1);
    expect(connAt).toBeGreaterThan(folderAt);
    expect(dangerAt).toBeGreaterThan(connAt);
  });
});
