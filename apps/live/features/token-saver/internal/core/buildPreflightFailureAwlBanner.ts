import {
  PREFLIGHT_FAILURE_COPY,
  formatPreflightFailureFactsFromRun,
  sanitizePreflightDisplayText,
  type PreflightUiState,
} from "@agent-witch/shared/preflight";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export type BuildPreflightFailureAwlBannerInput = {
  readonly state: PreflightUiState;
  /** Form POST target for "Run preflight again". */
  readonly rerunAction?: string;
  readonly projectId?: string;
};

/**
 * AWL alert-error (or muted) card for preflight UI states.
 * idle/passed → empty string (quiet).
 */
export const buildPreflightFailureAwlBanner = (
  input: BuildPreflightFailureAwlBannerInput,
): string => {
  const { state } = input;
  switch (state.kind) {
    case "idle":
    case "passed":
      return "";
    case "running":
      return `<div class="alert-warn" role="status">${escapeHtml(PREFLIGHT_FAILURE_COPY.running)}</div>`;
    case "skipped":
      return `<p class="muted">${escapeHtml(PREFLIGHT_FAILURE_COPY.skipped)}</p>`;
    case "errored": {
      const safe = sanitizePreflightDisplayText(state.safeMessage.trim());
      const message =
        safe.length > 0 ? safe : PREFLIGHT_FAILURE_COPY.secretSafeFallback;
      const rerun = buildRerunControls(input);
      return `<div class="alert-error" role="alert">
        <p><strong>${escapeHtml(PREFLIGHT_FAILURE_COPY.erroredPrefix)}</strong> ${escapeHtml(message)}</p>
        ${rerun}
      </div>`;
    }
    case "blocked": {
      const facts = formatPreflightFailureFactsFromRun(state.result);
      if (facts === null) {
        return "";
      }
      const detailsBody = [
        `<p class="muted mono">${escapeHtml(PREFLIGHT_FAILURE_COPY.checkLabel)}: ${escapeHtml(facts.check)}</p>`,
        ...facts.evidenceLines.map(
          (line) => `<p class="muted mono">${escapeHtml(line)}</p>`,
        ),
      ].join("");
      const details =
        detailsBody.length > 0
          ? `<details><summary>${escapeHtml(PREFLIGHT_FAILURE_COPY.detailsSummary)}</summary>${detailsBody}</details>`
          : "";
      const rerun = buildRerunControls(input, facts.rerunHint);
      return `<div class="alert-error" role="alert">
        <p class="field-label">${escapeHtml(PREFLIGHT_FAILURE_COPY.title)}</p>
        <p><strong>${escapeHtml(PREFLIGHT_FAILURE_COPY.reasonLabel)}:</strong> ${escapeHtml(facts.reason)}</p>
        <p><strong>${escapeHtml(PREFLIGHT_FAILURE_COPY.checkLabel)}:</strong> ${escapeHtml(facts.check)}</p>
        <p><strong>${escapeHtml(PREFLIGHT_FAILURE_COPY.fixLabel)}:</strong> ${escapeHtml(facts.fix)}</p>
        ${details}
        ${rerun}
      </div>`;
    }
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
};

const buildRerunControls = (
  input: BuildPreflightFailureAwlBannerInput,
  rerunHint?: string,
): string => {
  if (input.rerunAction !== undefined && input.rerunAction.length > 0) {
    const projectField =
      input.projectId !== undefined && input.projectId.length > 0
        ? `<input type="hidden" name="projectId" value="${escapeHtml(input.projectId)}" />`
        : "";
    return `<form method="POST" action="${escapeHtml(input.rerunAction)}" class="actions" style="margin-top:8px">
      ${projectField}
      <button class="btn btn-primary" type="submit">${escapeHtml(PREFLIGHT_FAILURE_COPY.rerunButton)}</button>
    </form>`;
  }
  if (rerunHint !== undefined && rerunHint.length > 0) {
    return `<p class="muted mono" style="margin-top:8px">${escapeHtml(PREFLIGHT_FAILURE_COPY.rerunLabel)}: ${escapeHtml(rerunHint)}</p>`;
  }
  return `<p class="muted" style="margin-top:8px">${escapeHtml(PREFLIGHT_FAILURE_COPY.rerunButton)}</p>`;
};

export default buildPreflightFailureAwlBanner;
