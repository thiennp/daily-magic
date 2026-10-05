/**
 * Step 10 — owner LLM draft writer port.
 * Phase 1 injects a fake in tests; no real CLI/API call ships here.
 */
export type OwnerLlmDraftWriterMode = "write" | "reflect_then_write";

export type OwnerLlmDraftWriterInput = {
  readonly scrubbedTranscript: string;
  readonly similarDraftHints: readonly {
    readonly name: string;
    readonly description: string;
  }[];
  readonly mode: OwnerLlmDraftWriterMode;
};

export type OwnerLlmDraftWriterResult =
  | {
      readonly ok: true;
      readonly skillMarkdown: string;
      readonly tokensUsed: number;
    }
  | {
      readonly ok: false;
      readonly reason: string;
      readonly tokensUsed: number;
    };

export type OwnerLlmDraftWriter = (
  input: OwnerLlmDraftWriterInput,
) => Promise<OwnerLlmDraftWriterResult>;

/** Decide one-shot write vs reflect-then-write from transcript size. */
export const resolveOwnerLlmDraftWriterMode = (input: {
  readonly estimatedInputTokens: number;
  readonly inputTokenCap: number;
}): OwnerLlmDraftWriterMode =>
  input.estimatedInputTokens > input.inputTokenCap
    ? "reflect_then_write"
    : "write";
