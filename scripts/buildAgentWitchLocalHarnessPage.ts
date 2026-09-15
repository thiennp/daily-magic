import type { LocalHarnessRevealResult } from "./localHarness/revealLocalHarnessCandidates.types";
import type { LocalHarnessSubmitSet } from "./localHarness/submitLocalHarnessSelection";
import path from "node:path";
import { buildAgentWitchLocalHarnessInstalledSection } from "./buildAgentWitchLocalHarnessInstalledSection";
import { buildLocalHarnessRevealTreeFromItems } from "./localHarness/buildLocalHarnessRevealTree";
import { buildLocalHarnessRevealTreeHtml } from "./localHarness/buildLocalHarnessRevealTreeHtml";
import type { InstalledLocalHarnessSnapshot } from "./readInstalledLocalHarnessSnapshot";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildLocalHarnessRevealClientScript = (): string => `(() => {
  const scanInput = document.getElementById("scanFolder");
  const revealBtn = document.getElementById("revealStart");
  const stopBtn = document.getElementById("revealStop");
  const folderList = document.getElementById("revealFolderList");
  const progress = document.getElementById("revealProgress");
  let source = null;

  const readLastRevealScanFolder = () => {
    if (!(scanInput instanceof HTMLInputElement)) {
      return "";
    }
    return scanInput.dataset.lastRevealScan ?? "";
  };

  const normalizeScanFolder = (value) => value.trim();

  const syncRevealButtonVisibility = () => {
    if (!(scanInput instanceof HTMLInputElement)) {
      return;
    }
    if (!(revealBtn instanceof HTMLButtonElement)) {
      return;
    }
    const lastRevealScanFolder = readLastRevealScanFolder();
    if (lastRevealScanFolder.length === 0) {
      revealBtn.hidden = false;
      return;
    }
    const matchesLastReveal =
      normalizeScanFolder(scanInput.value) ===
      normalizeScanFolder(lastRevealScanFolder);
    revealBtn.hidden = matchesLastReveal;
  };

  const setRevealRunning = (running) => {
    if (revealBtn instanceof HTMLButtonElement) {
      if (running) {
        revealBtn.hidden = true;
      } else {
        syncRevealButtonVisibility();
      }
    }
    if (stopBtn instanceof HTMLButtonElement) {
      stopBtn.hidden = !running;
    }
    if (progress instanceof HTMLElement) {
      progress.hidden = !running;
    }
  };

  syncRevealButtonVisibility();
  scanInput?.addEventListener("input", syncRevealButtonVisibility);
  scanInput?.addEventListener("change", syncRevealButtonVisibility);

  const finishReveal = (query) => {
    if (source) {
      source.close();
      source = null;
    }
    setRevealRunning(false);
    window.location.href = "/harness?" + query;
  };

  document.getElementById("pickFolder")?.addEventListener("click", async () => {
    const response = await fetch("/api/harness/pick-folder", { method: "POST" });
    const payload = await response.json();
    if (scanInput instanceof HTMLInputElement && typeof payload.path === "string") {
      scanInput.value = payload.path;
      syncRevealButtonVisibility();
    }
  });

  revealBtn?.addEventListener("click", () => {
    if (!(scanInput instanceof HTMLInputElement)) {
      return;
    }
    const scanRoot = scanInput.value.trim();
    if (scanRoot.length === 0) {
      window.alert("Choose a folder to scan first.");
      return;
    }
    if (folderList instanceof HTMLElement) {
      folderList.replaceChildren();
    }
    setRevealRunning(true);
    source = new EventSource(
      "/api/harness/reveal/stream?scanRoot=" + encodeURIComponent(scanRoot),
    );
    source.addEventListener("folder", (event) => {
      const data = JSON.parse(event.data);
      if (!(folderList instanceof HTMLElement)) {
        return;
      }
      let group = folderList.querySelector(
        '[data-group-name="' + CSS.escape(data.groupName) + '"]',
      );
      if (!(group instanceof HTMLDetailsElement)) {
        group = document.createElement("details");
        group.className = "reveal-live-group";
        group.open = false;
        group.dataset.groupName = data.groupName;
        group.innerHTML =
          '<summary class="reveal-group-summary">' +
          data.groupName +
          '</summary><ul class="reveal-live-tree"></ul>';
        folderList.appendChild(group);
      }
    });
    source.addEventListener("set", (event) => {
      const data = JSON.parse(event.data);
      if (!(folderList instanceof HTMLElement)) {
        return;
      }
      let group = folderList.querySelector(
        '[data-group-name="' + CSS.escape(data.groupName) + '"]',
      );
      if (!(group instanceof HTMLDetailsElement)) {
        group = document.createElement("details");
        group.className = "reveal-live-group";
        group.open = false;
        group.dataset.groupName = data.groupName;
        group.innerHTML =
          '<summary class="reveal-group-summary">' +
          data.groupName +
          '</summary><ul class="reveal-live-tree"></ul>';
        folderList.appendChild(group);
      }
      const list = group.querySelector(".reveal-live-tree");
      if (!(list instanceof HTMLUListElement)) {
        return;
      }
      for (const relativePath of data.tree ?? []) {
        const row = document.createElement("li");
        row.className = "reveal-folder-row mono";
        row.textContent = relativePath;
        list.appendChild(row);
      }
    });
    source.addEventListener("done", () => {
      finishReveal("revealed=1");
    });
    source.addEventListener("stopped", () => {
      finishReveal("revealed=1&stopped=1");
    });
    source.addEventListener("error", () => {
      if (source) {
        finishReveal("revealed=1&stopped=1");
      }
    });
  });

  stopBtn?.addEventListener("click", () => {
    finishReveal("revealed=1&stopped=1");
  });

})();`;

