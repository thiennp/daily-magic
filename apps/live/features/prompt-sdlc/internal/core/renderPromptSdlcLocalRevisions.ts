import { formatPromptSdlcRunDelay } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderRevision = (
  cycle: PromptSdlcLocalCycle,
  revision: PromptSdlcLocalCycle["revisions"][number],
): string => {
  const score =
    revision.judgement?.score === null || revision.judgement === null
      ? "Not scored yet"
      : `Score ${revision.judgement.score}`;
  const writerFailure = describePromptSdlcWriterTerminalFailure(
    revision.promptText,
  );
  const reasons = revision.judgement?.reasons
    ? `<p class="muted">${escapeHtml(revision.judgement.reasons)}</p>`
    : "";
  const runBody = (revision.run?.evidence ?? revision.run?.output ?? "").trim();
  const lookedAt = revision.run?.lookedAt?.trim() ?? "";
  const run =
    revision.run === undefined
      ? ""
      : `${lookedAt.length === 0 ? "" : `<p class="muted">Looked at ${escapeHtml(lookedAt)}.</p>`}<pre class="mono">${escapeHtml(runBody.length === 0 ? revision.run.output : runBody)}</pre><p class="muted">Tokens used: ${revision.run.tokens === null ? "not reported" : String(revision.run.tokens)}. Delay: ${formatPromptSdlcRunDelay(revision.run.delayMs)}.</p>`;
  const title =
    revision.roundNumber === 0
      ? "Source prompt"
      : `Revision ${revision.roundNumber}`;
  const displayPrompt =
    revision.roundNumber === 0 &&
    cycle.wizard !== undefined &&
    cycle.wizard.templatedPrompt.trim().length > 0
      ? cycle.wizard.templatedPrompt
      : revision.promptText;
  const body =
    writerFailure === null
      ? `<pre class="mono">${escapeHtml(displayPrompt)}</pre>`
      : `<div class="alert-error">${escapeHtml(writerFailure)}</div>`;
  return `<article class="card"><h2>${title}</h2><p class="muted">${score}</p>${reasons}${run}${body}</article>`;
};

export const renderPromptSdlcLocalRevisions = (
  cycle: PromptSdlcLocalCycle,
): string =>
  cycle.revisions.map((revision) => renderRevision(cycle, revision)).join("");
