import type { EpisodeCard } from "./episode.types";
import type {
  KnowledgeImpactSummary,
  KnowledgeWeeklyPoint,
} from "./summarizeKnowledgeImpact";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatNumber = (value: number): string =>
  new Intl.NumberFormat("en-US").format(Math.round(value));

const formatPercent = (value: number | null): string =>
  value === null ? "n/a" : `${(value * 100).toFixed(0)}%`;

const CHART_WIDTH = 320;
const CHART_HEIGHT = 120;
const CHART_PAD = 16;

const buildPolyline = (
  values: readonly (number | null)[],
  maxValue: number,
  color: string,
  dashed: boolean,
): string => {
  const step =
    values.length > 1 ? (CHART_WIDTH - 2 * CHART_PAD) / (values.length - 1) : 0;
  const points = values
    .map((value, index) =>
      value === null
        ? null
        : `${(CHART_PAD + index * step).toFixed(1)},${(
            CHART_HEIGHT -
            CHART_PAD -
            (maxValue === 0
              ? 0
              : (value / maxValue) * (CHART_HEIGHT - 2 * CHART_PAD))
          ).toFixed(1)}`,
    )
    .filter((point): point is string => point !== null);
  return points.length === 0
    ? ""
    : `<polyline fill="none" stroke="${color}" stroke-width="2" ${dashed ? 'stroke-dasharray="4 3"' : ""} points="${points.join(" ")}"/>${points
        .map((point) => {
          const [x, y] = point.split(",");
          return `<circle cx="${x}" cy="${y}" r="3" fill="${color}"/>`;
        })
        .join("")}`;
};

const buildRepeatRateChart = (
  weekly: readonly KnowledgeWeeklyPoint[],
): string => {
  const withRate = weekly.map((week) =>
    week.runsWithKnowledge === 0
      ? null
      : week.repeatsWithKnowledge / week.runsWithKnowledge,
  );
  const holdoutRate = weekly.map((week) =>
    week.runsHoldout === 0 ? null : week.repeatsHoldout / week.runsHoldout,
  );
  const maxValue = Math.max(
    0.05,
    ...withRate.map((v) => v ?? 0),
    ...holdoutRate.map((v) => v ?? 0),
  );
  return `<svg viewBox="0 0 ${CHART_WIDTH} ${CHART_HEIGHT}" role="img" aria-label="Repeat-mistake rate per week" style="width:100%;max-width:420px">
    <line x1="${CHART_PAD}" y1="${CHART_HEIGHT - CHART_PAD}" x2="${CHART_WIDTH - CHART_PAD}" y2="${CHART_HEIGHT - CHART_PAD}" stroke="#9ca3af" stroke-width="1"/>
    ${buildPolyline(withRate, maxValue, "#2563eb", false)}
    ${buildPolyline(holdoutRate, maxValue, "#9ca3af", true)}
    <text x="${CHART_PAD}" y="12" font-size="10" fill="currentColor">max ${(maxValue * 100).toFixed(0)}%</text>
  </svg>
  <p class="muted"><span style="color:#2563eb">●</span> with knowledge &nbsp; <span style="color:#9ca3af">●</span> holdout (no knowledge)</p>`;
};

const buildTokenBars = (weekly: readonly KnowledgeWeeklyPoint[]): string => {
  const maxValue = Math.max(1, ...weekly.map((week) => week.avgInjectedTokens));
  const barWidth = Math.max(
    6,
    Math.floor((CHART_WIDTH - 2 * CHART_PAD) / Math.max(1, weekly.length)) - 4,
  );
  return `<svg viewBox="0 0 ${CHART_WIDTH} ${CHART_HEIGHT}" role="img" aria-label="Average injected tokens per run per week" style="width:100%;max-width:420px">
    ${weekly
      .map((week, index) => {
        const height =
          (week.avgInjectedTokens / maxValue) * (CHART_HEIGHT - 2 * CHART_PAD);
        const x = CHART_PAD + index * (barWidth + 4);
        return `<rect x="${x}" y="${CHART_HEIGHT - CHART_PAD - height}" width="${barWidth}" height="${height}" fill="#2563eb"><title>${escapeHtml(week.weekStart)}: ${week.avgInjectedTokens} tokens/run</title></rect>`;
      })
      .join("")}
    <line x1="${CHART_PAD}" y1="${CHART_HEIGHT - CHART_PAD}" x2="${CHART_WIDTH - CHART_PAD}" y2="${CHART_HEIGHT - CHART_PAD}" stroke="#9ca3af" stroke-width="1"/>
  </svg>`;
};

