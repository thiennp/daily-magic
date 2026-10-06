import { RULE_COMPARE_COPY } from "./ruleCompareCopy.constant";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** Success flash after Drop, with Undo (restore) button. */
export const renderRuleDropFlash = (input: {
  readonly projectId: string;
  readonly ruleId: string;
  readonly title: string;
  readonly prompt?: string;
}): string => {
  const message = RULE_COMPARE_COPY.dropped(input.title);
  const promptField =
    input.prompt !== undefined && input.prompt.length > 0
      ? `<input type="hidden" name="rulePrompt" value="${escapeHtml(input.prompt)}" />`
      : "";
  return `<div class="alert-success actions">
      <span>${escapeHtml(message)}</span>
      <form method="POST" action="/project/rules/restore" class="inline-form">
        <input type="hidden" name="projectId" value="${escapeHtml(input.projectId)}" />
        <input type="hidden" name="ruleId" value="${escapeHtml(input.ruleId)}" />
        ${promptField}
        <button class="btn btn-secondary btn-compact" type="submit">${escapeHtml(RULE_COMPARE_COPY.undo)}</button>
      </form>
    </div>`;
};

export const renderRuleUsageMessage = (
  message: string,
  kind: "error" | "muted" = "error",
): string => {
  const cls = kind === "error" ? "alert-error" : "muted";
  return `<p class="${cls}">${escapeHtml(message)}</p>`;
};

export const renderRuleUsageRetry = (input: {
  readonly projectId: string;
  readonly prompt: string;
}): string => {
  const href = `/project?id=${encodeURIComponent(input.projectId)}&tab=harness&rulePrompt=${encodeURIComponent(input.prompt)}`;
  return `<p class="alert-error">${escapeHtml(RULE_COMPARE_COPY.usageError)} <a href="${escapeHtml(href)}">${escapeHtml(RULE_COMPARE_COPY.tryAgain)}</a></p>`;
};
