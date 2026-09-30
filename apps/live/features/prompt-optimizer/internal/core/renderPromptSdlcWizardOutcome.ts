import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardStepModalBody } from "./renderPromptSdlcWizardStepModalBody";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardOutcome = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || !isPromptSdlcTerminalStatus(cycle.status)) {
    return "";
  }

  const headline =
    cycle.status === "passed"
      ? "Wizard complete"
      : cycle.status === "stopped"
        ? "Wizard ended"
        : "Wizard stopped";

  const modules =
    wizard.modules.length === 0
      ? ""
      : `<h3>Modules</h3><ol class="sdlc-wizard-outcome-modules">${wizard.modules
          .map(
            (item) =>
              `<li><strong>${escapeHtml(item.title)}</strong> — ${escapeHtml(item.status)}</li>`,
          )
          .join("")}</ol>`;

  const stepBodies = ["wizard-1", "wizard-2", "wizard-3", "wizard-4"]
    .map((stepId) => {
      const body = renderPromptSdlcWizardStepModalBody(cycle, stepId);
      if (body.trim().length === 0) {
        return "";
      }
      const title =
        stepId === "wizard-1"
          ? "Step 1 — Generalize"
          : stepId === "wizard-2"
            ? "Step 2 — Evaluate"
            : stepId === "wizard-3"
              ? "Step 3 — Separate"
              : "Step 4 — Optimize modules";
      return `<details class="sdlc-wizard-outcome-step"><summary>${escapeHtml(title)}</summary><div class="sdlc-wizard-outcome-step-body">${body}</div></details>`;
    })
    .join("");

  return `<section class="card sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><p class="eyebrow">Wizard outcome</p><h2>${escapeHtml(headline)}</h2>${modules}${stepBodies}</section>`;
};
