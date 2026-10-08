import { describe, expect, it } from "vitest";

import { buildAgentLiveTerminalDisplay } from "@/features/agent/utils/buildAgentLiveTerminalDisplay";
import { resolveProjectReportDetailView } from "@/features/projects/reports/utils/resolveProjectReportDetailView";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** Testi run 4 @298 (8782ece8): checkpoint answered, continuation re-printed the block. */
const RUN4_TRANSCRIPT = [
  'agent-witch@mac ~ % agy --sandbox -p "Run workflow: Add vibe coding app feature"',
  "Preparing Antigravity for this session…",
  "[[WAVE_PLAN]]",
  "W|1|Confirm requirements|50",
  "A|1.1|Inspect project|20",
  "[[WAVE_STATUS]]",
  "1.1|working",
  "[[PROGRESS]]",
  "Inspected app repository",
  "Examined the static HTML app.",
  "",
  "### Checkpoint 1: Confirm Details",
  "",
  "We are ready to implement.",
  "- App folder: /home/box/qa-vibe-app",
  "",
  "[[AWAITING_INPUT]]",
  "Do you confirm the vibe?",
  "[[CHECKPOINT_QA]]",
  "Q: Do you confirm the vibe?",
  "A: Confirmed. Proceed.",
  "agent-witch@mac ~ % ",
  "[[WAVE_PLAN]]",
  "W|1|Confirm requirements|50",
  "[[PROGRESS]]",
  "Inspected app repository",
  "Examined the static HTML app.",
  "",
  "### Checkpoint 1: Confirm Details",
  "",
  "We are ready to implement.",
  "- App folder: /home/box/qa-vibe-app",
  "",
  "[[AWAITING_INPUT]]",
  "Do you confirm the vibe?",
  "## Summary",
  "Added a dark mode toggle to index.html and a README note.",
  "",
].join("\n");

const count = (text: string, needle: string): number =>
  text.split(needle).length - 1;

describe("run 4 @298 transcript (db0bd005 / 85e73e72)", () => {
  it("Reports What happened keeps the final summary once, without markers", () => {
    const view = resolveProjectReportDetailView({
      run: {
        status: "completed",
        reportSummary: null,
        reportStatus: null,
        denialReason: null,
        resultOutput: "Run workflow: Add vibe coding app feature",
        resultExitCode: 0,
      } satisfies Partial<AgentRunRecord>,
      fallbackOutput: RUN4_TRANSCRIPT,
      cached: {
        reportSummary:
          "Waiting for confirmation of vibe, screen, and app folder.",
      },
    });

    expect(view.statusLabel).toBe("Done");
    expect(view.body).toContain(
      "Added a dark mode toggle to index.html and a README note.",
    );
    expect(view.body).not.toContain("[[");
    expect(view.body).not.toContain("Preparing Antigravity");
    expect(count(view.body, "### Checkpoint 1")).toBe(1);
  });

  it("the terminal mirror shows no raw markers and the checkpoint once", () => {
    const display = buildAgentLiveTerminalDisplay({
      output: RUN4_TRANSCRIPT,
      status: "finished",
      platform: "linux",
    });

    expect(display).not.toContain("[[");
    expect(display).not.toMatch(/^[WA]\|/m);
    expect(count(display, "Agent asks: Do you confirm the vibe?")).toBe(1);
    expect(count(display, "Your answer: Confirmed. Proceed.")).toBe(1);
    expect(count(display, "### Checkpoint 1")).toBe(1);
    expect(display).toContain("## Summary");
    expect(display).toContain("agent-witch@linux ~ $");
  });
});
