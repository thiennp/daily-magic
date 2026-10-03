import { describe, expect, it } from "vitest";

import {
  BOT_SUPPORT_URL_HOST_PATTERN,
  BOT_SUPPORT_URL_INSTRUCTION,
  BOT_SUPPORT_URL_KINDS,
  BOT_SUPPORT_URL_LABEL,
} from "@/lib/projects/botSupportUrlKind.constant";
import {
  botSupportUrlInstruction,
  detectBotSupportUrlKind,
} from "@/lib/projects/detectBotSupportUrlKind";

describe("detectBotSupportUrlKind", () => {
  it("detects GitHub, including ssh scp and subdomains", () => {
    expect(detectBotSupportUrlKind("https://github.com/org/repo")).toBe(
      "github",
    );
    expect(
      detectBotSupportUrlKind("https://github.com/org/repo/pull/4"),
    ).toBe("github");
    expect(detectBotSupportUrlKind("git@github.com:org/repo.git")).toBe(
      "github",
    );
    expect(detectBotSupportUrlKind("https://gist.github.com/org/x")).toBe(
      "github",
    );
  });

  it("detects LinkedIn including country subdomains", () => {
    expect(
      detectBotSupportUrlKind("https://www.linkedin.com/in/ada"),
    ).toBe("linkedin");
    expect(
      detectBotSupportUrlKind("https://de.linkedin.com/company/acme"),
    ).toBe("linkedin");
    expect(detectBotSupportUrlKind("https://linkedin.com/in/ada")).toBe(
      "linkedin",
    );
  });

  it("detects NotebookLM on notebooklm.google.com and google.com paths", () => {
    expect(
      detectBotSupportUrlKind("https://notebooklm.google.com/notebook/1"),
    ).toBe("notebooklm");
    expect(
      detectBotSupportUrlKind("https://www.google.com/notebooklm/abc"),
    ).toBe("notebooklm");
    expect(
      detectBotSupportUrlKind("https://google.com/search?q=notebooklm"),
    ).toBe("link");
  });

  it("labels everything else Link", () => {
    expect(detectBotSupportUrlKind("https://gitlab.com/org/repo")).toBe(
      "link",
    );
    expect(detectBotSupportUrlKind("https://github.com.evil.com/x")).toBe(
      "link",
    );
    expect(detectBotSupportUrlKind("not a url")).toBe("link");
    expect(detectBotSupportUrlKind("")).toBe("link");
  });
});

describe("bot support URL instruction map", () => {
  it("uses the stable lowercase kind tokens and copy", () => {
    expect([...BOT_SUPPORT_URL_KINDS]).toEqual([
      "github",
      "linkedin",
      "notebooklm",
      "link",
    ]);
    expect(BOT_SUPPORT_URL_LABEL).toEqual({
      github: "GitHub",
      linkedin: "LinkedIn",
      notebooklm: "NotebookLM",
      link: "Link",
    });
    expect(BOT_SUPPORT_URL_INSTRUCTION.github).toBe(
      "Read the repo, issue, or pull request this URL points at. Do not push or open a pull request unless the owner asked.",
    );
    expect(BOT_SUPPORT_URL_INSTRUCTION.linkedin).toBe(
      "Read this profile or page for context. Do not message anyone or send a connection as the owner.",
    );
    expect(BOT_SUPPORT_URL_INSTRUCTION.notebooklm).toBe(
      "Use this as the owner's notebook. Read it for the task. Do not create or delete notebooks unless the owner asked.",
    );
    expect(BOT_SUPPORT_URL_INSTRUCTION.link).toBe(
      "Open it only for the task the owner named; do not post, pay, or change the account.",
    );
    expect(BOT_SUPPORT_URL_HOST_PATTERN.github).toMatch(/github\.com/);
    expect(BOT_SUPPORT_URL_HOST_PATTERN.linkedin).toMatch(/linkedin\.com/);
    expect(BOT_SUPPORT_URL_HOST_PATTERN.notebooklm).toMatch(/notebooklm/);
  });

  it("returns the instruction for the detected kind", () => {
    expect(
      botSupportUrlInstruction("https://github.com/org/repo/issues/2"),
    ).toBe(BOT_SUPPORT_URL_INSTRUCTION.github);
    expect(botSupportUrlInstruction("https://example.com/notes")).toBe(
      BOT_SUPPORT_URL_INSTRUCTION.link,
    );
  });
});
