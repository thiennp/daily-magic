import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

const read = (rel: string): string =>
  readFileSync(path.join(process.cwd(), rel), "utf8");

describe("One-window wave A (OW-H1 + OW-H4)", () => {
  it("feed copy matches locked empty / project_required / Try again", () => {
    expect(ONE_WINDOW_FEED_COPY.emptyTitle).toBe("No messages yet");
    expect(ONE_WINDOW_FEED_COPY.emptyBody).toBe(
      "Say hello or @ an assistant to assign work.",
    );
    expect(ONE_WINDOW_FEED_COPY.tryAgain).toBe("Try again");
    expect(ONE_WINDOW_FEED_COPY.projectRequired).toBe(
      "Pick a project first. Every message and task belongs to a project.",
    );
    expect(ONE_WINDOW_FEED_COPY.filterAll).toBe("All");
    expect(ONE_WINDOW_FEED_COPY.filterNeedsYou).toBe("Needs you");
    expect(ONE_WINDOW_FEED_COPY.filterApprovals).toBe("Approvals");
  });

  it("empty chrome shows title once via copy keys (soft needle)", () => {
    const empty = read(
      "src/features/projects/messenger/oneWindow/AwcOneWindowFeedEmpty.tsx",
    );
    expect(empty).toContain("copy.emptyTitle");
    expect(empty).toContain("copy.emptyBody");
    // Body is emptyBody only — not a second "No messages yet" heading string.
    expect(ONE_WINDOW_FEED_COPY.emptyBody.startsWith("No messages yet")).toBe(
      false,
    );
  });

  it("P1-S1: no Activity tab and no new One window tab (lives in Chat dock)", () => {
    const tabs = read("src/features/projects/projectPageTabs.constant.ts");
    expect(tabs).not.toContain('activity: "Activity"');
    expect(tabs).not.toContain("One window");
    expect(tabs).not.toContain("One-window");
  });

  it("never hides Marketplace, Connect, Automations, Download AgentWitch Local", () => {
    const nav = read("src/features/shell/appNav.constant.ts");
    expect(nav).toContain('label: "Marketplace"');
    expect(nav).toContain('label: "Connect"');
    expect(nav).toContain('label: "Automations"');
    const download = read(
      "src/features/shell/v5/appShellComputersCopy.constant.ts",
    );
    expect(download).toContain('download: "Download AgentWitch Local"');
  });

  it("fix-forward: chat dock, Access pending, hub approval modal stay referenced", () => {
    expect(
      readFileSync(
        path.join(
          process.cwd(),
          "src/features/projects/chatDock/AwcProjectChatDockFab.tsx",
        ),
        "utf8",
      ).length,
    ).toBeGreaterThan(0);
    expect(
      readFileSync(
        path.join(
          process.cwd(),
          "src/features/projects/access/AwcProjectAccessPendingList.tsx",
        ),
        "utf8",
      ).length,
    ).toBeGreaterThan(0);
    expect(
      readFileSync(
        path.join(
          process.cwd(),
          "src/features/dispatch/DispatchApprovalModal.tsx",
        ),
        "utf8",
      ).length,
    ).toBeGreaterThan(0);
  });

  it("feed chrome has no violet / MCP / OAuth / token / window_kind jargon", () => {
    const blob = JSON.stringify(ONE_WINDOW_FEED_COPY).toLowerCase();
    for (const bad of ["violet", "purple", "mcp", "oauth", "window_kind", " token", "token"]) {
      if (bad.trim() === "token") {
        expect(blob.includes('"token"') || blob.includes(" token")).toBe(false);
        continue;
      }
      expect(blob).not.toContain(bad.trim());
    }
    const chrome = read(
      "src/features/projects/messenger/oneWindow/awcOneWindowChrome.constant.ts",
    );
    expect(chrome.toLowerCase()).not.toContain("purple");
    expect(chrome.toLowerCase()).not.toContain("violet");
  });
});
