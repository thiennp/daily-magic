import { describe, expect, it } from "vitest";

import { buildPromptSdlcAgentSnapshot } from "./buildPromptSdlcAgentSnapshot";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { derivePromptSdlcAgentOutcome } from "./derivePromptSdlcAgentOutcome";
import {
  classifyPromptSdlcWriterErrorKind,
  readPromptSdlcWriterOutput,
} from "./readPromptSdlcWriterOutput";

describe("derivePromptSdlcAgentOutcome + errorKind honesty", () => {
  it("maps writer errorKinds to agent outcome enums", () => {
    expect(
      derivePromptSdlcAgentOutcome({
        status: "passed",
        errorKind: undefined,
      }),
    ).toBe("passed");
    expect(
      derivePromptSdlcAgentOutcome({
        status: "failed",
        errorKind: "writer_timeout",
      }),
    ).toBe("timeout");
    expect(
      derivePromptSdlcAgentOutcome({
        status: "stopped",
        errorKind: "writer_interrupted",
      }),
    ).toBe("interrupt");
    expect(
      derivePromptSdlcAgentOutcome({
        status: "failed",
        errorKind: "writer_no_reply",
      }),
    ).toBe("no_reply");
    expect(
      derivePromptSdlcAgentOutcome({
        status: "failed",
        errorKind: "usage_limit",
      }),
    ).toBe("usage_limit");
    expect(
      derivePromptSdlcAgentOutcome({
        status: "failed",
        errorKind: "action_required",
      }),
    ).toBe("action_required");
    expect(
      derivePromptSdlcAgentOutcome({
        status: "failed",
        errorKind: "budget_exceeded",
      }),
    ).toBe("budget_exceeded");
    expect(
      derivePromptSdlcAgentOutcome({ status: "failed", errorKind: undefined }),
    ).toBe("failed");
  });

  it("classifies Cursor monthly usage as usage_limit not writer_timeout", () => {
    expect(
      classifyPromptSdlcWriterErrorKind({
        errorMessage:
          "Error: You've hit your monthly usage limit. ActionRequiredError",
      }),
    ).toBe("usage_limit");
    expect(
      classifyPromptSdlcWriterErrorKind({
        errorMessage: "ActionRequiredError: Please resolve in Cursor settings.",
      }),
    ).toBe("action_required");
    expect(
      classifyPromptSdlcWriterErrorKind({
        errorMessage: "The writer timed out after 600000ms.",
      }),
    ).toBe("writer_timeout");
  });

  it("attaches usage_limit on CLI status replies from readPromptSdlcWriterOutput", () => {
    const raw = "Error: You've hit your monthly usage limit for Cursor agent.";
    expect(
      readPromptSdlcWriterOutput({
        writerAgent: "cursor",
        stdout: raw,
        stderr: "",
        replyFileText: raw,
      }),
    ).toEqual({
      ok: false,
      errorMessage: expect.stringMatching(/usage limit/i),
      errorKind: "usage_limit",
    });
  });

  it("useThisPrompt only when status === passed (never timeout/interrupt/stopped)", () => {
    const base = createPromptSdlcLocalCycle({
      goal: "Stay inside the repo",
      sourcePrompt: "Use the harness",
      judgeModel: "codex",
      improverModel: "codex",
    });
    expect(
      buildPromptSdlcAgentSnapshot({
        ...base,
        status: "passed",
        errorMessage: null,
      }).useThisPrompt,
    ).toBe(true);
    expect(
      buildPromptSdlcAgentSnapshot({
        ...base,
        status: "failed",
        errorMessage: "timed out",
        errorKind: "writer_timeout",
      }),
    ).toMatchObject({
      useThisPrompt: false,
      outcome: "timeout",
      errorKind: "writer_timeout",
    });
    expect(
      buildPromptSdlcAgentSnapshot({
        ...base,
        status: "stopped",
        errorMessage: "Finished",
        errorKind: "writer_interrupted",
      }),
    ).toMatchObject({
      useThisPrompt: false,
      outcome: "interrupt",
    });
    expect(
      buildPromptSdlcAgentSnapshot({
        ...base,
        status: "failed",
        errorMessage: "monthly usage limit",
        errorKind: "usage_limit",
      }),
    ).toMatchObject({
      useThisPrompt: false,
      outcome: "usage_limit",
      errorKind: "usage_limit",
    });
    expect(
      buildPromptSdlcAgentSnapshot({
        ...base,
        status: "failed",
        errorMessage: "budget exceeded",
        errorKind: "budget_exceeded",
      }),
    ).toMatchObject({
      useThisPrompt: false,
      outcome: "budget_exceeded",
      errorKind: "budget_exceeded",
    });
  });
});
