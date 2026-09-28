import type { PromptSdlcModelChoice } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

export type PromptSdlcContinuation =
  | {
      readonly type: "call";
      readonly role: "judge" | "improve";
      readonly prompt: string;
      readonly choice: PromptSdlcModelChoice;
    }
  | { readonly type: "passed" }
  | { readonly type: "stopped"; readonly errorMessage: string }
  | { readonly type: "failed"; readonly errorMessage: string };

export const JUDGE_REPLY_WAS_NOT_A_SCORE =
  "The judge reply needs a score and a reason.";

export const IMPROVER_REPLY_WAS_EMPTY = "The improver reply was empty.";
