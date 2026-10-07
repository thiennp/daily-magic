import {
  type AgentWitchReviveStep,
  buildAgentWitchReviveSteps,
  resolveAgentWitchRevivePlatform,
} from "@agent-witch/install-layout/presentation";
import {
  AGENT_WITCH_LOCAL_INSTALL_DIR_NAME,
  AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX,
  AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX,
} from "@agent-witch/install-layout/types";

const installDirBasename = (installDir: string): string => {
  const trimmed = installDir.replace(/\/$/, "");
  const slashIndex = trimmed.lastIndexOf("/");
  return slashIndex === -1 ? trimmed : trimmed.slice(slashIndex + 1);
};

const resolveLaunchAgentPrefixForInstallDir = (installDir: string): string =>
  installDirBasename(installDir) === AGENT_WITCH_LOCAL_INSTALL_DIR_NAME
    ? AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX
    : AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX;

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderReviveStep = (
  step: AgentWitchReviveStep,
  showLabel: boolean,
): string => `${showLabel ? `<h3>${escapeHtml(step.label)}</h3>` : ""}
    <p class="muted">${escapeHtml(step.instructions)}</p>
    <pre class="sdlc-pre mono">${escapeHtml(step.command)}</pre>
    <p class="muted">${escapeHtml(step.note)}</p>`;

/**
 * Revive card on the AWL Status page. `platform` is the OS this AWL runs on
 * (`process.platform`); an unknown OS lists the command for every OS.
 */
export const buildAgentWitchReviveAwlStatusSection = (input: {
  readonly installDir: string;
  readonly platform: string;
}): string => {
  const steps = buildAgentWitchReviveSteps({
    platform: resolveAgentWitchRevivePlatform(input.platform),
    installDirName: installDirBasename(input.installDir),
    launchAgentPrefix: resolveLaunchAgentPrefixForInstallDir(input.installDir),
  });
  const showLabels = steps.length > 1;
  const chooser = showLabels
    ? `\n    <p class="muted">Use the command for this computer's operating system.</p>`
    : "";

  return `<section class="card">
    <p class="eyebrow">AgentWitch Local</p>
    <h2>Revive local app</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if AgentWitch Cloud cannot open Status, restart the AgentWitch client on this computer.</p>${chooser}
    ${steps.map((step) => renderReviveStep(step, showLabels)).join("\n    ")}
  </section>`;
};
