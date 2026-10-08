import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { shouldDockRestoredLiveFloater } from "@/features/shell/utils/shouldDockRestoredLiveFloater";

describe("shouldDockRestoredLiveFloater", () => {
  it("docks only once the restored run's modal is open", () => {
    expect(
      shouldDockRestoredLiveFloater({ isOpen: true, dockPending: true }),
    ).toBe(true);
    expect(
      shouldDockRestoredLiveFloater({ isOpen: false, dockPending: true }),
    ).toBe(false);
    expect(
      shouldDockRestoredLiveFloater({ isOpen: true, dockPending: false }),
    ).toBe(false);
  });

  it("is wired into the reload restorer so it never leaves the big modal open", () => {
    const source = readFileSync(
      path.join(
        process.cwd(),
        "src/features/shell/AppShellLiveFloaterRestorer.tsx",
      ),
      "utf8",
    );
    expect(source).toContain("dockPending.current = true;");
    expect(source).toContain("shouldDockRestoredLiveFloater(");
    expect(source).toContain("minimizeSendTaskModal();");
  });
});
