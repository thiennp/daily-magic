import type { InstalledLocalHarnessSnapshot } from "./readInstalledLocalHarnessSnapshot";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalHarnessInstalledSection = (input: {
  readonly installed: InstalledLocalHarnessSnapshot;
}): string => {
  if (input.installed.sets.length === 0) {
    return `<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">Nothing in <code>~/.agent-witch</code> yet. Use <strong>Import</strong> below to scan a folder.</p>
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
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">${input.installed.sets.length} set(s) on this Mac. Link them to a repo under <a href="/projects">Projects</a>.</p>
      ${manifestMeta}
      <ul class="harness-installed-set-list">${setRows}</ul>
    </section>`;
};
