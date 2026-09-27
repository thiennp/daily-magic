import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  recordAgentRunEstimateActual,
  rememberAgentRunEstimate,
} from "../../../../../../scripts/agentRunEstimateHistory";
import { buildAgentWitchLocalEstimateHistoryPageBody } from "./buildAgentWitchLocalEstimateHistoryPage";

describe("buildAgentWitchLocalEstimateHistoryPageBody", () => {
  it("renders estimated and actual seconds for finished tasks", () => {
    const reportsDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "aw-estimate-page-"),
    );
    rememberAgentRunEstimate({
      reportsDir,
      agentRunId: "login",
      task: "fix the login form",
      writerLabel: "Claude CLI",
      estimateSeconds: 120,
      embedding: [],
    });
    recordAgentRunEstimateActual({
      reportsDir,
      agentRunId: "login",
      actualSeconds: 90,
    });

    const html = buildAgentWitchLocalEstimateHistoryPageBody({ reportsDir });

    expect(html).toContain("Estimates");
    expect(html).toContain("fix the login form");
    expect(html).toContain("Claude CLI");
    expect(html).toContain("2 min");
    expect(html).toContain("1 min 30s");
    expect(html).toContain("30s under");
  });
});
