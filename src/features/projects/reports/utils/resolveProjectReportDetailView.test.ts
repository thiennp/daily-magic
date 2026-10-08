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

  it("a wave-only output leaves an empty body (status row still shows)", () => {
    const view = resolveProjectReportDetailView({
      run: { ...baseRun, status: "failed", resultExitCode: 1 },
      fallbackOutput: WAVE_ONLY,
    });

    expect(view.body).toBe("");
    expect(view.statusLabel).toBe("Failed");
  });
});
