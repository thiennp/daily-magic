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

  it("two states only: button and full chat; Minimise is the only size control", () => {
    const head = read("AwcProjectChatDockHead.tsx");
    expect(head).toContain('C["dock.minimise"]');
    expect(head).toContain('C["dock.titleFull"]');
    expect(head).not.toContain("onToggleFull");
    const dock = read("AwcProjectChatDock.tsx");
    expect(dock).not.toContain("AwcProjectAskBox");
    expect(dock).toContain("AwcProjectMessengerSection");
    expect(dock).not.toContain("fetch(");
  });

  it("mobile button sits 50px from the right and bottom; full chat fills the screen", () => {
    const classes = read("projectChatDockClasses.constant.ts");
    expect(classes).toContain("max-md:bottom-[50px]");
    expect(classes).toContain("max-md:right-[50px]");
    expect(classes).toContain("max-md:inset-0");
  });

  it("computer targets are task-only; people recipients stay dropped", () => {
    expect(read("dockTaskComputerTargets.ts")).toContain(
      'memberKind !== "computer"',
    );
    expect(read("dockTaskComputerTargets.ts")).not.toMatch(/people|person/i);
  });
});
