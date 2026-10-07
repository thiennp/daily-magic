import { EventEmitter } from "node:events";
import os from "node:os";
import { PassThrough } from "node:stream";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as writerDispatch from "../../../../adapters/writerDispatch";
import { AGY_AUTH_REQUIRED_PROMPT_STDERR } from "./agyAuthRequiredOutput.fixture";

/**
 * Fake child whose kill() emits 'exit' and then 'close' in the same tick, like Node
 * does when the pipes already hit EOF. 'close' then runs before the kill promise
 * resolves, which used to turn the sign-in prompt into an ok reply.
 */
class CloseBeforeKillResolvesChild extends EventEmitter {
  readonly stdout = new PassThrough();
  readonly stderr = new PassThrough();
  exitCode: number | null = null;
  signalCode: NodeJS.Signals | null = null;
  kill(signal: NodeJS.Signals = "SIGTERM"): boolean {
    this.signalCode = signal;
    this.emit("exit", null, signal);
    this.emit("close", null, signal);
    return true;
  }
}

const fakeChildren: CloseBeforeKillResolvesChild[] = [];

vi.mock("node:child_process", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:child_process")>();
  return {
    ...actual,
    spawn: vi.fn(() => {
      const child = new CloseBeforeKillResolvesChild();
      fakeChildren.push(child);
      setImmediate(() => child.stderr.write(AGY_AUTH_REQUIRED_PROMPT_STDERR));
      return child;
    }),
  };
});

describe("runPromptSdlcWriterReply sign-in fail-fast vs close order", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    fakeChildren.length = 0;
  });

  it("still reports sign-in when 'close' fires before the kill promise resolves", async () => {
    vi.spyOn(writerDispatch, "buildWriterCliInvocation").mockReturnValue({
      command: "agy",
      args: ["--sandbox", "-p", "hello"],
    });
    const { runPromptSdlcWriterReply } =
      await import("./runPromptSdlcWriterReply");

    const reply = await runPromptSdlcWriterReply({
      writerAgent: "antigravity",
      prompt: "hello",
      workingDirectory: os.tmpdir(),
      timeoutMs: 60_000,
    });

    expect(fakeChildren).toHaveLength(1);
    expect(fakeChildren[0]?.signalCode).toBe("SIGTERM");
    expect(reply).toMatchObject({
      ok: false,
      errorKind: "action_required",
      errorMessage:
        "Antigravity CLI isn't signed in on this computer. Open Terminal, run `agy` once and finish sign-in, then retry.",
    });
    if (!reply.ok) {
      expect(reply.errorMessage).not.toMatch(/https?:|state=|client_id/i);
    }
  });
});
