import {
  PROJECT_PITFALL_LIMITS,
  PROJECT_PITFALL_MAX_ACTIVE,
  countActiveProjectPitfalls,
  type ProjectPitfallSeverity,
  type ProjectPitfallView,
} from "@agent-witch/shared/pitfalls";
import type { ListAgentWitchPitfallsResult } from "./agentWitchProjectPitfallsStore.type";
import {
  PROJECT_PITFALL_POST_PATHS,
  type ProjectPitfallPostAction,
} from "./projectPitfallPostPaths.constant";

export const PROJECT_PITFALL_NEW_EDIT_ID = "new";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const SEVERITY_LABELS: Readonly<Record<ProjectPitfallSeverity, string>> = {
  block: "Must fix",
  warn: "Warning",
  info: "Note",
};

const SOURCE_LABELS: Readonly<Record<ProjectPitfallView["source"], string>> = {
  seed: "Built-in",
  project: "This project",
  retired: "Retired",
};

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

export const formatPitfallLastHit = (
  lastSeenAt: string | null,
  nowMs: number,
): string => {
  if (lastSeenAt === null) {
    return "Never hit";
  }
  const at = new Date(lastSeenAt).getTime();
  if (Number.isNaN(at)) {
    return "Never hit";
  }
  const elapsed = Math.max(0, nowMs - at);
  if (elapsed < MINUTE_MS) {
    return "Last hit just now";
  }
  if (elapsed < HOUR_MS) {
    return `Last hit ${Math.floor(elapsed / MINUTE_MS)} min ago`;
  }
  if (elapsed < DAY_MS) {
    return `Last hit ${Math.floor(elapsed / HOUR_MS)}h ago`;
  }
  const days = Math.floor(elapsed / DAY_MS);
  if (days < 30) {
    return `Last hit ${days} ${days === 1 ? "day" : "days"} ago`;
  }
  return `Last hit ${new Date(at).toISOString().slice(0, 10)}`;
};

/** Missing updatedAt (null) → plain "Not updated yet". */
export const formatPitfallUpdatedAt = (updatedAt: string | null): string => {
  if (updatedAt === null) {
    return "Not updated yet";
  }
  const at = new Date(updatedAt).getTime();
  if (Number.isNaN(at)) {
    return "Not updated yet";
  }
  return `Updated ${new Date(at).toISOString().slice(0, 10)}`;
};

const tabHref = (
  projectId: string,
  params: Readonly<Record<string, string>>,
): string => {
  const query = new URLSearchParams({
    id: projectId,
    tab: "pitfalls",
    ...params,
  });
  return `/project?${query.toString()}`;
};

const retiredParam = (
  showRetired: boolean,
): Readonly<Record<string, string>> => (showRetired ? { retired: "1" } : {});

const buildPitfallForm = (input: {
  readonly projectId: string;
  readonly item: ProjectPitfallView | null;
  readonly showRetired: boolean;
  readonly postPaths: Readonly<Record<ProjectPitfallPostAction, string>>;
}): string => {
  const { item } = input;
  const severity = item?.severity ?? "warn";
  const checkCommand = item?.check.kind === "command" ? item.check.value : "";
  const heading = item === null ? "Add pitfall" : "Edit pitfall";
  const seedNote =
    item?.source === "seed"
      ? `<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>`
      : "";
  const option = (value: ProjectPitfallSeverity): string =>
    `<option value="${value}"${severity === value ? " selected" : ""}>${SEVERITY_LABELS[value]}</option>`;

  return `<form method="POST" action="${input.postPaths.save}" class="stack pitfall-form" aria-label="${heading}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
      <p class="field-label">${heading}</p>
      ${seedNote}
      <input type="hidden" name="projectId" value="${escapeHtml(input.projectId)}" />
      <input type="hidden" name="pitfallId" value="${escapeHtml(item?.id ?? "")}" />
      <input type="hidden" name="tags" value="${escapeHtml((item?.tags ?? []).join(", "))}" />
      ${input.showRetired ? `<input type="hidden" name="showRetired" value="1" />` : ""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${PROJECT_PITFALL_LIMITS.symptom}" value="${escapeHtml(item?.symptom ?? "")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${PROJECT_PITFALL_LIMITS.avoidance}" rows="3" placeholder="What to do instead">${escapeHtml(item?.avoidance ?? "")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${PROJECT_PITFALL_LIMITS.cause}" rows="2" placeholder="What leads to this trap">${escapeHtml(item?.cause ?? "")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${escapeHtml((item?.keywords ?? []).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${PROJECT_PITFALL_LIMITS.checkValue}" value="${escapeHtml(checkCommand)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${option("block")}${option("warn")}${option("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${escapeHtml(tabHref(input.projectId, retiredParam(input.showRetired)))}">Cancel</a>
      </div>
    </form>`;
};

