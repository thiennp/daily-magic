import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

const ASK_DIR = "src/features/projects/askBox";

describe("project layout v2 L2 ask box", () => {
  it("sits in the main column between header and tabs", () => {
    const panel = read("src/features/projects/AwcProjectDetailPanel.tsx");
    const header = panel.indexOf("<AwcProjectDetailHeader");
    const ask = panel.indexOf("<AwcProjectAskBox");
    const tabs = panel.indexOf("<AwcProjectDetailTabBar");
    expect(header).toBeGreaterThan(-1);
    expect(ask).toBeGreaterThan(header);
    expect(tabs).toBeGreaterThan(ask);
  });

  it("reuses messenger send + inbox dispatch (no new API)", () => {
    const hook = read(`${ASK_DIR}/useAwcProjectAskBox.ts`);
    expect(hook).toContain("sendMessengerMessage");
    expect(hook).toContain("sendMessengerTask");
    expect(hook).not.toContain("fetch(");
    expect(hook).toContain("needsReply: true");
  });

  it("uses Product artifact EN strings", () => {
    const copy = read(`${ASK_DIR}/projectAskBoxCopy.constant.ts`);
    for (const value of [
      "What do you want the assistant to do?",
      "Send to",
      "All assistants",
      "Send options",
      "Needs a reply",
      "Assign as a specific task",
      "Computer path",
    ]) {
      expect(copy).toContain(`"${value}"`);
    }
    expect(copy).not.toMatch(/trợ lý|Gửi cho|\bbot\b|This Mac/);
  });

  it("is B/W/gray only (no Apple blue)", () => {
    for (const file of ["AwcProjectAskBox.tsx", "AwcProjectAskBoxBar.tsx", "AwcProjectAskBoxOptions.tsx", "AwcProjectAskBoxTaskFields.tsx"]) {
      expect(read(`${ASK_DIR}/${file}`)).not.toMatch(/blue-|indigo-|sky-|#0a6cf5|#4a97ff|#e5effe|#0d2749/i);
    }
  });
});
