import {
  PREFLIGHT_FAILURE_COPY,
  formatPreflightFailurePresentation,
  sanitizePreflightDisplayText,
  type PreflightFailurePresentation,
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

const buildWarnNotesHtml = (
  presentation: PreflightFailurePresentation,
): string => {
  if (presentation.warnNotes.length === 0) {
    return "";
  }
  const items = presentation.warnNotes
    .map(
      (note) =>
        `<li><span class="mono">${escapeHtml(note.checkId)}</span> — ${escapeHtml(note.reason)}</li>`,
    )
    .join("");
  return `<p class="muted" style="margin-top:8px"><strong>${escapeHtml(PREFLIGHT_FAILURE_COPY.warningsLabel)}</strong></p><ul class="muted">${items}</ul>`;
};

const buildFactsBody = (
  presentation: PreflightFailurePresentation,
  soft: boolean,
): string => {
  const { primary } = presentation;
  const title = soft
    ? PREFLIGHT_FAILURE_COPY.warnTitle
    : PREFLIGHT_FAILURE_COPY.title;
  const pitfall = primary.fromPitfall
    ? `<p class="muted">${escapeHtml(PREFLIGHT_FAILURE_COPY.fromPitfall)}</p>`
    : "";
  const detailsBody = [
    `<p class="muted mono">${escapeHtml(PREFLIGHT_FAILURE_COPY.checkLabel)}: ${escapeHtml(primary.check)}</p>`,
    ...primary.evidenceLines.map(
      (line) => `<p class="muted mono">${escapeHtml(line)}</p>`,
    ),
  ].join("");
  const details =
    detailsBody.length > 0
      ? `<details><summary>${escapeHtml(PREFLIGHT_FAILURE_COPY.detailsSummary)}</summary>${detailsBody}</details>`
      : "";
  return `<p class="field-label">${escapeHtml(title)}</p>
      ${pitfall}
      <p><strong>${escapeHtml(PREFLIGHT_FAILURE_COPY.reasonLabel)}:</strong> ${escapeHtml(primary.reason)}</p>
      <p><strong>${escapeHtml(PREFLIGHT_FAILURE_COPY.checkLabel)}:</strong> ${escapeHtml(primary.check)}</p>
      <p><strong>${escapeHtml(PREFLIGHT_FAILURE_COPY.fixLabel)}:</strong> ${escapeHtml(primary.fix)}</p>
      ${details}
      ${buildWarnNotesHtml(presentation)}`;
};

/**
 * AWL card for preflight UI states.
 * idle/passed → empty. blocked/errored_check → alert-error + rerun.
 * warned → alert-warn + continue path (no primary rerun button).
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
      return `<div class="alert-error" role="alert">
        <p><strong>${escapeHtml(PREFLIGHT_FAILURE_COPY.erroredPrefix)}</strong> ${escapeHtml(message)}</p>
        ${buildRerunControls(input)}
      </div>`;
    }
    case "blocked": {
      const presentation = formatPreflightFailurePresentation(state.result);
      if (presentation === null) {
        return "";
      }
      return `<div class="alert-error" role="alert">
        ${buildFactsBody(presentation, false)}
        ${buildRerunControls(input, presentation.primary.rerunHint)}
      </div>`;
    }
    case "warned": {
      const presentation = formatPreflightFailurePresentation(state.result);
      if (presentation === null) {
        return "";
      }
      return `<div class="alert-warn" role="status">
        ${buildFactsBody(presentation, true)}
        <p class="muted" style="margin-top:8px">${escapeHtml(PREFLIGHT_FAILURE_COPY.continueHint)}</p>
      </div>`;
    }
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
};

export default buildPreflightFailureAwlBanner;
