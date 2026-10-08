import { describe, expect, it } from "vitest";

import { buildAgentRunFinishedSummary } from "./buildAgentRunFinishedSummary";

/** 7daeea78: 812e1568 ended Done with only "Finished on your computer.". */
describe("buildAgentRunFinishedSummary", () => {
  it("uses the last progress step and the git change line", () => {
    const output = [
      "[[PROGRESS]]",
      "Inspecting workspace",
      "Examined the repository.",
      "[[PROGRESS]]",
      "Styled home and settings screens",
      "Applied the cozy pastel palette with soft shadows.",
      "[[NEXT_ACTIONS]]",
      "1. Review the screens",
    ].join("\n");

    expect(
      buildAgentRunFinishedSummary({
        output,
        gitChangeLine: "2 files changed, 618 insertions(+)",
      }),
    ).toBe(
      "Styled home and settings screens: Applied the cozy pastel palette with soft shadows. Changed: 2 files changed, 618 insertions(+).",
    );
  });

  it("falls back to the final answer line above next actions", () => {
    const output =
      'agent-witch@linux ~ $ agy -p "x"\nI updated README.md and index.html\n[[NEXT_ACTIONS]]\n1. Open the app';
    expect(buildAgentRunFinishedSummary({ output, gitChangeLine: null })).toBe(
      "I updated README.md and index.html.",
    );
  });

  it("says what changed when the agent printed nothing usable", () => {
    expect(
      buildAgentRunFinishedSummary({
        output: "error: interrupted\n",
        gitChangeLine: "2 files changed, 618 insertions(+)",
      }),
    ).toBe(
      "Finished on your computer. Changed: 2 files changed, 618 insertions(+).",
    );
    expect(
      buildAgentRunFinishedSummary({ output: "", gitChangeLine: null }),
    ).toBeNull();
  });
});
