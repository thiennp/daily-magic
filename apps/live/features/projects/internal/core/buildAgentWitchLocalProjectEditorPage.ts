import type AgentWitchProjectView from "./agentWitchProjectView.type";
import type { InstalledLocalHarnessSnapshot } from "../../../harness/internal/core/readInstalledLocalHarnessSnapshot";
import type { CloudProjectComposition } from "./fetchProjectCompositionFromCloud";

export type ProjectEditorTab = "harness" | "workflows" | "agents" | "knowledge";

type CompositionListItem = {
  readonly name: string;
  readonly versionLabel: string | null;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const buildCompositionList = (
  items: readonly CompositionListItem[],
  emptyLabel: string,
): string => {
  if (items.length === 0) {
    return `<p class="empty">${escapeHtml(emptyLabel)}</p>`;
  }

  return `<ul class="harness-installed-set-list">${items
    .map(
      (item) => `<li class="harness-installed-set">
        <p><strong>${escapeHtml(item.name)}</strong>${item.versionLabel ? ` <span class="muted mono">v${escapeHtml(item.versionLabel)}</span>` : ""}</p>
        <p class="muted">Bound in Agent Witch Console — materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`,
    )
    .join("")}</ul>`;
};

const buildHarnessTab = (input: {
  readonly project: AgentWitchProjectView;
  readonly installed: InstalledLocalHarnessSnapshot;
  readonly linkedSetSlugs: readonly string[];
}): string => {
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

  return `<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${escapeHtml(input.project.id)}" />
        <p class="field-label">Installed</p>
        ${setRows}
        <div class="actions">
          <button class="btn btn-primary" type="submit"${input.installed.sets.length === 0 ? " disabled" : ""}>Pull into repo</button>
        </div>
      </form>`;
};

const buildKnowledgeTab = (input: {
  readonly projectId: string;
  readonly candidateCount: number;
}): string => {
  if (input.candidateCount === 0) {
    return `<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>`;
  }

  const label =
    input.candidateCount === 1
      ? "1 lesson ready to promote"
      : `${input.candidateCount} lessons ready to promote`;

  return `<section class="stack">
      <p class="lede">${escapeHtml(label)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${escapeHtml(input.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`;
};

export const buildAgentWitchLocalProjectEditorPageBody = (input: {
  readonly project: AgentWitchProjectView;
  readonly installed: InstalledLocalHarnessSnapshot;
  readonly linkedSetSlugs: readonly string[];
  readonly composition: CloudProjectComposition | null;
  readonly knowledgeCandidateCount: number;
  readonly activeTab: ProjectEditorTab;
  readonly flashMessage?: string | null;
  readonly flashError?: string | null;
}): string => {
  const flash = input.flashError
    ? `<div class="alert-error">${escapeHtml(input.flashError)}</div>`
    : input.flashMessage
      ? `<div class="alert-success">${escapeHtml(input.flashMessage)}</div>`
      : "";

  const counts = input.composition?.counts ?? {
    harness: input.linkedSetSlugs.length,
    workflow: 0,
    agent: 0,
  };

  const tabLink = (tab: ProjectEditorTab, label: string): string => {
    const active = input.activeTab === tab ? " project-tab-active" : "";
    return `<a class="project-tab${active}" href="/project?id=${encodeURIComponent(input.project.id)}&tab=${tab}">${escapeHtml(label)}</a>`;
  };

  const workflowItems =
    input.composition?.items.filter((item) => item.kind === "workflow") ?? [];
  const agentItems =
    input.composition?.items.filter((item) => item.kind === "agent") ?? [];

  let tabBody = "";
  if (input.activeTab === "harness") {
    tabBody = buildHarnessTab(input);
  } else if (input.activeTab === "workflows") {
    tabBody = buildCompositionList(
      workflowItems,
      "No workflows installed for this project yet.",
    );
  } else if (input.activeTab === "agents") {
    tabBody = buildCompositionList(
      agentItems,
      "No agents installed for this project yet.",
    );
  } else {
    tabBody = buildKnowledgeTab({
      projectId: input.project.id,
      candidateCount: input.knowledgeCandidateCount,
    });
  }

  return `${flash}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${escapeHtml(input.project.name)}</h1>
      <p class="muted mono">${escapeHtml(input.project.projectFolderPath)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(input.project.id)}">Change folder…</a></div>
      <nav class="project-tabs" aria-label="Project composition">
        ${tabLink("harness", `Harness (${counts.harness})`)}
        ${tabLink("workflows", `Workflows (${counts.workflow})`)}
        ${tabLink("agents", `Agents (${counts.agent})`)}
        ${tabLink("knowledge", `Knowledge (${input.knowledgeCandidateCount})`)}
      </nav>
      <div class="project-tab-panel">
        ${tabBody}
      </div>
    </section>`;
};