const buildStat = (label: string, value: string, hint: string): string =>
  `<div class="card" title="${escapeHtml(hint)}"><p class="eyebrow">${escapeHtml(label)}</p><h2>${escapeHtml(value)}</h2><p class="muted">${escapeHtml(hint)}</p></div>`;

/** Local "Knowledge impact" panel (server-rendered, inline SVG charts). */
export const buildKnowledgeImpactPanelHtml = (
  summary: KnowledgeImpactSummary,
): string => {
  const stats = [
    buildStat(
      "Mistakes avoided",
      `≈ ${formatNumber(summary.mistakesAvoided)}`,
      "Estimate: an injected mistake card, then a run that passed without repeating it.",
    ),
    buildStat(
      "Tokens injected",
      formatNumber(summary.injectedTokensTotal),
      `Measured. ${formatNumber(summary.injectedTokensAvg)} per run on average.`,
    ),
    buildStat(
      "Est. tokens saved",
      `≈ ${formatNumber(summary.estTokensSaved)}`,
      "Estimate: token cost of the failing runs behind each avoided mistake.",
    ),
    buildStat(
      "Repeat-mistake rate",
      formatPercent(summary.repeatRateWithKnowledge),
      `Holdout (no knowledge): ${formatPercent(summary.repeatRateHoldout)} over ${summary.holdoutRuns} run(s).`,
    ),
  ].join("");

  const avoided =
    summary.topAvoided.length === 0
      ? '<p class="muted">No avoided mistakes yet.</p>'
      : `<ul>${summary.topAvoided
          .map(
            (item) =>
              `<li>${escapeHtml(item.takeaway)} <span class="muted">· ×${item.count}${item.commitShas[0] !== undefined ? ` · commit ${escapeHtml(item.commitShas[0].slice(0, 7))}` : ""}</span></li>`,
          )
          .join("")}</ul>`;

  const review =
    summary.review.length === 0
      ? '<p class="muted">Nothing to review.</p>'
      : `<ul>${summary.review
          .map(
            (item) =>
              `<li><strong>${escapeHtml(item.reason)}</strong> — ${escapeHtml(item.takeaway)}</li>`,
          )
          .join("")}</ul>`;

  return `<section class="card stack">
    <p class="eyebrow">Knowledge impact · last ${summary.windowDays} days</p>
    <div class="grid">${stats}</div>
    <div class="grid">
      <div><h3>Repeat-mistake rate per week</h3>${buildRepeatRateChart(summary.weekly)}</div>
      <div><h3>Avg injected tokens per run</h3>${buildTokenBars(summary.weekly)}</div>
    </div>
    <h3>Top mistakes avoided</h3>${avoided}
    <h3>Needs review</h3>${review}
    <p class="muted">${summary.runs} run(s) · ${summary.cardCount} card(s) (${summary.mistakeCards} mistakes) · check p95 ${summary.checkP95Ms} ms · ${summary.degradedPercent}% degraded (no embeddings)</p>
  </section>`;
};

const KIND_LABEL = {
  mistake: "Mistake",
  fix: "Fix",
  decision: "Decision",
  lesson: "Note",
} as const;

export const buildKnowledgeCardListHtml = (
  cards: readonly EpisodeCard[],
): string =>
  cards.length === 0
    ? '<p class="muted">No knowledge cards yet. They appear after agent runs on this computer.</p>'
    : cards
        .map(
          (card) =>
            `<article class="card"><div class="muted" title="${escapeHtml(card.createdAt)}">${KIND_LABEL[card.kind]} · ${escapeHtml(card.outcome)} · used ${card.hits}× · ${escapeHtml(card.createdAt.slice(0, 10))}${card.commitShas[0] !== undefined ? ` · commit ${escapeHtml(card.commitShas[0].slice(0, 7))}` : ""}</div><p>${escapeHtml(card.takeaway)}</p>${card.files.length > 0 ? `<p class="muted">${escapeHtml(card.files.slice(0, 4).join(", "))}</p>` : ""}</article>`,
        )
        .join("");
