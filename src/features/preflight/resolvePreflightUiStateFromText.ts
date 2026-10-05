import {
  formatPreflightFailurePresentation,
  parsePreflightRunResult,
  type PreflightUiState,
} from "@agent-witch/shared/preflight";

const parseJsonObject = (raw: string): unknown | null => {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
};

/**
 * Best-effort: parse a Mac-posted preflight JSON blob from run output / denial.
 * Agreed seam until NRG's runner lands (`parsePreflightRunResult`).
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
  if (parsed.status === "block") {
    return { kind: "blocked", result: parsed };
  }
  if (parsed.status === "warn") {
    return { kind: "warned", result: parsed };
  }
  if (parsed.status === "errored") {
    const hard = parsed.results.some(
      (row) => row.status === "block" || row.status === "errored",
    );
    if (hard) {
      return { kind: "blocked", result: parsed };
    }
    if (parsed.results.some((row) => row.status === "warn")) {
      return { kind: "warned", result: parsed };
    }
    const presentation = formatPreflightFailurePresentation(parsed);
    return {
      kind: "errored",
      safeMessage: presentation?.primary.reason ?? "Unknown preflight error",
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
