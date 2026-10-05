import type AgentWitchProjectView from "./agentWitchProjectView.type";
import type { InstalledLocalHarnessSnapshot } from "../../../harness/internal/core/readInstalledLocalHarnessSnapshot";
import type { CloudProjectComposition } from "./fetchProjectCompositionFromCloud";
import isDefaultAgentWitchProjectName from "./isDefaultAgentWitchProjectName";
import { countActiveProjectPitfalls } from "@agent-witch/shared/pitfalls";
import type { ListAgentWitchPitfallsResult } from "./pitfalls/agentWitchProjectPitfallsStore.type";
import buildProjectPitfallsTab from "./pitfalls/buildProjectPitfallsTab";

export type ProjectEditorTab =
  "harness" | "workflows" | "agents" | "knowledge" | "pitfalls";

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
        <p class="muted">Bound in Agent Witch Cloud — materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`,
    )
    .join("")}</ul>`;
};

const buildEmptyHarnessTab = (): string => `<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`;

const buildBoundHarnessPullTab = (input: {
  readonly project: AgentWitchProjectView;
  readonly alreadyInRepo: boolean;
}): string => {
  const lede = input.alreadyInRepo
    ? `This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.`
    : `This project’s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo’s <code>.cursor</code> tree.`;
  const buttonLabel = input.alreadyInRepo
    ? "Refresh in repo…"
    : "Pull into repo";
  const buttonClass = input.alreadyInRepo
    ? "btn btn-secondary"
    : "btn btn-primary";

  return `<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${escapeHtml(input.project.id)}" />
        <p class="lede">${lede}</p>
        <div class="actions">
          <button class="${buttonClass}" type="submit">${buttonLabel}</button>
        </div>
      </form>`;
};

