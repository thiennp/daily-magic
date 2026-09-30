import { describe, expect, it } from "vitest";

import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  PROMPT_SDLC_LOCAL_REPLY_PREVIEW_MAX,
  readPromptSdlcLocalUnusableReplyPreview,
  truncatePromptSdlcLocalReplyPreview,
} from "./readPromptSdlcLocalUnusableReplyPreview";

describe("readPromptSdlcLocalUnusableReplyPreview", () => {
  it("truncates long previews", () => {
    const long = "x".repeat(PROMPT_SDLC_LOCAL_REPLY_PREVIEW_MAX + 10);
    expect(truncatePromptSdlcLocalReplyPreview(long)).toHaveLength(
      PROMPT_SDLC_LOCAL_REPLY_PREVIEW_MAX + 1,
    );
    expect(truncatePromptSdlcLocalReplyPreview(long).endsWith("…")).toBe(true);
  });

  it("prefers raw judge reply on the current round", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
      }),
      status: "failed" as const,
      currentRound: 1,
      revisions: [
        {
          roundNumber: 0,
          promptText: "old",
          judgement: {
            score: 40,
            passed: false,
            reasons: "weak",
            rawReply: '{"score":40}',
            tokens: null,
          },
        },
        {
          roundNumber: 1,
          promptText: "p2",
          judgement: {
            score: null,
            passed: null,
            reasons: null,
            rawReply: "Score: maybe forty?",
            tokens: null,
          },
        },
      ],
    };
    expect(readPromptSdlcLocalUnusableReplyPreview(cycle)).toBe(
      "Score: maybe forty?",
    );
  });

  it("falls back to writer terminal prompt text", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
      }),
      status: "failed" as const,
      currentRound: 0,
      revisions: [
        {
          roundNumber: 0,
          promptText:
            "fatal: not inside a trusted directory; use --skip-git-repo-check",
          judgement: null,
        },
      ],
    };
    expect(readPromptSdlcLocalUnusableReplyPreview(cycle)).toContain(
      "trusted directory",
    );
  });
});
