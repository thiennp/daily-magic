import { describe, expect, it } from "vitest";

import { dockTaskComputerTargets } from "@/features/projects/chatDock/dockTaskComputerTargets";

describe("dockTaskComputerTargets", () => {
  it("keeps assignable computers with clean This computer label", () => {
    expect(
      dockTaskComputerTargets([
        {
          id: "mc1",
          projectDisplayName: "This computer",
          memberKind: "computer",
          assignable: true,
          connectVersionStatus: "ok",
        },
        {
          id: "mc2",
          projectDisplayName: "Laptop",
          memberKind: "computer",
          assignable: false,
        },
        {
          id: "mc3",
          projectDisplayName: "Old",
          memberKind: "computer",
          assignable: true,
          connectVersionStatus: "too_old",
        },
        {
          id: "b1",
          projectDisplayName: "Wake",
          memberKind: "bot",
          assignable: true,
        },
      ]),
    ).toEqual([{ key: "mc1", label: "This computer", kind: "computer" }]);
  });

  it("falls back to This computer when name is empty", () => {
    expect(
      dockTaskComputerTargets([
        {
          id: "mc0",
          projectDisplayName: "  ",
          memberKind: "computer",
          assignable: true,
        },
      ]),
    ).toEqual([{ key: "mc0", label: "This computer", kind: "computer" }]);
  });
});