const buildAlreadyMaterializedWithoutProfileTab = (input: {
  readonly project: AgentWitchProjectView;
  readonly linkedSetSlugs: readonly string[];
  readonly boundHarnessCount: number;
}): string => {
  const setList = `<ul class="harness-installed-set-list">${input.linkedSetSlugs
    .map(
      (slug) => `<li class="harness-installed-set">
        <p><strong>${escapeHtml(slug)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
          <input type="hidden" name="projectId" value="${escapeHtml(input.project.id)}" />
          <input type="hidden" name="setSlug" value="${escapeHtml(slug)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`,
    )
    .join("")}</ul>`;

  if (input.boundHarnessCount > 0) {
    return `<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project’s playbook is already in this repo’s <code>.cursor</code> tree. Nothing is installed in the Mac profile — refresh from Agent Witch Cloud only if you need an update.</p>
        ${setList}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${escapeHtml(input.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo…</button>
        </form>
      </div>`;
  }

  return `<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project’s playbook is already in this repo’s <code>.cursor</code> tree. Open Harness to install playbooks on this Mac if you want to change them.</p>
        ${setList}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`;
};

const buildHarnessTab = (input: {
  readonly project: AgentWitchProjectView;
  readonly installed: InstalledLocalHarnessSnapshot;
  readonly linkedSetSlugs: readonly string[];
  readonly boundHarnessCount: number;
}): string => {
  const linked = new Set(input.linkedSetSlugs);

  if (input.installed.sets.length === 0) {
    if (linked.size > 0) {
      return buildAlreadyMaterializedWithoutProfileTab({
        project: input.project,
        linkedSetSlugs: input.linkedSetSlugs,
        boundHarnessCount: input.boundHarnessCount,
      });
    }
    if (input.boundHarnessCount > 0) {
      return buildBoundHarnessPullTab({
        project: input.project,
        alreadyInRepo: false,
      });
    }
    return buildEmptyHarnessTab();
  }

  const linkedInstalledCount = input.installed.sets.filter((set) =>
    linked.has(set.slug),
  ).length;
  const alreadyInRepo = linkedInstalledCount > 0;
  const lede = alreadyInRepo
    ? `These playbooks are already in this repo’s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.`
    : `Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.`;
  const buttonLabel = alreadyInRepo ? "Refresh in repo…" : "Pull into repo";
  const buttonClass = alreadyInRepo ? "btn btn-secondary" : "btn btn-primary";

  const setRows = `<ul class="harness-installed-set-list">${input.installed.sets
    .map((set) => {
      const inRepo = linked.has(set.slug);
      const removeControl = inRepo
        ? `<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
            <input type="hidden" name="projectId" value="${escapeHtml(input.project.id)}" />
            <input type="hidden" name="setSlug" value="${escapeHtml(set.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`
        : "";
      return `<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${escapeHtml(set.slug)}"${linked.size === 0 || inRepo ? " checked" : ""} />
            <span><strong>${escapeHtml(set.name)}</strong> <span class="muted mono">(${escapeHtml(set.slug)})</span></span>
          </label>
          <p class="muted">${set.itemCount} item(s)${inRepo ? ` · <span class="muted">in repo</span>` : ""}</p>
          ${removeControl}
        </li>`;
    })
    .join("")}</ul>`;

  return `<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${escapeHtml(input.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${lede}</p>
        </form>
        ${setRows}
        <div class="actions">
          <button form="link-harness-form" class="${buttonClass}" type="submit">${buttonLabel}</button>
        </div>
      </div>`;
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
      <p class="lede">${escapeHtml(label)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${escapeHtml(input.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`;
};

export const buildAgentWitchLocalProjectEditorPageBody = (input: {
  readonly project: AgentWitchProjectView;
  readonly cloudAppOrigin: string;
  readonly installed: InstalledLocalHarnessSnapshot;
  readonly linkedSetSlugs: readonly string[];
  readonly composition: CloudProjectComposition | null;
  readonly knowledgeCandidateCount: number;
  /** null = cloud not configured on this Mac. Omit on pages that do not load pitfalls. */
  readonly pitfalls?: ListAgentWitchPitfallsResult | null;
  readonly pitfallsShowRetired?: boolean;
  readonly pitfallsEditId?: string | null;
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

  const tabBody = ((): string => {
    switch (input.activeTab) {
      case "harness":
        return buildHarnessTab({
          project: input.project,
          installed: input.installed,
          linkedSetSlugs: input.linkedSetSlugs,
          boundHarnessCount: input.composition?.counts.harness ?? 0,
        });
      case "workflows":
        return buildCompositionList(
          workflowItems,
          "No workflows installed for this project yet.",
        );
      case "agents":
        return buildCompositionList(
          agentItems,
          "No agents installed for this project yet.",
        );
      case "knowledge":
        return buildKnowledgeTab({
          projectId: input.project.id,
          candidateCount: input.knowledgeCandidateCount,
        });
      case "pitfalls":
        return buildProjectPitfallsTab({
          projectId: input.project.id,
          list: input.pitfalls ?? null,
          showRetired: input.pitfallsShowRetired ?? false,
          editId: input.pitfallsEditId ?? null,
        });
      default: {
        const _exhaustive: never = input.activeTab;
        return _exhaustive;
      }
    }
  })();

  const pitfallsTabLabel =
    input.pitfalls !== undefined && input.pitfalls !== null && input.pitfalls.ok
      ? `Pitfalls (${countActiveProjectPitfalls(input.pitfalls.items)})`
      : "Pitfalls";

  const cloudProjectHref = `${input.cloudAppOrigin.replace(/\/$/, "")}/projects/${encodeURIComponent(input.project.id)}`;
  const renameHref = `${cloudProjectHref}?rename=1`;
  const cloudManageActions = `<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${escapeHtml(cloudProjectHref)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${escapeHtml(renameHref)}" target="_blank" rel="noopener noreferrer">Rename…</a>
    </div>`;

  const deleteBlock = isDefaultAgentWitchProjectName(input.project.name)
    ? ""
    : `<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${escapeHtml(input.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;

  return `${flash}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${escapeHtml(input.project.name)}</h1>
      <p class="muted mono">${escapeHtml(input.project.projectFolderPath)}</p>
      ${cloudManageActions}
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(input.project.id)}">Change folder…</a></div>
      <nav class="project-tabs" aria-label="Project composition">
        ${tabLink("harness", `Playbooks (${counts.harness})`)}
        ${tabLink("workflows", `Workflows (${counts.workflow})`)}
        ${tabLink("agents", `Agents (${counts.agent})`)}
        ${tabLink("knowledge", `Knowledge (${input.knowledgeCandidateCount})`)}
        ${tabLink("pitfalls", pitfallsTabLabel)}
      </nav>
      <div class="project-tab-panel">
        ${tabBody}
      </div>
    </section>${deleteBlock}`;
};
