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
    expect(document).toContain('name: "Support reply"');
    expect(document).not.toContain("description:");
    expect(document).toContain(
      "Answer the question they asked. Do not invent a refund.",
    );
    expect(document).not.toContain("Answer only from the ticket.");
  });

  it("saves the best prompt when the prompt field is omitted from the post", () => {
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
      }),
    });

    expect(result.kind).toBe("redirect");
    const document = fs.readFileSync(
      path.join(folder, ".cursor/skills/support-reply/SKILL.md"),
      "utf8",
    );
    expect(document).toContain("Answer only from the ticket.");
  });

  it("asks before replacing the skill file that filled the prompt", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-save-"));
    const storePath = path.join(folder, "cycles.json");
    fs.mkdirSync(path.join(folder, ".cursor", "skills", "support-reply"), {
      recursive: true,
    });
    fs.writeFileSync(
      path.join(folder, ".cursor", "skills", "support-reply", "SKILL.md"),
      '---\nname: "Support reply"\ndescription: "Answer the customer"\n---\n\nOld prompt.\n',
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
    savePromptSdlcLocalCycle(storePath, cycle);

    const blocked = acceptPromptSdlcLocalSkillPost({
      storePath,
      posted: new URLSearchParams({
        intent: "save-skill",
        cycleId: cycle.id,
        skillName: "Support reply",
        skillDescription: "Answer the customer",
        skillFileName: "support-reply",
        skillPrompt: "Answer only from the ticket.",
      }),
    });
    expect(blocked).toEqual({
      kind: "redirect",
      location: `/prompt-sdlc?cycle=${encodeURIComponent(cycle.id)}&skillError=overwrite`,
    });

    const replaced = acceptPromptSdlcLocalSkillPost({
      storePath,
      posted: new URLSearchParams({
        intent: "save-skill",
        cycleId: cycle.id,
        skillName: "Support reply",
        skillDescription: "Answer the customer",
        skillFileName: "support-reply",
        skillPrompt: "Answer only from the ticket.",
        skillOverwrite: "yes",
      }),
    });
    expect(replaced.kind).toBe("redirect");
    const document = fs.readFileSync(
      path.join(folder, ".cursor/skills/support-reply/SKILL.md"),
      "utf8",
    );
    expect(document).toContain('name: "Support reply"');
    expect(document).toContain("Answer only from the ticket.");
    expect(document).not.toContain("Old prompt.");
  });
});
