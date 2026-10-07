import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), "src/features/projects", relative), "utf8");

describe("P1-S1b assistant row — wake status + one-box connect", () => {
  it("no hard-coded Ready: status comes from the wake resolver + GET health", () => {
    const row = read("members/AwcProjectMembersHelperRow.tsx");
    expect(row).not.toContain("helpersReady");
    expect(row).toContain("resolveRailAssistantWakeStatus");
    expect(row).toContain("useAssistantWakeHealth");
    expect(row).toContain("W.pasteNew");
  });

  it("#wake-link-<id> opens the one-box connect in the rail", () => {
    const row = read("members/AwcProjectMembersHelperRow.tsx");
    expect(row).toContain("useWakeLinkOpenRequest");
    expect(row).toContain("awcGrokWakeLinkHash(member.id)");
    expect(read("members/AwcProjectMembersHelpersSection.tsx")).toContain(
      "useAwcProjectAccessWakeLinks",
    );
    expect(read("access/hooks/useWakeLinkOpenRequest.ts")).toContain(
      'textarea[name="grok-wake-connect"]',
    );
  });

  it("plain status words", () => {
    expect(C.helpersWake).toEqual({
      ready: "Ready",
      checks_on_demand: "Checks on demand",
      checking: "Checking…",
      cant_reach: "Can't reach it",
      not_connected: "Not connected",
    });
  });
});
