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
      name: "Stay inside the facts",
      description: "Stay inside the facts",
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
    expect(document).toContain('name: "Stay inside the facts"');
    expect(document).toContain('description: "Stay inside the facts"');
    expect(document).toContain("Answer only from the ticket.");
  });

  it("saves an edited prompt and omits a blank description", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-skill-"));
    const written = writePromptSdlcLocalSkill({
      workingDirectory: folder,
      name: "Support reply",
      description: "   ",
      promptText: "Answer the question they asked.",
    });

    expect(written).toEqual({
      ok: true,
      relativePath: ".cursor/skills/support-reply/SKILL.md",
    });
    if (!written.ok) {
      return;
    }
    const document = fs.readFileSync(
      path.join(folder, written.relativePath),
      "utf8",
    );
    expect(document).not.toContain("description:");
    expect(document).toContain("Answer the question they asked.");
  });

  it("rejects a name with no letters or numbers", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-skill-"));
    expect(
      writePromptSdlcLocalSkill({
        workingDirectory: folder,
        name: "!!!",
        description: "",
        promptText: "Answer only from the ticket.",
      }),
    ).toEqual({ ok: false, errorCode: "name" });
  });

  it("keeps the skill file name and asks before replacing it", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-skill-"));
    const first = writePromptSdlcLocalSkill({
      workingDirectory: folder,
      name: "Support reply",
      description: "Answer the customer",
      promptText: "Answer the question they asked.",
      fileName: "support-reply",
    });
    expect(first).toEqual({
      ok: true,
      relativePath: ".cursor/skills/support-reply/SKILL.md",
    });

    expect(
      writePromptSdlcLocalSkill({
        workingDirectory: folder,
        name: "Support reply",
        description: "Answer the customer",
        promptText: "Answer only from the ticket.",
        fileName: "support-reply",
      }),
    ).toEqual({ ok: false, errorCode: "overwrite" });

    const replaced = writePromptSdlcLocalSkill({
      workingDirectory: folder,
      name: "Support reply",
      description: "Answer the customer",
      promptText: "Answer only from the ticket.",
      fileName: "support-reply",
      overwrite: true,
    });
    expect(replaced.ok).toBe(true);
    if (!replaced.ok) {
      return;
    }
    const document = fs.readFileSync(
      path.join(folder, replaced.relativePath),
      "utf8",
    );
    expect(document).toContain('name: "Support reply"');
    expect(document).toContain("Answer only from the ticket.");
  });

  it("rejects an empty prompt", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-skill-"));
    expect(
      writePromptSdlcLocalSkill({
        workingDirectory: folder,
        name: "Support reply",
        description: "",
        promptText: "  ",
      }),
    ).toEqual({ ok: false, errorCode: "prompt" });
  });

  it("refuses a working directory that is not a folder", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-skill-"));
    const filePath = path.join(folder, "not-a-dir");
    fs.writeFileSync(filePath, "x", "utf8");

    expect(
      writePromptSdlcLocalSkill({
        workingDirectory: filePath,
        name: "Stay inside the facts",
        description: "",
        promptText: "Answer only from the ticket.",
      }),
    ).toEqual({ ok: false, errorCode: "folder" });
  });
});
