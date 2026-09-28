import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcLocalBestPrompt } from "./renderPromptSdlcLocalBestPrompt";

describe("renderPromptSdlcLocalBestPrompt", () => {
  it("does not require the replace checkbox so a new file name can be saved", () => {
    const folder = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-replace-"),
    );
    const skillDir = path.join(folder, ".cursor", "skills", "support-reply");
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(
      path.join(skillDir, "SKILL.md"),
      '---\nname: "Support reply"\n---\n\nOld prompt.\n',
      "utf8",
    );
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Stay inside the facts",
        sourcePrompt: "Old prompt.",
        judgeModel: "claude-cli",
        improverModel: "codex",
        workingDirectory: folder,
        sourceSkill: {
          fileName: "support-reply",
          name: "Support reply",
          description: "Answer the customer",
        },
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

    const html = renderPromptSdlcLocalBestPrompt(cycle);

    expect(html).toContain('name="skillOverwrite"');
    expect(html).not.toContain('name="skillOverwrite" value="yes" required');
    expect(html).toContain("Replace .cursor/skills/support-reply/SKILL.md");
  });
});
