import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { decidePromptSdlcLocalPost } from "./decidePromptSdlcLocalPost";
import { describePromptSdlcLocalModels } from "./promptSdlcLocalForm";

describe("decidePromptSdlcLocalPost suggest-goals", () => {
  it("returns the compose form and does not start a cycle", () => {
    const cwd = process.cwd();
    const decision = decidePromptSdlcLocalPost({
      posted: new URLSearchParams({
        intent: "suggest-goals",
        goal: "",
        prompt: "Update replies/latest.md from ticket facts only.",
        folder: cwd,
        judge: "cursor",
        improver: "cursor",
      }),
      installedIds: ["cursor"],
      selection: describePromptSdlcLocalModels(["cursor"]),
      goal: "",
      prompt: "Update replies/latest.md from ticket facts only.",
      pickFolder: () => null,
    });

    expect(decision.kind).toBe("form");
    if (decision.kind === "form") {
      expect(decision.goal).toBe("");
      expect(decision.prompt).toContain("replies/latest.md");
    }
  });

  it("allows suggest-goals when goal is empty but prompt is present", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "sdlc-suggest-"));
    const decision = decidePromptSdlcLocalPost({
      posted: new URLSearchParams({
        intent: "suggest-goals",
        prompt: "Do one thing.",
        folder,
        judge: "cursor",
        improver: "cursor",
      }),
      installedIds: ["cursor"],
      selection: describePromptSdlcLocalModels(["cursor"]),
      goal: "",
      prompt: "Do one thing.",
      pickFolder: () => null,
    });
    expect(decision.kind).toBe("form");
    fs.rmSync(folder, { recursive: true, force: true });
  });
});
