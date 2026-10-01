import { afterEach, describe, expect, it, vi } from "vitest";

import * as writerDispatch from "../../../../adapters/writerDispatch";
import {
  formatPromptSdlcWriterTimeoutMessage,
  PROMPT_SDLC_WRITER_DEFAULT_TIMEOUT_MS,
  PROMPT_SDLC_WRITER_OPTIMIZE_MODULE_RUN_TIMEOUT_MS,
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

    expect(reply).toEqual({
      ok: false,
      errorMessage: "The writer timed out after 80ms.",
    });
  }, 10_000);
});
