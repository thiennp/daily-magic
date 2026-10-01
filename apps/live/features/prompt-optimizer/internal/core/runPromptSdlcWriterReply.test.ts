import type { ChildProcess } from "node:child_process";
import { EventEmitter } from "node:events";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as writerDispatch from "../../../../adapters/writerDispatch";
import {
  PROMPT_SDLC_WRITER_KILL_ESCALATE_MS,
  terminatePromptSdlcWriterChild,
} from "./bindPromptSdlcWriterAbort";
import {
  formatPromptSdlcWriterTimeoutMessage,
  PROMPT_SDLC_WRITER_DEFAULT_TIMEOUT_MS,
  PROMPT_SDLC_WRITER_OPTIMIZE_MODULE_RUN_TIMEOUT_MS,
  PROMPT_SDLC_WRITER_TIMEOUT_CEILING_MS,
  PROMPT_SDLC_WRITER_TIMEOUT_FLOOR_MS,
  recommendPromptSdlcWriterTimeoutMs,
  resolvePromptSdlcWriterTimeoutMs,
  runPromptSdlcWriterReply,
} from "./runPromptSdlcWriterReply";

describe("resolvePromptSdlcWriterTimeoutMs", () => {
  afterEach(() => {
    delete process.env.AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS;
  });

  it("defaults to 180s and uses 600s for optimize module runs", () => {
    expect(resolvePromptSdlcWriterTimeoutMs()).toBe(
      PROMPT_SDLC_WRITER_DEFAULT_TIMEOUT_MS,
    );
    expect(resolvePromptSdlcWriterTimeoutMs({ isModuleRun: true })).toBe(
      PROMPT_SDLC_WRITER_OPTIMIZE_MODULE_RUN_TIMEOUT_MS,
    );
  });

  it("honors AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS for optimize runs", () => {
    process.env.AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS = "900000";
    expect(resolvePromptSdlcWriterTimeoutMs({ isModuleRun: true })).toBe(
      900_000,
    );
  });

  it("formats a distinct timeout message", () => {
    expect(formatPromptSdlcWriterTimeoutMessage(180_000)).toBe(
      "The writer timed out after 180000ms.",
    );
  });
});

describe("recommendPromptSdlcWriterTimeoutMs", () => {
  afterEach(() => {
    delete process.env.AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS;
    delete process.env.AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS;
  });

  it("bands by prompt length with floor and ceiling", () => {
    expect(recommendPromptSdlcWriterTimeoutMs({ promptText: "short" })).toBe(
      180_000,
    );
    expect(
      recommendPromptSdlcWriterTimeoutMs({ promptText: "x".repeat(3_000) }),
    ).toBe(300_000);
    expect(
      recommendPromptSdlcWriterTimeoutMs({ promptText: "x".repeat(8_000) }),
    ).toBe(450_000);
    expect(
      recommendPromptSdlcWriterTimeoutMs({ promptText: "x".repeat(15_000) }),
    ).toBe(600_000);
    expect(PROMPT_SDLC_WRITER_TIMEOUT_FLOOR_MS).toBe(120_000);
    expect(PROMPT_SDLC_WRITER_TIMEOUT_CEILING_MS).toBe(900_000);
  });

  it("keeps module runs at least the optimize default", () => {
    expect(
      recommendPromptSdlcWriterTimeoutMs({
        promptText: "short",
        isModuleRun: true,
      }),
    ).toBe(PROMPT_SDLC_WRITER_OPTIMIZE_MODULE_RUN_TIMEOUT_MS);
  });
});

describe("terminatePromptSdlcWriterChild", () => {
  const mockChild = (): ChildProcess => {
    const child = new EventEmitter() as EventEmitter & {
      exitCode: number | null;
      signalCode: NodeJS.Signals | null;
      kill: ReturnType<typeof vi.fn>;
    };
    child.exitCode = null;
    child.signalCode = null;
    child.kill = vi.fn(() => true);
    return child as unknown as ChildProcess;
  };

  it("escalates from SIGTERM to SIGKILL when the child ignores TERM", async () => {
    vi.useFakeTimers();
    const child = mockChild();
    const signals: string[] = [];
    (child.kill as ReturnType<typeof vi.fn>).mockImplementation(
      (signal?: string) => {
        signals.push(signal ?? "");
        return true;
      },
    );

    const pending = terminatePromptSdlcWriterChild(
      child,
      PROMPT_SDLC_WRITER_KILL_ESCALATE_MS,
    );
    expect(signals).toEqual(["SIGTERM"]);
    await vi.advanceTimersByTimeAsync(PROMPT_SDLC_WRITER_KILL_ESCALATE_MS);
    await expect(pending).resolves.toBe("SIGKILL");
    expect(signals).toEqual(["SIGTERM", "SIGKILL"]);
    vi.useRealTimers();
  });

  it("stays on SIGTERM when the child exits before escalate", async () => {
    vi.useFakeTimers();
    const child = mockChild();
    (child.kill as ReturnType<typeof vi.fn>).mockImplementation(
      (signal?: string) => {
        if (signal === "SIGTERM") {
          Object.assign(child, { signalCode: "SIGTERM" });
        }
        return true;
      },
    );

    const pending = terminatePromptSdlcWriterChild(child, 2_500);
    await expect(pending).resolves.toBe("SIGTERM");
    expect(child.kill).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});

describe("runPromptSdlcWriterReply", () => {
  afterEach(() => {
    delete process.env.AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN;
    vi.restoreAllMocks();
  });

  it("returns a dry-run stub without spawning", async () => {
    const reply = await runPromptSdlcWriterReply({
      writerAgent: "cursor",
      prompt: "hello",
      workingDirectory: "/tmp",
      dryRun: true,
    });
    expect(reply).toEqual({
      ok: true,
      text: "[dry-run] Writer spawn skipped.",
      tokens: null,
    });
  });

  it("honors AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN=1", async () => {
    process.env.AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN = "1";
    const reply = await runPromptSdlcWriterReply({
      writerAgent: "cursor",
      prompt: "hello",
      workingDirectory: "/tmp",
    });
    expect(reply.ok).toBe(true);
    if (reply.ok) {
      expect(reply.text).toContain("dry-run");
    }
  });

  it("distinguishes unsupported writer from empty reply", async () => {
    const reply = await runPromptSdlcWriterReply({
      writerAgent: "not-a-writer",
      prompt: "hello",
      workingDirectory: "/tmp",
    });
    expect(reply).toEqual({
      ok: false,
      errorMessage: "The writer is not supported on this Mac.",
    });
  });

  it("reports a distinct timeout message when the timer expires", async () => {
    vi.spyOn(writerDispatch, "buildWriterCliInvocation").mockReturnValue({
      command: "sleep",
      args: ["30"],
    });
    vi.spyOn(writerDispatch, "resolveWriterCliCommands").mockReturnValue({
      claudeCommand: "claude",
      codexCommand: "codex",
      cursorCommand: "cursor",
      antigravityCommand: "agy",
    });

    const reply = await runPromptSdlcWriterReply({
      writerAgent: "cursor",
      prompt: "hello",
      workingDirectory: "/tmp",
      timeoutMs: 80,
    });

    expect(reply).toMatchObject({
      ok: false,
      errorMessage: "The writer timed out after 80ms.",
      errorKind: "writer_timeout",
    });
    if (!reply.ok) {
      expect(
        reply.killSignal === "SIGTERM" || reply.killSignal === "SIGKILL",
      ).toBe(true);
    }
  }, 15_000);
});