export const buildLocalHarnessTreePreviewClientScript = (): string => `(() => {
  document.querySelectorAll(".harness-tree-preview").forEach((button) => {
    button.addEventListener("click", async () => {
      const preview = button.nextElementSibling;
      if (!(preview instanceof HTMLPreElement)) {
        return;
      }
      if (!preview.hidden) {
        preview.hidden = true;
        return;
      }
      if (preview.dataset.loaded !== "1") {
        const sourcePath = button.getAttribute("data-source-path") ?? "";
        const response = await fetch(
          "/api/harness/file-content?path=" + encodeURIComponent(sourcePath),
        );
        const payload = await response.json();
        preview.textContent =
          typeof payload.content === "string"
            ? payload.content
            : payload.errorMessage ?? "Could not load file.";
        preview.dataset.loaded = "1";
      }
      preview.hidden = false;
    });
  });
})();`;

export const buildAgentWitchLocalHarnessPageBody = (input: {
  readonly scanFolder: string;
  readonly reveal: LocalHarnessRevealResult | null;
  readonly installed: InstalledLocalHarnessSnapshot;
  readonly flashMessage?: string | null;
  readonly flashError?: string | null;
  readonly importSectionExpanded: boolean;
}): string => {
  const installedSection = buildAgentWitchLocalHarnessInstalledSection({
    installed: input.installed,
  });

  const flash = input.flashError
    ? `<div class="alert-error">${escapeHtml(input.flashError)}</div>`
    : input.flashMessage
      ? `<div class="alert-success">${escapeHtml(input.flashMessage)}</div>`
      : "";

  const revealSection =
    input.reveal === null || input.reveal.sets.length === 0
      ? `<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>`
      : buildRevealForm(input.reveal);

  const lastRevealScanFolder = input.reveal?.scanRoots[0]?.trim() ?? "";
  const hideRevealInitially =
    lastRevealScanFolder.length > 0 &&
    input.scanFolder.trim() === lastRevealScanFolder;

  const importCollapsed = !input.importSectionExpanded;
  const importToggle = importCollapsed
    ? `<section class="card">
        <p class="muted">Import is hidden after a successful submit. Scan another folder when you need more harness files.</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder…</a>
        </div>
      </section>`
    : "";

  const importSection = importCollapsed
    ? ""
    : `<section class="card">
      <p class="eyebrow">Import</p>
      <h1>Reveal &amp; submit</h1>
      <p class="lede">Pick one folder under your home directory, scan for projects with <code>.cursor</code>, then submit your selection to the local harness. Scanning <code>~</code> can take a while — prefer a project folder or use <strong>Stop</strong>.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${escapeHtml(input.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${escapeHtml(lastRevealScanFolder)}" />
        </label>
        <div class="actions">
          <button class="btn btn-secondary" type="button" id="pickFolder">Choose folder…</button>
          <button class="btn btn-primary" type="button" id="revealStart"${hideRevealInitially ? " hidden" : ""}>Reveal</button>
          <button class="btn btn-secondary" type="button" id="revealStop" hidden>Stop</button>
        </div>
        <div class="reveal-progress" id="revealProgress" hidden>
          <p class="muted">Scanning… folders with <code>.cursor</code> appear below.</p>
          <div class="reveal-live-list" id="revealFolderList"></div>
        </div>
      </div>
    </section>
    ${revealSection}
    <script>${buildLocalHarnessRevealClientScript()}</script>
    <script>${buildLocalHarnessTreePreviewClientScript()}</script>`;

  return `${installedSection}${flash}${importToggle}${importSection}`;
};

