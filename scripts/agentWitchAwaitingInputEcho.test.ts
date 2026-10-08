import { describe, expect, it } from "vitest";

import {
  AGENT_RUN_INPUT_GUARDRAILS,
  AGENT_RUN_INPUT_MARKER,
} from "./dispatch/agentRunInputGuardrails.constant";
import { isInstructionTemplateText } from "./agentWitchAwaitingInputEcho";
import { parseAwaitingInputFromOutput } from "./agentWitchRunSessionsAwaitingInput";

const sentPrompt = [
  "Fix the bug.",
  "Do not put [[PROGRESS]], [[NEXT_ACTIONS]], or [[AWAITING_INPUT]] inside the estimate block.",
  "4. Never use [[AWAITING_INPUT]] to ask the operator to confirm a time estimate.",
  "---",
  AGENT_RUN_INPUT_GUARDRAILS,
].join("\n");

describe("parseAwaitingInputFromOutput prompt echo", () => {
  it("ignores an echoed prompt with no reply delimiter (any writer)", () => {
    expect(
      parseAwaitingInputFromOutput(`${sentPrompt}\n`, { sentPrompt }),
    ).toBeNull();
    expect(
      parseAwaitingInputFromOutput(`${sentPrompt}\n`, {
        sentPrompt,
        requireCompleteQuestion: true,
      }),
    ).toBeNull();
  });

  it("ignores the echoed template even without knowing the prompt", () => {
    expect(parseAwaitingInputFromOutput(`${sentPrompt}\n`)).toBeNull();
  });

  it("finds a real question after the echo", () => {
    const output = `${sentPrompt}\nWorking.\n${AGENT_RUN_INPUT_MARKER}\nWhich week?\n`;
    expect(parseAwaitingInputFromOutput(output, { sentPrompt })?.question).toBe(
      "Which week?",
    );
  });

  it("ignores a marker inline in a sentence", () => {
    expect(
      parseAwaitingInputFromOutput(
        `I will not use ${AGENT_RUN_INPUT_MARKER} now.\nMore text.\n`,
      ),
    ).toBeNull();
  });

  it("keeps multi-line question parsing", () => {
    expect(
      parseAwaitingInputFromOutput(
        `x\n${AGENT_RUN_INPUT_MARKER}\nDo\nyou approve?\n\nWaiting.`,
      )?.question,
    ).toBe("Do you approve?");
  });
});

describe("isInstructionTemplateText", () => {
  it("flags questions captured from the instruction template", () => {
    expect(
      isInstructionTemplateText("inside the estimate block. 4. Never use"),
    ).toBe(true);
    expect(isInstructionTemplateText("Which week should I summarize?")).toBe(
      false,
    );
  });
});
