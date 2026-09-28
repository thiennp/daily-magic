import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  listPromptSdlcFolderSkills,
  readPromptSdlcFolderSkill,
} from "./readPromptSdlcFolderSkills";

describe("listPromptSdlcFolderSkills", () => {
  it("reads the name, description, and prompt from each skill", () => {
    const folder = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-skills-"),
    );
    const skillDir = path.join(folder, ".cursor", "skills", "support-reply");
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(
      path.join(skillDir, "SKILL.md"),
      [
        "---",
        'name: "Support reply"',
        'description: "Answer the customer"',
        "---",
        "",
        "Answer the question they asked.",
        "",
      ].join("\n"),
      "utf8",
    );

    expect(listPromptSdlcFolderSkills(folder)).toEqual([
      {
        fileName: "support-reply",
        name: "Support reply",
        description: "Answer the customer",
        promptText: "Answer the question they asked.",
      },
    ]);
    expect(readPromptSdlcFolderSkill(folder, "support-reply")?.fileName).toBe(
      "support-reply",
    );
    expect(readPromptSdlcFolderSkill(folder, "../secret")).toBeNull();
  });
});
