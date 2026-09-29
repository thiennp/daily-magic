import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { decidePromptSdlcLocalPost } from "./decidePromptSdlcLocalPost";
import { planPromptSdlcAgentStart } from "./planPromptSdlcAgentStart";
import { describePromptSdlcLocalModels } from "./promptSdlcLocalForm";
import { displayPromptSdlcLocalFolder } from "./promptSdlcLocalFolder";
import { PROMPT_SDLC_LOCAL_FORM_SCRIPT } from "./promptSdlcLocalFormScript";
import {
  freshPromptSdlcLocalComposerDefaults,
  readPromptSdlcLocalPreferences,
  rememberPromptSdlcLocalPostedSelection,
  savePromptSdlcLocalPreferences,
} from "./promptSdlcLocalPreferences";

const storePathFor = (prefix: string): string =>
  path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), prefix)),
    "prompt-sdlc-cycles.json",
  );

describe("promptSdlcLocalPreferences", () => {
  it("starts from home with blank roles when nothing is saved", () => {
    const storePath = storePathFor("prompt-sdlc-prefs-empty-");
    expect(readPromptSdlcLocalPreferences(storePath)).toEqual({
      folder: "~",
      judge: "",
      improver: "",
    });
  });

  it("keeps a valid folder and roles, and ignores a missing folder or unknown writer", () => {
    const storePath = storePathFor("prompt-sdlc-prefs-save-");
    const folder = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-prefs-dir-"),
    );
    savePromptSdlcLocalPreferences({
      storePath,
      installedIds: ["claude-cli", "cursor"],
      folder,
      judge: "claude-cli",
      improver: "manual",
    });
    expect(readPromptSdlcLocalPreferences(storePath)).toEqual({
      folder: displayPromptSdlcLocalFolder(folder),
      judge: "claude-cli",
      improver: "manual",
    });

    savePromptSdlcLocalPreferences({
      storePath,
      installedIds: ["claude-cli", "cursor"],
      folder: "/no/such/prompt-sdlc-folder",
      judge: "not-a-writer",
      improver: null,
    });
    expect(readPromptSdlcLocalPreferences(storePath)).toEqual({
      folder: displayPromptSdlcLocalFolder(folder),
      judge: "claude-cli",
      improver: "manual",
    });

    savePromptSdlcLocalPreferences({
      storePath,
      installedIds: ["claude-cli", "cursor"],
      folder: null,
      judge: "",
      improver: "cursor",
    });
    expect(readPromptSdlcLocalPreferences(storePath)).toEqual({
      folder: displayPromptSdlcLocalFolder(folder),
      judge: "",
      improver: "cursor",
    });
  });

  it("prefills a fresh form and drops a writer that is no longer installed", () => {
    const storePath = storePathFor("prompt-sdlc-prefs-fresh-");
    const folder = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-prefs-fresh-dir-"),
    );
    savePromptSdlcLocalPreferences({
      storePath,
      installedIds: ["claude-cli"],
      folder,
      judge: "claude-cli",
      improver: "manual",
    });
    const fresh = freshPromptSdlcLocalComposerDefaults({
      storePath,
      installedIds: ["claude-cli"],
      selection: describePromptSdlcLocalModels(["claude-cli"]),
    });
    const decision = decidePromptSdlcLocalPost({
      posted: null,
      installedIds: ["claude-cli"],
      selection: fresh.selection,
      goal: "",
      prompt: "",
      pickFolder: () => null,
      defaultFolder: fresh.defaultFolder,
    });
    expect(decision.kind).toBe("form");
    if (decision.kind === "form") {
      expect(decision.folder).toBe(displayPromptSdlcLocalFolder(folder));
      expect(decision.judge).toBe("claude-cli");
      expect(decision.improver).toBe("manual");
    }

    const dropped = freshPromptSdlcLocalComposerDefaults({
      storePath,
      installedIds: [],
      selection: describePromptSdlcLocalModels([]),
    });
    expect(dropped.selection.judge).toBe("");
    expect(dropped.selection.improver).toBe("manual");
    expect(dropped.defaultFolder).toBe(displayPromptSdlcLocalFolder(folder));
  });

  it("falls back to home when the saved folder is gone", () => {
    const storePath = storePathFor("prompt-sdlc-prefs-gone-");
    const folder = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-prefs-gone-dir-"),
    );
    savePromptSdlcLocalPreferences({
      storePath,
      installedIds: ["claude-cli"],
      folder,
      judge: "manual",
      improver: "manual",
    });
    fs.rmdirSync(folder);
    const fresh = freshPromptSdlcLocalComposerDefaults({
      storePath,
      installedIds: ["claude-cli"],
      selection: describePromptSdlcLocalModels(["claude-cli"]),
    });
    expect(fresh.defaultFolder).toBe("~");
  });

  it("leaves the agent start on the folder and writers in the request", () => {
    const storePath = storePathFor("prompt-sdlc-prefs-agent-");
    const saved = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-prefs-saved-"),
    );
    const requested = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-prefs-requested-"),
    );
    savePromptSdlcLocalPreferences({
      storePath,
      installedIds: ["claude-cli", "cursor"],
      folder: saved,
      judge: "claude-cli",
      improver: "claude-cli",
    });
    const planned = planPromptSdlcAgentStart({
      body: {
        goal: "Stay in the facts.",
        prompt: "Be helpful.",
        workingDirectory: requested,
        judge: "cursor",
        improver: "cursor",
        passScore: null,
        maxRounds: null,
      },
      installedIds: ["claude-cli", "cursor"],
    });
    expect(planned.ok && planned.workingDirectory).toBe(requested);
    expect(planned.ok && planned.judge).toBe("cursor");
    expect(readPromptSdlcLocalPreferences(storePath).judge).toBe("claude-cli");
  });

  it("saves a picked folder and a remember post, and ignores other intents", () => {
    const storePath = storePathFor("prompt-sdlc-prefs-post-");
    const picked = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-prefs-picked-"),
    );
    rememberPromptSdlcLocalPostedSelection({
      storePath,
      installedIds: ["claude-cli"],
      posted: new URLSearchParams({
        intent: "choose-folder",
        folder: "~",
        judge: "claude-cli",
        improver: "manual",
      }),
      folder: displayPromptSdlcLocalFolder(picked),
    });
    expect(readPromptSdlcLocalPreferences(storePath).folder).toBe(
      displayPromptSdlcLocalFolder(picked),
    );

    rememberPromptSdlcLocalPostedSelection({
      storePath,
      installedIds: ["claude-cli"],
      posted: new URLSearchParams({ intent: "stop", folder: "~" }),
      folder: "~",
    });
    expect(readPromptSdlcLocalPreferences(storePath).folder).toBe(
      displayPromptSdlcLocalFolder(picked),
    );
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain(
      'body.set("intent", "remember")',
    );
  });
});
