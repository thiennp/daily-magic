import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_CHAT_DOCK_COPY as C } from "@/features/projects/chatDock/projectChatDockCopy.constant";

const D = "src/features/projects/chatDock";
const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), D, relative), "utf8");

describe("L3 V5-4 Chat dock — shell contract", () => {
  it("FAB uses message glyph + dock title aria (no sticky tooltip)", () => {
    const fab = read("AwcProjectChatDockFab.tsx");
    expect(fab).toContain("AwcProjectChatDockMessageGlyph");
    expect(fab).toContain('C["dock.title"]');
    expect(fab).toContain("aria-label");
    expect(fab).not.toMatch(/data-tt|title=/);
    expect(read("AwcProjectChatDockMessageGlyph.tsx")).toContain("M4 6.5");
  });

  it("Full screen / Exit full screen / Minimise aria match locked verbs; full-screen is UI-only", () => {
    const head = read("AwcProjectChatDockHead.tsx");
    expect(head).toContain('C["dock.expand"]');
    expect(head).toContain('C["dock.exitFull"]');
    expect(head).toContain('C["dock.minimise"]');
    expect(head).toContain('full ? C["dock.titleFull"] : C["dock.title"]');
    expect(head).not.toContain("collapse");
    expect(read("AwcProjectChatDock.tsx")).toContain("AwcProjectAskBox");
    expect(read("AwcProjectChatDock.tsx")).not.toContain("fetch(");
  });

  it("mobile root clears bottom nav; viewer reason uses locked string + awc-disabled", () => {
    expect(read("projectChatDockClasses.constant.ts")).toContain("max-md:bottom-[4.75rem]");
    const viewer = read("AwcProjectChatDockViewerBanner.tsx");
    expect(viewer).toContain("awc-disabled");
    expect(viewer).toContain('C["disabled.viewerMessage"]');
    expect(C["disabled.viewerMessage"]).toBe("Viewers can't send messages.");
  });

  it("computer targets are task-only; people recipients stay dropped", () => {
    expect(read("dockTaskComputerTargets.ts")).toContain('memberKind !== "computer"');
    expect(read("dockTaskComputerTargets.ts")).not.toMatch(/people|person/i);
  });
});
