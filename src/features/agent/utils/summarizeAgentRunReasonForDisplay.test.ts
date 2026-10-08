import { describe, expect, it } from "vitest";

import { sanitizeSkillTextForDisplay } from "@/features/agent/utils/sanitizeSkillTextForDisplay";
import {
  AGENT_RUN_REASON_FALLBACK,
  summarizeAgentRunReasonForDisplay,
} from "@/features/agent/utils/summarizeAgentRunReasonForDisplay";

/** Legacy Home "Needs your attention" rows from Testi's 6of8 retest (H-6). */
const CODEX_BANNER = [
  "OpenAI Codex v0.144.6",
  "--------",
  "\u001b[1mworkdir:\u001b[0m /Users/thiennguyen/baby-care",
  "\u001b[1mmodel:\u001b[0m gpt-5.6-sol",
  "\u001b[1mprovider:\u001b[0m openai",
  "\u001b[1mapproval:\u001b[0m never",
  "\u001b[1msandbox:\u001b[0m workspace-write",
  "--------",
  "ERROR: stream disconnected before completion",
].join("\n");

const ESCAPED_BANNER =
  "OpenAI Codex v0.144.6\\n--------\\n\\u001b[1mworkdir:\\u001b[0m /Users/thiennguyen/baby-care\\n\\u001b[1mmodel:\\u001b[0m gpt-5.6-sol\\n--------\\nThe tests failed in src/alerts.ts";

const WRITER_EXECUTION =
  "[[AGENT_RUN_WRITER_EXECUTION]] agentRunWriterExecutionBackend=cli-writer-api-key-missing agentRunWriterExecutionReasonCode=MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY";

const SKILL_PROMPT = [
  "Add a feeding log screen to baby-care",
  "",
  "---",
  "A local Ollama sidecar records the initial time estimate while you work. Do not wait for it.",
  "Do not emit [[WORKING_ESTIMATE]] before you start the task.",
  "Emit an updated estimate only if your plan changes significantly:",
  "1. Put this marker on its own line:",
  "[[WORKING_ESTIMATE]]",
  "2. On the next line, emit only an integer number of seconds (for example: 120).",
  "3. Do not put [[PROGRESS]], [[NEXT_ACTIONS]], or [[AWAITING_INPUT]] inside the estimate block.",
  "4. Never use [[AWAITING_INPUT]] to ask the operator to confirm an estimate — proceed automatically.",
  "",
  "When the work can be split, prefer small waves and delegate independent pieces to subagents:",
  "1. Soon after you start, emit a plan:",
  "[[WAVE_PLAN]]",
].join("\n");

const hasNoInternals = (text: string) => {
  expect(text).not.toMatch(/\u001b|\\u001b|\[\[|\]\]|=cli-|agentRun\w*=/);
};

describe("summarizeAgentRunReasonForDisplay (aedfe094 legacy rows)", () => {
  it("drops the raw Codex banner and ANSI codes", () => {
    const reason = summarizeAgentRunReasonForDisplay({ raw: CODEX_BANNER });
    hasNoInternals(reason);
    expect(reason).not.toMatch(/OpenAI Codex|workdir|model:/);
  });

  it("decodes JSON-escaped stored text before cleaning", () => {
    const reason = summarizeAgentRunReasonForDisplay({ raw: ESCAPED_BANNER });
    hasNoInternals(reason);
    expect(reason).toBe("The tests failed in src/alerts.ts");
  });

  it("maps the writer-execution backend code to plain copy", () => {
    const reason = summarizeAgentRunReasonForDisplay({
      raw: WRITER_EXECUTION,
      writerAgent: "claude-cli",
    });
    hasNoInternals(reason);
    expect(reason).toMatch(/^Claude Code isn't signed in on this computer/);
  });

  it("never shows an empty or marker-only reason", () => {
    expect(
      summarizeAgentRunReasonForDisplay({ raw: "[[PROGRESS]]\n\u001b[0m" }),
    ).toBe(AGENT_RUN_REASON_FALLBACK);
    expect(summarizeAgentRunReasonForDisplay({ raw: null })).toBe("");
  });

  it("keeps a plain reason as it is", () => {
    expect(
      summarizeAgentRunReasonForDisplay({
        raw: "The build failed: missing module react-native-svg",
      }),
    ).toBe("The build failed: missing module react-native-svg");
  });
});

describe("sanitizeSkillTextForDisplay (Save as skill? draft)", () => {
  it("cuts the harness rules off a stored prompt", () => {
    const text = sanitizeSkillTextForDisplay(SKILL_PROMPT);
    hasNoInternals(text);
    expect(text).toBe("Add a feeding log screen to baby-care");
  });

  it("cuts flattened single-line harness text too", () => {
    const text = sanitizeSkillTextForDisplay(SKILL_PROMPT.replace(/\n+/g, " "));
    hasNoInternals(text);
    expect(text).toBe("Add a feeding log screen to baby-care");
  });
});

describe("sanitizeSkillTextForDisplay keeps real skill markdown", () => {
  it("leaves KEY=value examples and escapes alone", () => {
    const markdown =
      '# Deploy\n\nSet API_URL=https://x.dev\n\n```\necho "a\\nb"\n```';
    expect(sanitizeSkillTextForDisplay(markdown)).toBe(markdown);
  });
});
