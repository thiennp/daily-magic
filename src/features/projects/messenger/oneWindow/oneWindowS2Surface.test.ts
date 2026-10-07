import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const M = "src/features/projects/messenger";
const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

describe("P1-S2 One window — full-width Chat surface", () => {
  it("one column: no two-pane thread list, old list files are gone", () => {
    const section = read(`${M}/AwcProjectMessengerSection.tsx`);
    expect(section).toContain("OW_SURFACE_CLASS");
    expect(section).toContain("<AwcMessengerThreadPane");
    expect(section).not.toMatch(/ThreadList|MessengerPanels|mobileShowThread/);
    for (const gone of ["AwcProjectMessengerPanels", "AwcMessengerThreadList", "AwcMessengerThreadRow"]) {
      expect(existsSync(path.join(process.cwd(), `${M}/${gone}.tsx`))).toBe(false);
    }
  });

  it("whole feed by default; an assistant's feed gets ← Whole project", () => {
    expect(read(`${M}/hooks/useAwcProjectMessengerFeed.ts`)).toContain(
      "input.initialThreadKey ?? WHOLE_THREAD_KEY",
    );
    const pane = read(`${M}/AwcMessengerThreadPane.tsx`);
    expect(pane).toMatch(/\{showBack \? \(\s*<AwcMessengerThreadPaneHeader/);
    expect(read(`${M}/AwcMessengerThreadPaneHeader.tsx`)).toContain("← {copy.wholeName}");
  });

  it("keeps filters, in-feed approvals, timeline (scroll up loads older) and the composer", () => {
    const pane = read(`${M}/AwcMessengerThreadPane.tsx`);
    for (const part of ["AwcOneWindowFilterBar", "AwcOneWindowInFeedApprovals", "AwcMessengerTimeline", "AwcMessengerComposer"]) {
      expect(pane).toContain(part);
    }
    expect(read(`${M}/hooks/useMessengerTimelineScroll.ts`)).toContain("TOP_LOAD_THRESHOLD_PX");
  });

  it("Chat dock full view hosts it full width and re-opens on a new thread", () => {
    const dock = read("src/features/projects/chatDock/AwcProjectChatDock.tsx");
    expect(dock).toContain("hasOwnerComputer={projectHasOwnerComputer(project)}");
    expect(dock).toContain("key={`${chat.refreshKey}:${chat.threadKey ?? \"\"}`}");
    expect(read("src/features/projects/chatDock/projectChatDockClasses.constant.ts")).toMatch(
      /CHAT_DOCK_BODY_FULL_CLASS =\s*"flex min-h-0 flex-1 flex-col overflow-hidden bg-awc-surface"/,
    );
  });
});
