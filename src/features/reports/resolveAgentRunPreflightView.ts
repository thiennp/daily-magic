import {
  resolvePreflightUiStateFromText,
  toAwcPreflightFailureView,
  type AwcPreflightFailureView,
} from "@/features/preflight/buildAwcPreflightFailureView";

/** Best-effort preflight card view from run resultOutput or denialReason. */
export const resolveAgentRunPreflightView = (input: {
  readonly resultOutput: string | null | undefined;
  readonly denialReason: string | null | undefined;
}): AwcPreflightFailureView | null => {
  const preflightUi =
    resolvePreflightUiStateFromText(input.resultOutput) ??
    resolvePreflightUiStateFromText(input.denialReason);
  return preflightUi === null ? null : toAwcPreflightFailureView(preflightUi);
};
