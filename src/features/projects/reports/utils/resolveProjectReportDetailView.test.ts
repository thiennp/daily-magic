import { describe, expect, it } from "vitest";

import { resolveProjectReportDetailView } from "@/features/projects/reports/utils/resolveProjectReportDetailView";

const WAVE_ONLY = [
  "[[WAVE_PLAN]]",
  "W|1|Setup and specification|60",
  "A|1.1|Confirm vibe and app folder|30",
  "W|2|Implement dark mode|90",
  "A|2.1|Add toggle to index.html|45",
].join("\n");

const baseRun = {
  status: "completed" as const,
  reportStatus: "in_progress",
  reportSummary: null,
  denialReason: null,
  resultOutput: null,
  resultExitCode: 0,
};

describe("resolveProjectReportDetailView (FAIL2 a76d46ac)", () => {
  it("never shows raw wave markers; keeps the final answer and a Done status", () => {
    const view = resolveProjectReportDetailView({
      run: baseRun,
      fallbackOutput: `${WAVE_ONLY}\n[[WAVE_STATUS]]\n1.1|done\n2.1|done\nFeature Complete: Dark Mode Toggle`,
    });

    expect(view.statusLabel).toBe("Done");
    expect(view.body).toBe("Feature Complete: Dark Mode Toggle");
    expect(view.body).not.toContain("[[");
  });

  it("a finished run ignores a stuck 'Waiting for your answer' summary", () => {
    const view = resolveProjectReportDetailView({
      run: {
        ...baseRun,
        reportSummary:
          "Waiting for your answer: Can you review and approve the dark mode chang",
      },
      fallbackOutput: "Thank you for approving. Dark mode is in index.html.",
    });

    expect(view.body).toBe(
      "Thank you for approving. Dark mode is in index.html.",
    );
  });

  it("a terminal run ignores a stuck 'Waiting for confirmation of vibe...' cached summary", () => {
    const view = resolveProjectReportDetailView({
      run: baseRun,
      cached: {
        reportSummary: "Waiting for confirmation of vibe...",
      },
      fallbackOutput: "Fallback output.",
    });

    expect(view.body).toBe("Fallback output.");
  });

  it("prefers a real report summary", () => {
    const view = resolveProjectReportDetailView({
      run: {
        ...baseRun,
        reportStatus: "completed",
        reportSummary: "Implemented dark mode toggle in index.html.",
      },
      fallbackOutput: WAVE_ONLY,
    });

    expect(view.body).toBe("Implemented dark mode toggle in index.html.");
  });

  it("Done run with output with PROGRESS/AWAITING_INPUT/CHECKPOINT_QA markers must yield body containing final summary and no marker text", () => {
    const view = resolveProjectReportDetailView({
      run: baseRun,
      fallbackOutput: `[[PROGRESS]]\nSome progress\n[[AWAITING_INPUT]]\nQuestion?\n[[CHECKPOINT_QA]]\nQ: Question?\nA: Yes\nfinal markdown summary`,
    });

    expect(view.body).toContain("final markdown summary");
    expect(view.body).not.toContain("[[");
  });

  it("Done run with empty output -> fallback", () => {
    const view = resolveProjectReportDetailView({
      run: { ...baseRun, status: "completed" },
      fallbackOutput: "   ",
    });

    expect(view.body).toBe(
      "Finished on your computer. No summary was captured.",
    );
  });

  it("Failed exit -1 with empty output -> fallback mentioning failure", () => {
    const view = resolveProjectReportDetailView({
      run: { ...baseRun, status: "failed", resultExitCode: -1 },
      fallbackOutput: WAVE_ONLY,
    });

    expect(view.body).toBe(
      "Failed on your computer (exit -1). No agent output was captured.",
    );
    expect(view.statusLabel).toBe("Failed");
  });
});
