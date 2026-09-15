import type { LocalHarnessRevealResult } from "./localHarness/revealLocalHarnessCandidates";
import type { LocalHarnessSubmitSet } from "./localHarness/submitLocalHarnessSelection";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildLocalHarnessScanRootsFieldValue = (
  scanRoots: readonly string[],
): string => scanRoots.join("\n");

export const buildAgentWitchLocalHarnessPageBody = (input: {
  readonly scanRoots: readonly string[];
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
      ? `<p class="empty">No harness candidates yet. Run reveal to scan local folders for <code>.cursor</code> rules, commands, skills, and agents.</p>`
      : buildRevealForm(input.reveal);

  return `${flash}<section class="card">
      <p class="eyebrow">Local harness</p>
      <h1>Reveal &amp; submit</h1>
      <p class="lede">Scan local project folders, choose items, and write them into your Agent Witch harness (local submit only).</p>
      <form class="stack" method="POST" action="/harness/reveal">
        <label class="field">
          <span class="field-label">Scan roots (one path per line, under your home folder)</span>
          <textarea class="input textarea" name="scanRoots" rows="4">${escapeHtml(buildLocalHarnessScanRootsFieldValue(input.scanRoots))}</textarea>
        </label>
        <button class="btn btn-primary" type="submit">Reveal</button>
      </form>
    </section>
    ${revealSection}`;
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

export const parseHarnessRevealScanRoots = (raw: string): readonly string[] =>
  raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