const buildRevealForm = (reveal: LocalHarnessRevealResult): string => {
  const groupedSets = new Map<
    string,
    {
      readonly sets: {
        readonly set: (typeof reveal.sets)[number];
        readonly setIndex: number;
      }[];
    }
  >();

  reveal.sets.forEach((set, setIndex) => {
    const groupKey = set.proposedName;
    const existing = groupedSets.get(groupKey) ?? { sets: [] };
    groupedSets.set(groupKey, {
      sets: [...existing.sets, { set, setIndex }],
    });
  });

  const groupBlocks = [...groupedSets.entries()]
    .toSorted(([left], [right]) => left.localeCompare(right))
    .map(([groupName, group], groupIndex) => {
      const setSections = group.sets
        .map(({ set, setIndex }) => {
          const tree = buildLocalHarnessRevealTreeFromItems(
            set.items.map((item) => ({
              ...item,
              relativePath:
                typeof item.relativePath === "string" &&
                item.relativePath.length > 0
                  ? item.relativePath
                  : path
                      .relative(set.sourceRoot, item.sourcePath)
                      .replaceAll("\\", "/"),
            })),
          );
          const treeHtml = buildLocalHarnessRevealTreeHtml(tree, escapeHtml);
          const fileCount = set.items.length;

          return `<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${setIndex}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${setIndex}" value="${escapeHtml(set.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${setIndex}" value="${groupIndex}" />
              <p class="muted mono">${escapeHtml(set.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${fileCount} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${treeHtml}</ul>
              </details>
            </div>`;
        })
        .join("");

      return `<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${groupIndex}" value="${escapeHtml(groupName)}" autocomplete="off" />
          </label>
          ${setSections}
        </section>`;
    })
    .join("");

  return `<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${reveal.sets.length}" />
      ${groupBlocks}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`;
};

export const parseHarnessSubmitFormBody = (
  body: URLSearchParams,
  reveal: LocalHarnessRevealResult,
): readonly LocalHarnessSubmitSet[] => {
  const includedSetIndices = new Set(
    body
      .getAll("includeSet")
      .map((value) => Number.parseInt(String(value), 10))
      .filter((value) => Number.isFinite(value)),
  );
  const setCount = Number.parseInt(body.get("setCount") ?? "0", 10);

  const groupLabels = new Map<number, string>();
  for (const [key, value] of body.entries()) {
    const match = /^groupLabel-(\d+)$/.exec(key);
    if (match === null) {
      continue;
    }
    const groupIndex = Number.parseInt(match[1] ?? "", 10);
    const label = value.trim();
    if (Number.isFinite(groupIndex) && label.length > 0) {
      groupLabels.set(groupIndex, label);
    }
  }

  const sets: LocalHarnessSubmitSet[] = [];

  for (let setIndex = 0; setIndex < setCount; setIndex += 1) {
    const slugFromForm = body.get(`setSlug-${setIndex}`)?.trim() ?? "";
    const groupIndexRaw = body.get(`setGroupIndex-${setIndex}`);
    const groupIndex =
      groupIndexRaw === null ? null : Number.parseInt(groupIndexRaw, 10);
    const nameFromGroup =
      groupIndex !== null && Number.isFinite(groupIndex)
        ? groupLabels.get(groupIndex)
        : undefined;
    const nameFromForm =
      body.get(`setName-${setIndex}`)?.trim() ?? nameFromGroup ?? slugFromForm;
    const revealSet = reveal.sets[setIndex];
    if (revealSet === undefined) {
      continue;
    }

    const slug =
      slugFromForm.length > 0 ? slugFromForm : revealSet.proposedSlug;
    const name =
      nameFromForm.length > 0 ? nameFromForm : revealSet.proposedName;

    const includeSet =
      includedSetIndices.size === 0 || includedSetIndices.has(setIndex);

    const items = revealSet.items.map((item) => ({
      id: item.id,
      kind: item.kind,
      title: item.title,
      sourcePath: item.sourcePath,
      include: includeSet,
    }));

    sets.push({ slug, name, items });
  }

  return sets;
};
