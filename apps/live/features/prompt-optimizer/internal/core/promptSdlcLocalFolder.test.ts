import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { decidePromptSdlcLocalPost } from "./decidePromptSdlcLocalPost";
import { describePromptSdlcLocalModels } from "./promptSdlcLocalForm";
import {
  displayPromptSdlcLocalFolder,
  resolvePromptSdlcLocalFolder,
} from "./promptSdlcLocalFolder";

describe("promptSdlcLocalFolder", () => {
  it("defaults to the home directory and keeps a chosen folder", () => {
    const home = resolvePromptSdlcLocalFolder("~");
    expect(home.ok && home.path).toBe(os.homedir());
    expect(home.ok && home.display).toBe("~");
    expect(
      displayPromptSdlcLocalFolder(path.join(os.homedir(), "Documents")),
    ).toBe("~/Documents");

    const folder = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-folder-"),
    );
    const resolved = resolvePromptSdlcLocalFolder(folder);
    expect(resolved.ok && resolved.path).toBe(folder);
    expect(resolvePromptSdlcLocalFolder("/no/such/prompt-optimizer-folder").ok).toBe(
      false,
    );
  });

  it("uses the picked folder without starting a run", () => {
    const selection = describePromptSdlcLocalModels(["claude-cli", "cursor"]);
    const decision = decidePromptSdlcLocalPost({
      posted: new URLSearchParams({
        intent: "choose-folder",
        goal: "Stay in the facts.",
        prompt: "Be helpful.",
        folder: "~",
      }),
      installedIds: ["claude-cli", "cursor"],
      selection,
      goal: "Stay in the facts.",
      prompt: "Be helpful.",
      pickFolder: () => path.join(os.homedir(), "Documents"),
    });

    expect(decision.kind).toBe("form");
    if (decision.kind === "form") {
      expect(decision.folder).toBe("~/Documents");
      expect(decision.goal).toBe("Stay in the facts.");
    }
  });
});
