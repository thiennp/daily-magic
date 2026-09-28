import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderRevision = (
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
  const title =
    revision.roundNumber === 0
      ? "Source prompt"
      : `Revision ${revision.roundNumber}`;
  const body =
    writerFailure === null
      ? `<pre class="mono">${escapeHtml(revision.promptText)}</pre>`
      : `<div class="alert-error">${escapeHtml(writerFailure)}</div>`;
  return `<article class="card"><h2>${title}</h2><p class="muted">${score}</p>${reasons}${body}</article>`;
};

export const renderPromptSdlcLocalRevisions = (
  cycle: PromptSdlcLocalCycle,
): string => cycle.revisions.map(renderRevision).join("");
