import { describe, expect, it } from "vitest";

import { applyThisComputerFolderGap } from "@/features/projects/overview/applyThisComputerFolderGap";
import type { OverviewSetupStep } from "@/features/projects/overview/overviewSetupStep.type";

const step = (id: string, done: boolean): OverviewSetupStep => ({
  id,
  title: id,
  hint: null,
  done,
  action: { kind: "none", label: "Done" },
});
const steps = [step("create", true), step("folder", true)];

describe("applyThisComputerFolderGap", () => {
  it("leaves the steps alone when this computer has a folder", () => {
    expect(applyThisComputerFolderGap(steps, false)).toBe(steps);
  });
  it("reopens only the folder step when this computer has none", () => {
    const out = applyThisComputerFolderGap(steps, true);
    expect(out[0]).toBe(steps[0]);
    expect(out[1]).toMatchObject({ id: "folder", done: false });
    expect(out[1].action).toMatchObject({ kind: "tab", tab: "resources" });
  });
});
