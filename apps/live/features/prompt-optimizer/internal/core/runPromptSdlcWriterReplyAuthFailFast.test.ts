import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as writerDispatch from "../../../../adapters/writerDispatch";
import { AGY_AUTH_REQUIRED_PROMPT_STDERR } from "./agyAuthRequiredOutput.fixture";
import { runPromptSdlcWriterReply } from "./runPromptSdlcWriterReply";

/** Fake `agy`: prints the real sign-in prompt to stderr, then waits like agy (60 s). */
const writeFakeUnsignedAgy = (): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "fake-agy-"));
  const promptFile = path.join(dir, "prompt.txt");
  fs.writeFileSync(promptFile, AGY_AUTH_REQUIRED_PROMPT_STDERR);
  const bin = path.join(dir, "agy");
  fs.writeFileSync(bin, `#!/bin/sh\ncat '${promptFile}' >&2\nexec sleep 60\n`);
  fs.chmodSync(bin, 0o755);
  return bin;
};

describe("runPromptSdlcWriterReply sign-in fail-fast", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("kills an unsigned agy as soon as the login prompt shows and says how to fix it", async () => {
    const fakeAgy = writeFakeUnsignedAgy();
    vi.spyOn(writerDispatch, "buildWriterCliInvocation").mockReturnValue({
      command: fakeAgy,
      args: ["--sandbox", "-p", "hello"],
    });

    const startedAt = Date.now();
    const reply = await runPromptSdlcWriterReply({
      writerAgent: "antigravity",
      prompt: "hello",
      workingDirectory: os.tmpdir(),
      timeoutMs: 60_000,
    });
    const elapsedMs = Date.now() - startedAt;

    expect(elapsedMs).toBeLessThan(10_000);
    expect(reply).toMatchObject({
      ok: false,
      errorKind: "action_required",
      errorMessage:
        "Antigravity CLI isn't signed in on this computer. Open Terminal, run `agy` once and finish sign-in, then retry.",
    });
    if (!reply.ok) {
      expect(reply.errorMessage).not.toMatch(/https?:|state=|client_id/i);
    }
  }, 20_000);
});
