import { describe, expect, it } from "vitest";

import { AGENT_RUN_INPUT_MARKER } from "./dispatch/agentRunInputGuardrails.constant";

import { parseAwaitingInputFromOutput } from "./agentWitchRunSessions";

describe("parseAwaitingInputFromOutput", () => {
  it("extracts the first line after the marker as the question", () => {
    const parsed = parseAwaitingInputFromOutput(
      `Working on the report.\n${AGENT_RUN_INPUT_MARKER}\nWhich week should I summarize?`,
    );

    expect(parsed).toEqual({
      question: "Which week should I summarize?",
      partialOutput: "Working on the report.",
    });
  });

  it("joins a question wrapped across lines until a blank line", () => {
    const parsed = parseAwaitingInputFromOutput(
      `Plan ready.\n${AGENT_RUN_INPUT_MARKER}\nDo\nyou approve checkpoint 1.2?\n\nWaiting.`,
    );

    expect(parsed).toEqual({
      question: "Do you approve checkpoint 1.2?",
      partialOutput: "Plan ready.",
    });
  });

  it("returns null when the marker is missing", () => {
    expect(parseAwaitingInputFromOutput("done")).toBeNull();
  });
});
