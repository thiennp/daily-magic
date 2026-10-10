import { describe, expect, it } from "vitest";

import { formatAgentLiveTerminalMarkersForDisplay } from "@/features/agent/utils/formatAgentLiveTerminalMarkersForDisplay";
import { formatAgentRunPartialOutputForDisplay } from "@/features/agent/utils/formatAgentRunPartialOutputForDisplay";
import { resolveAgentLiveProgressUpdatesFromSources } from "@/features/agent/utils/resolveAgentLiveProgressUpdatesFromSources";
import { stripAgentLiveProgressCliChrome } from "@/features/agent/utils/stripAgentLiveProgressCliChrome";
import { stripAgentRunReportMarkerFragments } from "@/features/projects/reports/public-api/types";

/** Exact strings from Thien's ask modal screenshot (qa/ask-context/thien-2126.png). */
const SCREENSHOT_JUNK = [
  ", [[NEXT_ACTIONS]], or [[AWAITING_INPUT]] inside the estimate block.",
  "4. Never use [[AWAITING_INPUT]] to ask the operator to confirm an estimate — proceed automatically.",
  "finding so the operator sees enriched results.",
  "7. Do not nest [[PROGRESS]], [[NEXT_ACTIONS]], or [[AWAITING_INPUT]] inside wave blocks.",
  "\u001b[36muser\u001b[0m",
  "[36muser [0m",
];
const TASK_LINE =
  "Match design screens f1-* onboarding (welcome, sign-in, privacy, add baby, units, notif) and f2-* multi-baby (switcher, add, twins, edit, archive, delete, restore). Edit src; build; commit.";
const AGENT_LINE = "Built the onboarding screens.";
const output = [...SCREENSHOT_JUNK, TASK_LINE, AGENT_LINE].join("\n");

const expectClean = (text: string): void => {
  expect(text).not.toMatch(/\[\[|\u001b|\[36m|\[0m/);
  expect(text).not.toMatch(
    /Never use|Do not nest|estimate block|enriched results/,
  );
  expect(text).not.toMatch(/^user$/m);
  expect(text).toContain(AGENT_LINE);
};

describe("aedfe094: one cleaner on every surface", () => {
  it("ask card Context so far", () => {
    const formatted = formatAgentRunPartialOutputForDisplay(output);
    expectClean(JSON.stringify(formatted.sections));
    expect(formatted.progressUpdates).toEqual([]);
  });

  it("progress feed (cleaned text and no fake [[PROGRESS]] updates)", () => {
    expectClean(stripAgentLiveProgressCliChrome(output));
    expect(resolveAgentLiveProgressUpdatesFromSources(output, output)).toEqual(
      [],
    );
  });

  it("terminal mirror", () => {
    const shown = formatAgentLiveTerminalMarkersForDisplay(output);
    expectClean(shown);
    expect(shown).toContain(TASK_LINE);
  });

  it("reports body", () => {
    expectClean(
      stripAgentRunReportMarkerFragments(
        stripAgentLiveProgressCliChrome(output),
      ),
    );
  });

  it("keeps real [[PROGRESS]] blocks for the feed parser", () => {
    expect(
      resolveAgentLiveProgressUpdatesFromSources(
        [
          "\u001b[36muser\u001b[0m",
          "[[PROGRESS]]",
          "Reading files",
          "Opened brief.md",
        ].join("\n"),
      ),
    ).toEqual([{ title: "Reading files", detail: "Opened brief.md" }]);
  });
});
