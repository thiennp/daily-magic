import { describe, expect, it } from "vitest";

import { dropRedundantAgentRunDetailLines } from "@/lib/dispatch/dropRedundantAgentRunDetailLines";

const HINT =
  "Codex isn't signed in on this computer. Run codex login in a terminal there, or pick another coding tool.";

describe("dropRedundantAgentRunDetailLines (d591ae31)", () => {
  it("drops the cut-off repeat of a full line", () => {
    const full = `Failed to prepare codex: ${HINT}`;
    expect(
      dropRedundantAgentRunDetailLines(`${full}\n${full.slice(0, 118)}…`, [
        HINT,
      ]),
    ).toBe(full);
  });

  it("drops a cut-off prepare line that only repeats the sentence above", () => {
    expect(
      dropRedundantAgentRunDetailLines(
        `Failed to prepare codex: ${HINT.slice(0, 90)}…`,
        [HINT],
      ),
    ).toBe("");
  });

  it("keeps distinct lines", () => {
    expect(
      dropRedundantAgentRunDetailLines("exit 1\nkilled by SIGKILL", [HINT]),
    ).toBe("exit 1\nkilled by SIGKILL");
  });
});
