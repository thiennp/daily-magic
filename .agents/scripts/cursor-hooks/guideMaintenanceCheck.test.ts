import { describe, expect, it } from "vitest";

import {
  formatGuideReminder,
  sectionsForChangedPath,
} from "./guideMaintenanceCheck";

describe("guideMaintenanceCheck", () => {
  it("maps agent-witch feature paths to mac-bridge section", () => {
    const sections = sectionsForChangedPath("src/features/agent-witch/foo.ts");
    expect(sections.some((s) => s.id === "mac-bridge")).toBe(true);
  });

  it("maps server.ts to mac-bridge section", () => {
    const sections = sectionsForChangedPath("server.ts");
    expect(sections.some((s) => s.id === "mac-bridge")).toBe(true);
  });

  it("formatGuideReminder includes chapter paths", () => {
    const sections = sectionsForChangedPath("server.ts");
    const text = formatGuideReminder(sections);
    expect(text).toContain(
      "docs/guides/user-guide/04-mac-connect-and-bridge.md",
    );
    expect(text).toContain(
      "docs/guides/developer-guide/04-mac-bridge-awl-awb-awi.md",
    );
  });
});
