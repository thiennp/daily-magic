import type { InstalledLocalHarnessSnapshot } from "./readInstalledLocalHarnessSnapshot";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalHarnessInstalledSection = (input: {
  readonly installed: InstalledLocalHarnessSnapshot;
  readonly cloudAppOrigin: string;
}): string => {
  const installLink = `${input.cloudAppOrigin.replace(/\/$/, "")}/marketplace`;
  const managePlaybooks = `<a class="field-link" href="${escapeHtml(installLink)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;

  if (input.installed.sets.length === 0) {
    return `<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console — files land in your profile harness on this Mac. ${managePlaybooks}</p>
    </section>`;
  }

  const setRows = input.installed.sets
    .map(
      (set) => `<li class="harness-installed-set">
          <span><strong>${escapeHtml(set.name)}</strong> <span class="muted mono">(${escapeHtml(set.slug)})</span></span>
          <p class="muted">${set.itemCount} item(s)</p>
        </li>`,
    )
    .join("");

  const manifestMeta =
    input.installed.manifestUpdatedAt !== null
      ? `<p class="muted">Manifest updated ${escapeHtml(input.installed.manifestUpdatedAt)}</p>`
      : "";

  return `<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${input.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${managePlaybooks}</p>
      ${manifestMeta}
      <ul class="harness-installed-set-list">${setRows}</ul>
    </section>`;
};
