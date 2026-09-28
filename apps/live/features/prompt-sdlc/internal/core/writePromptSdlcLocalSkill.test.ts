import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { writePromptSdlcLocalSkill } from "./writePromptSdlcLocalSkill";

describe("writePromptSdlcLocalSkill", () => {
  it("writes the prompt as a skill under the selected folder", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-skill-"));
    const written = writePromptSdlcLocalSkill({
      workingDirectory: folder,
      goal: "Stay inside the facts",
      promptText: "Answer only from the ticket.",
    });

    expect(written).toEqual({
      ok: true,
      relativePath: ".cursor/skills/stay-inside-the-facts/SKILL.md",
    });
    if (!written.ok) {
      return;
    }
    const document = fs.readFileSync(
      path.join(folder, written.relativePath),
      "utf8",
    );
    expect(document).toContain('name: "stay-inside-the-facts"');
    expect(document).toContain("Answer only from the ticket.");
  });

  it("refuses a working directory that is not a folder", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-skill-"));
    const filePath = path.join(folder, "not-a-dir");
    fs.writeFileSync(filePath, "x", "utf8");

    expect(
      writePromptSdlcLocalSkill({
        workingDirectory: filePath,
        goal: "Stay inside the facts",
        promptText: "Answer only from the ticket.",
      }),
    ).toEqual({ ok: false, errorCode: "folder" });
  });
});
