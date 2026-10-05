import type { PreflightUiState } from "./PreflightUiState.type";
import { PREFLIGHT_FAILURE_COPY } from "./preflightFailureCopy.constant";
import {
  formatPreflightFailurePresentation,
  sanitizePreflightDisplayText,
  type PreflightFailurePresentation,
} from "./formatPreflightFailureFacts";
import { PREFLIGHT_RERUN_HINT } from "./preflightAction.constant";

const formatPresentationCli = (
  presentation: PreflightFailurePresentation,
): string => {
  const { primary, warnNotes, mode } = presentation;
  const title =
    mode === "warned"
      ? PREFLIGHT_FAILURE_COPY.warnTitle
      : PREFLIGHT_FAILURE_COPY.title;
  const lines: string[] = [
    `${title} · ${primary.checkId} (${primary.checkName})`,
  ];
  if (primary.fromPitfall) {
    lines.push(PREFLIGHT_FAILURE_COPY.fromPitfall);
  }
  lines.push(`${PREFLIGHT_FAILURE_COPY.reasonLabel}: ${primary.reason}`);
  lines.push(`${PREFLIGHT_FAILURE_COPY.fixLabel}: ${primary.fix}`);
  if (mode === "warned") {
    lines.push(
      `${PREFLIGHT_FAILURE_COPY.continueLabel}: ${PREFLIGHT_FAILURE_COPY.continueHint}`,
    );
  } else {
    lines.push(`${PREFLIGHT_FAILURE_COPY.rerunLabel}: ${primary.rerunHint}`);
  }
  for (const note of warnNotes) {
    lines.push(
      `${PREFLIGHT_FAILURE_COPY.warningsLabel}: ${note.checkId} — ${note.reason}`,
    );
  }
  return lines.slice(0, 6).join("\n");
};

/**
 * Plain CLI block (≤~6 lines). Empty string for idle/passed (quiet).
 */
export const formatPreflightFailureCliText = (
  state: PreflightUiState,
): string => {
  switch (state.kind) {
    case "idle":
    case "passed":
      return "";
    case "running":
      return PREFLIGHT_FAILURE_COPY.running;
    case "skipped":
      return PREFLIGHT_FAILURE_COPY.skipped;
    case "errored": {
      const safe = sanitizePreflightDisplayText(state.safeMessage.trim());
      const message =
        safe.length > 0 ? safe : PREFLIGHT_FAILURE_COPY.secretSafeFallback;
      return [
        `${PREFLIGHT_FAILURE_COPY.erroredPrefix} ${message}`,
        `${PREFLIGHT_FAILURE_COPY.rerunLabel}: ${PREFLIGHT_RERUN_HINT}`,
      ].join("\n");
    }
    case "blocked":
    case "warned": {
      const presentation = formatPreflightFailurePresentation(state.result);
      if (presentation === null) {
        return "";
      }
      return formatPresentationCli(presentation);
    }
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
};
