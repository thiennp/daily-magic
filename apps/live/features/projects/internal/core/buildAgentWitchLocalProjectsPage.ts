import { buildAgentWitchLocalCloudBanner } from "../../../shell/internal/core/buildAgentWitchLocalCloudBanner";
import type AgentWitchProjectView from "./agentWitchProjectView.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export interface AgentWitchProjectCompositionCounts {
  readonly harness: number;
  readonly workflow: number;
  readonly agent: number;
}

const formatCompositionCountsLine = (
  counts: AgentWitchProjectCompositionCounts,
): string =>
  `${counts.harness} Harness · ${counts.workflow} Workflows · ${counts.agent} Agents`;

export const buildAgentWitchLocalProjectsPageBody = (input: {
  readonly projects: readonly AgentWitchProjectView[];
  readonly compositionCountsByProjectId?: Readonly<
    Record<string, AgentWitchProjectCompositionCounts>
  >;
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
      ? `<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>`
      : `<ul class="project-list">${input.projects
          .map((project) => {
            const counts = input.compositionCountsByProjectId?.[project.id];
            const countsLine =
              counts !== undefined
                ? `<span class="muted">${escapeHtml(formatCompositionCountsLine(counts))}</span>`
                : "";
            const chooseFolder = `<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(project.id)}">Choose folder…</a>`;
            const openProject = `<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(project.id)}">Open project →</a>`;
            return `<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(project.id)}">
                  <strong>${escapeHtml(project.name)}</strong>
                  <span class="muted mono">${escapeHtml(project.projectFolderPath)}</span>
                  ${countsLine}
                </a>
                <div class="actions">${openProject}${chooseFolder}</div>
              </li>`;
          })
          .join("")}</ul>`;

  return `${flash}${cloudBanner}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo’s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${projectRows}
    </section>`;
};
