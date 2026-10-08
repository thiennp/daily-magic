import { describe, expect, it } from "vitest";

import { stripAgentRunCliNoise } from "@/features/agent/utils/stripAgentRunCliNoise";

const codexStart = [
  ", [[NEXT_ACTIONS]], or",
  "[[AGENT_RUN_WRITER_EXECUTION]]",
  "agentRunWriterExecutionBackend=cli-writer-api-key-missing",
  "Reading additional input from stdin...",
  "2026-10-08T15:11:16.152731Z ERROR codex_models_manager::cache: failed",
  "OpenAI Codex v0.144.6",
  "--------",
  "workdir: /Users/x/baby-care",
  "model: gpt",
  "--------",
  "user",
  "Read docs/BRIEF.md.",
  "3. Do not put [[AWAITING_INPUT]] inside the estimate block.",
];

describe("stripAgentRunCliNoise", () => {
  it("returns nothing while only the banner and echoed prompt exist", () => {
    expect(stripAgentRunCliNoise(codexStart.join("\n"))).toBe("");
  });

  it("keeps the agent reply after the echoed prompt", () => {
    const output = [...codexStart, "codex", "Writing SPEC.md now."].join("\n");
    expect(stripAgentRunCliNoise(output)).toBe("Writing SPEC.md now.");
  });

  it("leaves plain output untouched", () => {
    expect(stripAgentRunCliNoise("Opened brief.md")).toBe("Opened brief.md");
  });
});
