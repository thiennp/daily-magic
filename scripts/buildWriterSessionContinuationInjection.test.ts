import { describe, expect, it } from "vitest";

import {
  buildWriterSessionColdContinuePrompt,
  buildWriterSessionContinuationInjectionBody,
} from "@agent-witch/live-memory";

describe("buildWriterSessionContinuationInjection", () => {
  it("builds cold continue prompt from prior turns", () => {
    const prompt = buildWriterSessionColdContinuePrompt({
      priorTurns: [
        {
          id: "t1",
          userPrompt: "Fix the login bug",
          assistantOutput: "Updated auth handler.",
          createdAt: "2026-01-01T00:00:00.000Z",
        },
      ],
      userMessage: "Add a test too",
    });

    expect(prompt).toContain("<prior_context>");
    expect(prompt).toContain("Fix the login bug");
    expect(prompt).toContain("Updated auth handler.");
    expect(prompt).toContain("New message:");
    expect(prompt).toContain("Add a test too");
  });

  it("truncates long assistant output in injection body", () => {
    const longOutput = `done ${"x".repeat(8_000)}`;
    const body = buildWriterSessionContinuationInjectionBody({
      turns: [
        {
          id: "t1",
          userPrompt: "hi",
          assistantOutput: longOutput,
          createdAt: "2026-01-01T00:00:00.000Z",
        },
      ],
      maxOutputCharsPerTurn: 100,
    });

    expect(body.length).toBeLessThan(longOutput.length);
    expect(body).toContain("…");
  });
});
