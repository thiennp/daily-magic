import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { acceptPromptSdlcLocalSkillPost } from "./acceptPromptSdlcLocalSkillPost";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { savePromptSdlcLocalCycle } from "./promptSdlcLocalStore";

describe("acceptPromptSdlcLocalSkillPost", () => {
  it("writes the edited name, optional description, and prompt", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-save-"));
    const storePath = path.join(folder, "cycles.json");
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Stay inside the facts",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli",
        improverModel: "codex",
        workingDirectory: folder,
      }),
      status: "passed" as const,
      revisions: [
        {
          roundNumber: 1,
          promptText: "Answer only from the ticket.",
          judgement: {
            score: 94,
            passed: true,
            reasons: "It names the stop.",
            rawReply: "94",
          },
        },
      ],
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    const result = acceptPromptSdlcLocalSkillPost({
      storePath,
      posted: new URLSearchParams({
        intent: "save-skill",
        cycleId: cycle.id,
        skillName: "Support reply",
        skillDescription: "",
        skillPrompt: "Answer the question they asked. Do not invent a refund.",
      }),
    });

    expect(result).toEqual({
      kind: "redirect",
      location: `/prompt-sdlc?cycle=${encodeURIComponent(cycle.id)}&savedSkill=${encodeURIComponent(".cursor/skills/support-reply/SKILL.md")}`,
    });
    const document = fs.readFileSync(
      path.join(folder, ".cursor/skills/support-reply/SKILL.md"),
      "utf8",
    );
    expect(document).toContain('name: "support-reply"');
    expect(document).not.toContain("description:");
    expect(document).toContain(
      "Answer the question they asked. Do not invent a refund.",
    );
    expect(document).not.toContain("Answer only from the ticket.");
  });
});
