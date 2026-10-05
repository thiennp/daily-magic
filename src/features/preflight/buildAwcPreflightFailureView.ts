import {
  formatPreflightFailureFactsFromRun,
  parsePreflightRunResult,
  type PreflightFailureFacts,
  type PreflightUiState,
} from "@agent-witch/shared/preflight";

const parseJsonObject = (raw: string): unknown | null => {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
};

export type AwcPreflightFailureView =
  | { readonly kind: "idle" }
  | { readonly kind: "running" }
  | { readonly kind: "passed" }
  | { readonly kind: "skipped" }
  | {
      readonly kind: "blocked";
      readonly facts: PreflightFailureFacts;
    }
  | {
      readonly kind: "errored";
      readonly safeMessage: string;
    };

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
    case "blocked": {
      const facts = formatPreflightFailureFactsFromRun(state.result);
      if (facts === null) {
        return { kind: "idle" };
      }
      return { kind: "blocked", facts };
    }
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
};

/**
 * Best-effort: parse a Mac-posted preflight JSON blob from run output / denial.
 * Returns null when the text is not a preflight payload (ordinary run noise).
 */
export const resolvePreflightUiStateFromText = (
  raw: string | null | undefined,
): PreflightUiState | null => {
  if (raw === null || raw === undefined) {
    return null;
  }
  const trimmed = raw.trim();
  if (trimmed.length === 0 || trimmed[0] !== "{") {
    return null;
  }
  const body = parseJsonObject(trimmed);
  if (body === null) {
    return null;
  }
  const parsed = parsePreflightRunResult(body);
  if (parsed === null) {
    return null;
  }
  if (parsed.status === "block" || parsed.status === "warn") {
    return { kind: "blocked", result: parsed };
  }
  if (parsed.status === "errored") {
    const facts = formatPreflightFailureFactsFromRun(parsed);
    return {
      kind: "errored",
      safeMessage: facts?.reason ?? "Unknown preflight error",
    };
  }
  if (parsed.status === "skipped") {
    return { kind: "skipped" };
  }
  if (parsed.status === "pass") {
    return { kind: "passed" };
  }
  return null;
};
