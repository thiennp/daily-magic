import type { PromptSdlcWriterErrorKind } from "./readPromptSdlcWriterOutput";

/** Product chrome labels — timeout / interrupt / no_reply unmistakable. */
export const labelPromptSdlcErrorKind = (
  errorKind: PromptSdlcWriterErrorKind | string | null | undefined,
): string | null => {
  if (errorKind === null || errorKind === undefined) {
    return null;
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
