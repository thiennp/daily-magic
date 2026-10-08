import { describe, expect, it } from "vitest";

import { resolveProjectReportDetailView } from "@/features/projects/reports/utils/resolveProjectReportDetailView";

const baseRun = {
  status: "completed" as const,
  reportStatus: "in_progress",
  reportSummary: null,
  denialReason: null,
  resultOutput: null,
  resultExitCode: 0,
};

describe("resolveProjectReportDetailView (b8c56ef0, Testi run 3)", () => {
  it("completed run with collapsed meta resultOutput and cached summary => body is that summary, label Done", () => {
    const view = resolveProjectReportDetailView({
      run: {
        ...baseRun,
        reportStatus: null,
        reportSummary: null,
      },
      fallbackOutput: "some output",
      cached: {
        reportStatus: "completed",
        reportSummary:
          "Added dark-mode toggle to index.html and documented it in README.",
      },
    });

    expect(view.statusLabel).toBe("Done");
    expect(view.body).toBe(
      "Added dark-mode toggle to index.html and documented it in README.",
    );
  });

  it("completed run, no summary, fallbackOutput = collapsed meta => body has no '[[' and no 'W|'", () => {
    const collapsedMeta =
      "[[WAVE_PLAN]] W|1|Implement dark mode|30 A|1.1|Add dark-mode toggle to index.html|30 W|2|Document feature|20 A|2.1|Add f…";
    const view = resolveProjectReportDetailView({
      run: {
        ...baseRun,
        reportStatus: null,
        reportSummary: null,
      },
      fallbackOutput: collapsedMeta,
    });

    expect(view.body).not.toContain("[[");
    expect(view.body).not.toContain("W|");
    expect(view.body).toBe(""); // should be empty after stripping
  });

  it("failed+stopped run => label Stopped, body 'Stopped by user.'", () => {
    const view = resolveProjectReportDetailView({
      run: {
        ...baseRun,
        status: "failed",
        resultExitCode: 130, // user stopped exit code
      },
      fallbackOutput: "error: interrupted Stopped by user.",
    });

    expect(view.statusLabel).toBe("Stopped");
    expect(view.body).toBe("Stopped by user.");
  });

  it("running run, reportStatus null, cached { reportStatus: 'in_progress', reportSummary: 'Waiting for your answer: Can you confirm the folder?' } => label 'Waiting for your answer', body contains 'Can you confirm the folder?'", () => {
    const view = resolveProjectReportDetailView({
      run: {
        ...baseRun,
        status: "running",
        reportStatus: null,
        reportSummary: null,
      },
      fallbackOutput: "running output",
      cached: {
        reportStatus: "in_progress",
        reportSummary: "Waiting for your answer: Can you confirm the folder?",
      },
    });

    expect(view.statusLabel).toBe("Waiting for your answer");
    expect(view.body).toContain("Can you confirm the folder?");
  });

  it("running run with no report status still shows a Running status row", () => {
    const view = resolveProjectReportDetailView({
      run: {
        ...baseRun,
        status: "running",
        reportStatus: null,
        reportSummary: null,
      },
      fallbackOutput: "Inspected 12 files.\n[[PROGRESS]]\n2.1|working",
    });

    expect(view.statusLabel).toBe("Running");
    expect(view.body).toBe("Inspected 12 files.");
  });
});