const buildPitfallRow = (input: {
  readonly projectId: string;
  readonly item: ProjectPitfallView;
  readonly showRetired: boolean;
  readonly nowMs: number;
  readonly postPaths: Readonly<Record<ProjectPitfallPostAction, string>>;
}): string => {
  const { item, projectId, showRetired } = input;
  const isRetired = item.source === "retired";
  const hidden = `<input type="hidden" name="projectId" value="${escapeHtml(projectId)}" />
            <input type="hidden" name="pitfallId" value="${escapeHtml(item.id)}" />
            ${showRetired ? `<input type="hidden" name="showRetired" value="1" />` : ""}`;
  const actions = isRetired
    ? `<form method="POST" action="${input.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${hidden}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`
    : `<a class="btn btn-secondary btn-compact" href="${escapeHtml(tabHref(projectId, { ...retiredParam(showRetired), edit: item.id }))}">Edit</a>
          <form method="POST" action="${input.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${hidden}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`;
  const triggers =
    item.keywords.length > 0
      ? `<p class="muted">Triggers: ${item.keywords.map((keyword) => escapeHtml(keyword)).join(", ")}</p>`
      : "";

  return `<li class="harness-installed-set pitfall-row${isRetired ? " pitfall-row-retired" : ""}" data-pitfall-id="${escapeHtml(item.id)}">
        <p><strong>${escapeHtml(item.symptom)}</strong> <span class="muted">· ${SEVERITY_LABELS[item.severity]} · ${SOURCE_LABELS[item.source]}</span></p>
        <p>Fix: ${escapeHtml(item.avoidance)}</p>
        ${triggers}
        <p class="muted">${escapeHtml(formatPitfallLastHit(item.lastSeenAt, input.nowMs))}</p>
        <p class="muted">${escapeHtml(formatPitfallUpdatedAt(item.updatedAt))}</p>
        <div class="actions">${actions}</div>
      </li>`;
};

/**
 * AWL project editor → Pitfalls tab. Cloud is the source of truth; this view
 * renders whatever the pitfalls store returned (seed + project overrides).
 */
const buildProjectPitfallsTab = (input: {
  readonly projectId: string;
  readonly list: ListAgentWitchPitfallsResult | null;
  readonly showRetired: boolean;
  readonly editId: string | null;
  readonly nowMs?: number;
  /** Form action paths — injected so this view never imports the POST handler. */
  readonly postPaths?: Readonly<Record<ProjectPitfallPostAction, string>>;
}): string => {
  const postPaths = input.postPaths ?? PROJECT_PITFALL_POST_PATHS;
  if (input.list === null || !input.list.ok) {
    return `<p class="empty">Could not load pitfalls. Check this computer on Status, then reload.</p>`;
  }

  const nowMs = input.nowMs ?? Date.now();
  const items = input.list.items;
  const activeCount = countActiveProjectPitfalls(items);
  const atLimit = activeCount >= PROJECT_PITFALL_MAX_ACTIVE;
  const visible = input.showRetired
    ? items
    : items.filter((item) => item.source !== "retired");

  const editing =
    input.editId === null
      ? null
      : input.editId === PROJECT_PITFALL_NEW_EDIT_ID
        ? atLimit
          ? null
          : { item: null }
        : (() => {
            const found = items.find(
              (item) => item.id === input.editId && item.source !== "retired",
            );
            return found === undefined ? null : { item: found };
          })();

  const form =
    editing === null
      ? ""
      : buildPitfallForm({
          projectId: input.projectId,
          item: editing.item,
          showRetired: input.showRetired,
          postPaths,
        });

  const addControl = atLimit
    ? `<p class="muted">${PROJECT_PITFALL_MAX_ACTIVE} of ${PROJECT_PITFALL_MAX_ACTIVE} active. Retire one to add another.</p>`
    : `<a class="btn btn-primary" href="${escapeHtml(tabHref(input.projectId, { ...retiredParam(input.showRetired), edit: PROJECT_PITFALL_NEW_EDIT_ID }))}">Add pitfall</a>`;
  const retiredToggle = input.showRetired
    ? `<a class="btn btn-secondary" href="${escapeHtml(tabHref(input.projectId, {}))}">Hide retired</a>`
    : `<a class="btn btn-secondary" href="${escapeHtml(tabHref(input.projectId, { retired: "1" }))}">Show retired</a>`;

  const list =
    visible.length === 0
      ? `<p class="empty">No pitfalls for this project. Add one when you spot a mistake that keeps coming back.</p>`
      : `<ul class="harness-installed-set-list">${visible
          .map((item) =>
            buildPitfallRow({
              projectId: input.projectId,
              item,
              showRetired: input.showRetired,
              nowMs,
              postPaths,
            }),
          )
          .join("")}</ul>`;

  return `<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      <p class="muted">${activeCount} of ${PROJECT_PITFALL_MAX_ACTIVE} active</p>
      <div class="actions">${editing === null ? addControl : ""}${retiredToggle}</div>
      ${form}
      ${list}
    </section>`;
};

export default buildProjectPitfallsTab;
