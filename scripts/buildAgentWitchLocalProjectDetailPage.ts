import type { AgentWitchLocalProjectRegistryEntry } from "./agentWitchLocalProjectsRegistry";
import type { InstalledLocalHarnessSnapshot } from "./readInstalledLocalHarnessSnapshot";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalProjectDetailPageBody = (input: {
  readonly project: AgentWitchLocalProjectRegistryEntry;
  readonly installed: InstalledLocalHarnessSnapshot;
  readonly linkedSetSlugs: readonly string[];
  readonly flashMessage?: string | null;
  readonly flashError?: string | null;
}): string => {
  const flash = input.flashError
    ? `<div class="alert-error">${escapeHtml(input.flashError)}</div>`
    : input.flashMessage
      ? `<div class="alert-success">${escapeHtml(input.flashMessage)}</div>`
      : "";

  const linked = new Set(input.linkedSetSlugs);

  const setRows =
    input.installed.sets.length === 0
      ? `<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness → Import</a> first.</p>`
      : `<ul class="harness-installed-set-list">${input.installed.sets
          .map(
            (set) => `<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${escapeHtml(set.slug)}"${linked.has(set.slug) ? " checked" : ""} />
            <span><strong>${escapeHtml(set.name)}</strong> <span class="muted mono">(${escapeHtml(set.slug)})</span></span>
          </label>
          <p class="muted">${set.itemCount} item(s)</p>
        </li>`,
          )
          .join("")}</ul>`;

  return `${flash}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${escapeHtml(input.project.name)}</h1>
      <p class="muted mono">${escapeHtml(input.project.projectFolderPath)}</p>
      <p class="lede">Linked harness sets are copied into this project&apos;s <code>.cursor</code> folder and recorded in <code>.agent-witch/project.json</code>.</p>
      <form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${escapeHtml(input.project.id)}" />
        <p class="field-label">Harness sets</p>
        ${setRows}
        <div class="actions">
          <button class="btn btn-primary" type="submit"${input.installed.sets.length === 0 ? " disabled" : ""}>Save linked harness</button>
        </div>
      </form>
    </section>`;
};
