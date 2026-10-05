import {
  formatPreflightFailurePresentation,
  type PreflightFailurePresentation,
  type PreflightUiState,
} from "@agent-witch/shared/preflight";

import { resolvePreflightUiStateFromText } from "@/features/preflight/resolvePreflightUiStateFromText";

export type AwcPreflightFailureView =
  | { readonly kind: "idle" }
  | { readonly kind: "running" }
  | { readonly kind: "passed" }
  | { readonly kind: "skipped" }
  | {
      readonly kind: "blocked";
      readonly presentation: PreflightFailurePresentation;
    }
  | {
      readonly kind: "warned";
      readonly presentation: PreflightFailurePresentation;
    }
  | {
      readonly kind: "errored";
      readonly safeMessage: string;
    };

export { resolvePreflightUiStateFromText };

export const toAwcPreflightFailureView = (
  state: PreflightUiState,
): AwcPreflightFailureView => {
  switch (state.kind) {
    case "idle":
    case "running":
    case "passed":
    case "skipped":
      return { kind: state.kind };
    case "errored":
      return { kind: "errored", safeMessage: state.safeMessage };
    case "blocked":
    case "warned": {
      const presentation = formatPreflightFailurePresentation(state.result);
      if (presentation === null) {
        return { kind: "idle" };
      }
      return state.kind === "warned"
        ? { kind: "warned", presentation }
        : { kind: "blocked", presentation };
    }
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
};
