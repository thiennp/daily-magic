import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { promptSdlcLocalHistoryTitle } from "./promptSdlcLocalHistoryTitle";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const stepLabel = (
  gate: NonNullable<PromptSdlcLocalCycle["wizard"]>["gate"],
): string => {
  if (gate === "generalize") {
    return "Step 1 — Generalize";
  }
  if (gate === "evaluate") {
    return "Step 2 — Evaluate";
  }
  if (gate === "separate") {
    return "Step 3 — Separate";
  }
  return "Step 4 — Optimize modules";
};

export const renderPromptSdlcWizardResumeBanner = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || wizard.gate === null) {
    return "";
  }
  const title = promptSdlcLocalHistoryTitle(cycle.goal);
  const step = stepLabel(wizard.gate);
  return `<section class="card sdlc-wizard-resume" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${escapeHtml(title)}</h2>
    <p class="lede">Paused at <strong>${escapeHtml(step)}</strong>. Continue where you left off or open another run below.</p>
    <div class="actions">
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${escapeHtml(cycle.id)}">Resume wizard</a>
    </div>
  </section>`;
};
