import { describe, expect, it } from "vitest";

import { syncWaveQaProgressCursor } from "./syncWaveQaProgressCursor";

const role = (passed: boolean) => ({ passed });

describe("syncWaveQaProgressCursor", () => {
  it("returns first incomplete page and role", () => {
    const cursor = syncWaveQaProgressCursor({
      pages: [
        {
          roles: {
            ux: role(true),
            copy: role(true),
            ui: role(true),
            product: role(true),
            tester: role(true),
            dx: role(true),
          },
        },
        {
          roles: {
            ux: role(true),
            copy: role(false),
            ui: role(false),
            product: role(false),
            tester: role(true),
            dx: role(true),
          },
        },
      ],
    });
    expect(cursor).toEqual({ currentPageIndex: 1, currentRole: "copy" });
  });

  it("returns last page when every role passed", () => {
    const allPassed = {
      ux: role(true),
      copy: role(true),
      ui: role(true),
      product: role(true),
      tester: role(true),
      dx: role(true),
    };
    const cursor = syncWaveQaProgressCursor({
      pages: [{ roles: allPassed }, { roles: allPassed }],
    });
    expect(cursor).toEqual({ currentPageIndex: 1, currentRole: "dx" });
  });
});
