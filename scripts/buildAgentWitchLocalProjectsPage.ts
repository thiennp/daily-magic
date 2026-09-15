import type { AgentWitchLocalProjectRegistryEntry } from "./agentWitchLocalProjectsRegistry";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalProjectsPageBody = (input: {
  readonly projects: readonly AgentWitchLocalProjectRegistryEntry[];
  readonly flashMessage?: string | null;
  readonly flashError?: string | null;
}): string => {
  const flash = input.flashError
    ? `<div class="alert-error">${escapeHtml(input.flashError)}</div>`
    : input.flashMessage
      ? `<div class="alert-success">${escapeHtml(input.flashMessage)}</div>`
      : "";

  const rows =
    input.projects.length === 0
      ? `<p class="empty">No projects yet. Add a repo folder to link harness sets and run tasks in context.</p>`
      : `<ul class="project-list">${input.projects
          .map(
            (project) =>
              `<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(project.id)}">
                  <strong>${escapeHtml(project.name)}</strong>
                  <span class="muted mono">${escapeHtml(project.projectFolderPath)}</span>
                </a>
              </li>`,
          )
          .join("")}</ul>`;

  return `${flash}<section class="card">
      <p class="eyebrow">Workspaces</p>
      <h1>Projects</h1>
      <p class="lede">Register repo folders on this Mac. Open a project to choose which profile harness sets apply to its <code>.cursor</code> tree.</p>
      <form method="POST" action="/projects/add" class="stack">
        <div class="actions">
          <button class="btn btn-primary" type="submit">Add project…</button>
        </div>
      </form>
      ${rows}
    </section>`;
};
