import { buildAgentWitchLocalCloudBanner } from "../../../shell/internal/core/buildAgentWitchLocalCloudBanner";
import type { AgentWitchLocalProjectRegistryEntry } from "./agentWitchLocalProjectsRegistry";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalProjectsPageBody = (input: {
  readonly projects: readonly AgentWitchLocalProjectRegistryEntry[];
  readonly cloudAppOrigin: string;
  readonly syncMessage?: string | null;
  readonly syncOk?: boolean;
  readonly flashMessage?: string | null;
  readonly flashError?: string | null;
}): string => {
  const flash = input.flashError
    ? `<div class="alert-error">${escapeHtml(input.flashError)}</div>`
    : input.flashMessage
      ? `<div class="alert-success">${escapeHtml(input.flashMessage)}</div>`
      : "";

  const cloudBanner = buildAgentWitchLocalCloudBanner({
    cloudAppOrigin: input.cloudAppOrigin,
    manageHref: `${input.cloudAppOrigin}/projects`,
    manageLabel: "Manage projects in Agent Witch Console",
    body: "Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo’s .cursor tree.",
    syncMessage: input.syncMessage,
    syncOk: input.syncOk,
  });

  const projectRows =
    input.projects.length === 0
      ? `<p class="empty">No repositories synced yet. Add one in Agent Witch Live (task composer), then refresh this page.</p>`
      : `<ul class="project-list">${input.projects
          .map((project) => {
            const liveBadge =
              project.cloudProjectId !== undefined
                ? `<span class="project-live-badge">Live</span>`
                : `<span class="project-local-badge">Mac only</span>`;
            const chooseFolder =
              project.cloudProjectId !== undefined
                ? `<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(project.cloudProjectId)}">Choose folder…</a>`
                : "";
            return `<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(project.id)}">
                  <strong>${escapeHtml(project.name)}</strong> ${liveBadge}
                  <span class="muted mono">${escapeHtml(project.projectFolderPath)}</span>
                </a>
                <div class="actions">${chooseFolder}</div>
              </li>`;
          })
          .join("")}</ul>`;

  return `${flash}${cloudBanner}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects</h1>
      <p class="lede">Synced from Agent Witch Console when the Mac client is paired. Choose a folder to update where a project runs on this Mac.</p>
      <details class="local-advanced-block">
        <summary>Advanced: register a folder on this Mac only</summary>
        <form method="POST" action="/projects/add" class="stack">
          <p class="muted">Use when a repo is not in Agent Witch Live yet. Prefer adding repositories in the browser so tasks and this list stay aligned.</p>
          <div class="actions">
            <button class="btn btn-secondary" type="submit">Choose folder…</button>
          </div>
        </form>
      </details>
      ${projectRows}
    </section>`;
};
