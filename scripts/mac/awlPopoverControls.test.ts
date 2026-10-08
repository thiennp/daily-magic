import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(
    join(process.cwd(), "apps/mac/Sources/AgentWitchLocal", relative),
    "utf8",
  );

describe("eb0fcdf9: AWL Stop/Restart controls", () => {
  it("popover draws its own Stop/Restart labels (no blank .bordered label) and wires Restart", () => {
    const popover = read("MacAppMenuBarContentView.swift");
    expect(popover).toContain(
      'popoverActionButton("Restart", prominent: false) { controller.restartCore() }',
    );
    expect(popover).toContain(
      'popoverActionButton("Stop", prominent: false) { controller.stopCore() }',
    );
    expect(popover).not.toMatch(
      /Button\("Stop"\)[^\n]*\n\s*\.buttonStyle\(\.bordered\)/,
    );
  });

  it("Computer window offers Restart next to Stop for the selected account", () => {
    const computer = read("Views/ComputerView.swift");
    expect(computer).toContain("controller.restartCore()");
    expect(computer).toContain(
      'Label("Restart", systemImage: "arrow.clockwise")',
    );
  });
});
