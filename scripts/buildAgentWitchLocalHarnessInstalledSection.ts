import type { InstalledLocalHarnessSnapshot } from "./readInstalledLocalHarnessSnapshot";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalHarnessInstalledSection = (input: {
  readonly installed: InstalledLocalHarnessSnapshot;
  readonly defaultProjectFolder: string;
  readonly applyFlashMessage?: string | null;
  readonly applyFlashError?: string | null;
}): string => {
  const applyFlash = input.applyFlashError
    ? `<div class="alert-error">${escapeHtml(input.applyFlashError)}</div>`
    : input.applyFlashMessage
      ? `<div class="alert-success">${escapeHtml(input.applyFlashMessage)}</div>`
      : "";

  if (input.installed.sets.length === 0) {
    return `<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">Nothing in <code>~/.agent-witch</code> yet. Use <strong>Reveal &amp; submit</strong> below to import from a repo.</p>
    </section>`;
  }

  const setRows = input.installed.sets
    .map(
      (set) => `<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${escapeHtml(set.slug)}" checked />
            <span><strong>${escapeHtml(set.name)}</strong> <span class="muted mono">(${escapeHtml(set.slug)})</span></span>
          </label>
          <p class="muted">${set.itemCount} item(s)</p>
        </li>`,
    )
    .join("");

  const manifestMeta =
    input.installed.manifestUpdatedAt !== null
      ? `<p class="muted">Manifest updated ${escapeHtml(input.installed.manifestUpdatedAt)}</p>`
      : "";

  return `${applyFlash}<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">${input.installed.sets.length} set(s) stored on this Mac. Apply selected sets into a project&apos;s <code>.cursor</code> folder and record the link in <code>.agent-witch/project.json</code>.</p>
      ${manifestMeta}
      <form method="POST" action="/harness/apply-to-project" class="stack harness-apply-form">
        <label class="field">
          <span class="field-label">Project folder (repo root)</span>
          <input class="input" id="applyProjectFolder" name="projectFolder" type="text" value="${escapeHtml(input.defaultProjectFolder)}" placeholder="~/dev/my-app" autocomplete="off" required />
        </label>
        <div class="actions">
          <button class="btn btn-secondary" type="button" id="pickApplyProjectFolder">Choose folder…</button>
        </div>
        <p class="field-label">Sets to apply</p>
        <ul class="harness-installed-set-list">${setRows}</ul>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Apply to project</button>
        </div>
      </form>
    </section>
    <script>(() => {
      const pickBtn = document.getElementById("pickApplyProjectFolder");
      const projectInput = document.getElementById("applyProjectFolder");
      pickBtn?.addEventListener("click", async () => {
        const response = await fetch("/api/harness/pick-folder", { method: "POST" });
        const payload = await response.json();
        if (projectInput instanceof HTMLInputElement && typeof payload.path === "string") {
          projectInput.value = payload.path;
        }
      });
    })();</script>`;
};
