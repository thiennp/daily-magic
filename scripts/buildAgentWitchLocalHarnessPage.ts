import type { LocalHarnessRevealResult } from "./localHarness/revealLocalHarnessCandidates.types";
import type { LocalHarnessSubmitSet } from "./localHarness/submitLocalHarnessSelection";

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

  const setRevealRunning = (running) => {
    if (revealBtn instanceof HTMLButtonElement) {
      revealBtn.disabled = running;
    }
    if (stopBtn instanceof HTMLButtonElement) {
      stopBtn.disabled = !running;
    }
    if (progress instanceof HTMLElement) {
      progress.hidden = !running;
    }
  };

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
      const row = document.createElement("li");
      row.className = "reveal-folder-row";
      row.textContent = data.repoName + " — " + data.repoPath;
      folderList.appendChild(row);
    });
    source.addEventListener("set", (event) => {
      const data = JSON.parse(event.data);
      if (!(folderList instanceof HTMLElement) || folderList.lastElementChild === null) {
        return;
      }
      const badge = document.createElement("span");
      badge.className = "reveal-set-badge";
      badge.textContent = data.itemCount + " item(s)";
      folderList.lastElementChild.appendChild(badge);
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

export const buildAgentWitchLocalHarnessPageBody = (input: {
  readonly scanFolder: string;
  readonly reveal: LocalHarnessRevealResult | null;
  readonly flashMessage?: string | null;
  readonly flashError?: string | null;
}): string => {
  const flash = input.flashError
    ? `<div class="alert-error">${escapeHtml(input.flashError)}</div>`
    : input.flashMessage
      ? `<div class="alert-success">${escapeHtml(input.flashMessage)}</div>`
      : "";

  const revealSection =
    input.reveal === null || input.reveal.sets.length === 0
      ? `<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>`
      : buildRevealForm(input.reveal);

  return `${flash}<section class="card">
      <p class="eyebrow">Local harness</p>
      <h1>Reveal &amp; submit</h1>
      <p class="lede">Pick one folder under your home directory, scan for projects with <code>.cursor</code>, then submit your selection to the local harness.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${escapeHtml(input.scanFolder)}" placeholder="~" autocomplete="off" />
        </label>
        <div class="actions">
          <button class="btn btn-secondary" type="button" id="pickFolder">Choose folder…</button>
          <button class="btn btn-primary" type="button" id="revealStart">Reveal</button>
          <button class="btn btn-secondary" type="button" id="revealStop" disabled>Stop</button>
        </div>
        <div class="reveal-progress" id="revealProgress" hidden>
          <p class="muted">Scanning… folders with <code>.cursor</code> appear below.</p>
          <ul class="reveal-live-list" id="revealFolderList"></ul>
        </div>
      </div>
    </section>
    ${revealSection}
    <script>${buildLocalHarnessRevealClientScript()}</script>`;
};

const buildRevealForm = (reveal: LocalHarnessRevealResult): string => {
  const setBlocks = reveal.sets
    .map((set, setIndex) => {
      const itemRows = set.items
        .map((item, itemIndex) => {
          const fieldId = `item-${setIndex}-${itemIndex}`;
          const includeValue = `${set.proposedSlug}|${item.id}`;
          return `<li class="check-row">
              <label for="${fieldId}">
                <input id="${fieldId}" type="checkbox" name="include" value="${escapeHtml(includeValue)}" checked />
                <code>${escapeHtml(item.kind)}</code>
                ${escapeHtml(item.title)}
                <span class="muted mono">${escapeHtml(item.sourcePath)}</span>
              </label>
            </li>`;
        })
        .join("");

      return `<section class="card harness-set">
          <label class="field">
            <span class="field-label">Set name</span>
            <input class="input" name="setName-${setIndex}" value="${escapeHtml(set.proposedName)}" />
          </label>
          <input type="hidden" name="setSlug-${setIndex}" value="${escapeHtml(set.proposedSlug)}" />
          <p class="muted">Source: <code>${escapeHtml(set.sourceRoot)}</code></p>
          <ul class="check-list">${itemRows}</ul>
        </section>`;
    })
    .join("");

  return `<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${reveal.sets.length}" />
      ${setBlocks}
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit selected to local harness</button>
      </div>
    </form>`;
};

export const parseHarnessSubmitFormBody = (
  body: URLSearchParams,
  reveal: LocalHarnessRevealResult,
): readonly LocalHarnessSubmitSet[] => {
  const includedKeys = new Set(body.getAll("include").map(String));
  const setCount = Number.parseInt(body.get("setCount") ?? "0", 10);

  const sets: LocalHarnessSubmitSet[] = [];

  for (let setIndex = 0; setIndex < setCount; setIndex += 1) {
    const slugFromForm = body.get(`setSlug-${setIndex}`)?.trim() ?? "";
    const nameFromForm =
      body.get(`setName-${setIndex}`)?.trim() ?? slugFromForm;
    const revealSet = reveal.sets[setIndex];
    if (revealSet === undefined) {
      continue;
    }

    const slug =
      slugFromForm.length > 0 ? slugFromForm : revealSet.proposedSlug;
    const name =
      nameFromForm.length > 0 ? nameFromForm : revealSet.proposedName;

    const items = revealSet.items.map((item) => ({
      id: item.id,
      kind: item.kind,
      title: item.title,
      sourcePath: item.sourcePath,
      include: includedKeys.has(`${slug}|${item.id}`),
    }));

    sets.push({ slug, name, items });
  }

  return sets;
};
