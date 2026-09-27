import { isPromptSdlcTerminalStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
import { buildPromptSdlcSteps } from "@/lib/promptSdlc/buildPromptSdlcSteps";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const toCycleView = (cycle: PromptSdlcLocalCycle): PromptSdlcCycleView => ({
  id: cycle.id,
  goal: cycle.goal,
  judgeModel: cycle.judgeModel,
  improverModel: cycle.improverModel,
  status: cycle.status,
  currentRound: cycle.currentRound,
  maxRounds: cycle.maxRounds,
  passScore: cycle.passScore,
  errorMessage: cycle.errorMessage,
  activeRunId: null,
  activeRunStatus: null,
  pendingLocal: null,
  revisions: cycle.revisions.map((revision) => ({
    id: `${cycle.id}-${revision.roundNumber}`,
    roundNumber: revision.roundNumber,
    promptText: revision.promptText,
    judgement:
      revision.judgement === null
        ? null
        : {
            score: revision.judgement.score,
            passed: revision.judgement.passed,
            reasons: revision.judgement.reasons,
            rawReply: revision.judgement.rawReply,
            judgeModel: cycle.judgeModel,
          },
  })),
});

const renderRevision = (
  revision: PromptSdlcLocalCycle["revisions"][number],
): string => {
  const score =
    revision.judgement?.score === null || revision.judgement === null
      ? "Not scored yet"
      : `Score ${revision.judgement.score}`;
  const reasons = revision.judgement?.reasons
    ? `<p class="muted">${escapeHtml(revision.judgement.reasons)}</p>`
    : "";
  const title =
    revision.roundNumber === 0
      ? "Source prompt"
      : `Revision ${revision.roundNumber}`;
  return `<article class="card"><h2>${title}</h2><p class="muted">${score}</p>${reasons}<pre class="mono">${escapeHtml(revision.promptText)}</pre></article>`;
};

export const buildPromptSdlcLocalCycleSection = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const steps = buildPromptSdlcSteps(toCycleView(cycle))
    .map(
      (step) =>
        `<li>${escapeHtml(step.state === "active" ? "In progress" : "Done")}: ${escapeHtml(step.label)}</li>`,
    )
    .join("");
  const error =
    cycle.errorMessage === null
      ? ""
      : `<div class="alert-error">${escapeHtml(cycle.errorMessage)}</div>`;
  const refresh = isPromptSdlcTerminalStatus(cycle.status)
    ? ""
    : `<script>setTimeout(() => location.reload(), 2000)</script>`;
  return `<section class="card"><p class="eyebrow">This run</p><h2>${escapeHtml(cycle.status)}</h2>${error}<ol>${steps}</ol></section>${cycle.revisions.map(renderRevision).join("")}${refresh}`;
};
