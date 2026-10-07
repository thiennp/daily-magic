import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  deleteAgentRunLocalPrompt,
  getAgentRunLocalPrompt,
  putAgentRunLocalPrompt,
  resolveAgentRunPromptForHydrate,
} from "@/lib/dispatch/agentRunLocalPromptStore";

describe("agentRunLocalPromptStore", () => {
  let tempDir: string;
  let prevEnv: string | undefined;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awc-run-prompts-"));
    prevEnv = process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR;
    process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR = tempDir;
  });

  afterEach(() => {
    if (prevEnv === undefined) {
      delete process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR;
    } else {
      process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR = prevEnv;
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("round-trips full prompt by agentRunId", () => {
    const full = "A".repeat(500);
    putAgentRunLocalPrompt("run-abc_1", full);
    expect(getAgentRunLocalPrompt("run-abc_1")).toBe(full);
  });

  it("hydrate prefers local full prompt over Neon meta", () => {
    putAgentRunLocalPrompt("run-2", "full body prompt text that is long");
    expect(resolveAgentRunPromptForHydrate("run-2", "meta…")).toBe(
      "full body prompt text that is long",
    );
  });

  it("hydrate falls back to Neon meta when local missing", () => {
    expect(resolveAgentRunPromptForHydrate("missing-run", "neon-meta")).toBe(
      "neon-meta",
    );
  });

  it("delete removes local prompt", () => {
    putAgentRunLocalPrompt("run-del", "gone soon");
    deleteAgentRunLocalPrompt("run-del");
    expect(getAgentRunLocalPrompt("run-del")).toBeNull();
  });

  it("rejects unsafe agentRunId paths", () => {
    putAgentRunLocalPrompt("../evil", "nope");
    expect(getAgentRunLocalPrompt("../evil")).toBeNull();
    expect(fs.readdirSync(tempDir)).toEqual([]);
  });
});
