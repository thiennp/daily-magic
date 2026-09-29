import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  forgetPromptSdlcWriterReady,
  readRememberedPromptSdlcWriter,
  rememberPromptSdlcWriterReady,
} from "./promptSdlcWriterReadyStore";

describe("promptSdlcWriterReadyStore", () => {
  it("keeps a verified writer until that writer is forgotten", () => {
    const storePath = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-ready-")),
      "prompt-optimizer-cycles.json",
    );
    rememberPromptSdlcWriterReady(storePath, "claude-cli", "Claude is ready.");
    expect(readRememberedPromptSdlcWriter(storePath, "claude-cli")).toBe(
      "Claude is ready.",
    );
    forgetPromptSdlcWriterReady(storePath, "claude-cli");
    expect(readRememberedPromptSdlcWriter(storePath, "claude-cli")).toBeNull();
  });
});
