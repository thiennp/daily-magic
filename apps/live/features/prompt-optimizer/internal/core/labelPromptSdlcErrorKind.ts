import type { PromptSdlcWriterErrorKind } from "./readPromptSdlcWriterOutput";

/** Product chrome labels — timeout / interrupt / no_reply / usage / action unmistakable. */
export const labelPromptSdlcErrorKind = (
  errorKind: PromptSdlcWriterErrorKind | string | null | undefined,
): string | null => {
  if (errorKind === null || errorKind === undefined) {
    return null;
  }
  if (errorKind === "usage_limit") {
    return "Usage limit";
  }
  if (errorKind === "action_required") {
    return "Action required";
  }
  if (errorKind === "budget_exceeded") {
    return "Budget exceeded";
  }
  const normalized = String(errorKind).replace(/^writer_/, "");
  if (normalized === "timeout") {
    return "Timeout";
  }
  if (normalized === "interrupted" || normalized === "interrupt") {
    return "Interrupt";
  }
  if (normalized === "no_reply") {
    return "No reply";
  }
  return null;
};
