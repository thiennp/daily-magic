import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { readAgentRunReportFile } from "./agentWitchRunReport";
import { runAgentRunPreEstimate } from "./runAgentRunPreEstimate";

describe("runAgentRunPreEstimate", () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "aw-estimate-"));
  const previousHome = process.env.AGENT_WITCH_HOME;
  const previousProfile = process.env.AGENT_WITCH_PROFILE;
  const previousEmail = process.env.AGENT_WITCH_EMAIL;

  afterEach(() => {
    vi.unstubAllGlobals();
    if (previousHome === undefined) {
      delete process.env.AGENT_WITCH_HOME;
    } else {
      process.env.AGENT_WITCH_HOME = previousHome;
    }
    if (previousProfile === undefined) {
      delete process.env.AGENT_WITCH_PROFILE;
    } else {
      process.env.AGENT_WITCH_PROFILE = previousProfile;
    }
    if (previousEmail === undefined) {
      delete process.env.AGENT_WITCH_EMAIL;
    } else {
      process.env.AGENT_WITCH_EMAIL = previousEmail;
    }
  });

  it("records seconds from Ollama without calling the task writer", async () => {
    process.env.AGENT_WITCH_HOME = home;
    delete process.env.AGENT_WITCH_PROFILE;
    delete process.env.AGENT_WITCH_EMAIL;
    const reportsDir = path.join(home, "reports");
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (String(url).endsWith("/api/embeddings")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ embedding: [1, 0] }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            message: { content: "[[WORKING_ESTIMATE]]\n120" },
          }),
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await runAgentRunPreEstimate({
      wrappedPrompt: "run the tests",
      reportKey: "report-1",
      agentRunId: "run-1",
      writerLabel: "Claude CLI",
      reportsDir,
      estimateModel: "test-estimate-model",
    });

    expect(result.estimateSeconds).toBe(120);
    expect(result.estimateSummary).toContain("2 min");
    const requestBody = JSON.parse(
      String(
        (
          fetchMock.mock.calls.find((call) =>
            String(call[0]).endsWith("/api/chat"),
          )?.[1] as { body?: string } | undefined
        )?.body,
      ),
    ) as { messages?: { content?: string }[] };
    expect(requestBody.messages?.[0]?.content).toContain("Claude CLI");
    expect(requestBody.messages?.[0]?.content).toContain(
      "already starting in parallel",
    );
    expect(requestBody.messages?.[0]?.content).toContain(
      "latest finished tasks below",
    );
    expect(requestBody.messages?.[0]?.content).toContain(
      "No finished tasks with a recorded duration yet.",
    );
    const report = readAgentRunReportFile("report-1");
    expect(report?.estimateSeconds).toBe(120);
    expect(report?.userSummary).toContain("2 min");
  });

  it("leaves the report unwritten when Ollama returns no estimate", async () => {
    process.env.AGENT_WITCH_HOME = home;
    delete process.env.AGENT_WITCH_PROFILE;
    delete process.env.AGENT_WITCH_EMAIL;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("connect ECONNREFUSED")),
    );

    const result = await runAgentRunPreEstimate({
      wrappedPrompt: "run the tests",
      reportKey: "report-missing",
      agentRunId: "run-2",
      writerLabel: "Cursor agent CLI",
      reportsDir: path.join(home, "reports"),
    });

    expect(result.estimateSeconds).toBeNull();
    expect(readAgentRunReportFile("report-missing")).toBeNull();
  });
});
