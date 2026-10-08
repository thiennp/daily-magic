import type { KnowledgeWeeklyPoint } from "./summarizeKnowledgeImpact";

const WIDTH = 320;
const HEIGHT = 120;
const PAD = 16;

export const KNOWLEDGE_CHART_EMPTY_HTML =
  '<p class="muted">Not enough runs yet — charts appear after the first runs with notes.</p>';

const escapeAttr = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/** Stacked weekly bars: runs with notes vs holdout runs (inline SVG + table fallback). */
export const buildKnowledgeRunsSplitChartHtml = (
  weekly: readonly KnowledgeWeeklyPoint[],
): string => {
  const max = Math.max(
    0,
    ...weekly.map((week) => week.runsWithKnowledge + week.runsHoldout),
  );
  if (max === 0) {
    return KNOWLEDGE_CHART_EMPTY_HTML;
  }
  const slot = (WIDTH - 2 * PAD) / weekly.length;
  const inner = HEIGHT - 2 * PAD;
  const bars = weekly
    .map((week, index) => {
      const withHeight = (week.runsWithKnowledge / max) * inner;
      const holdoutHeight = (week.runsHoldout / max) * inner;
      const x = (PAD + index * slot + 3).toFixed(1);
      const width = Math.max(4, slot - 6).toFixed(1);
      const label = escapeAttr(week.weekStart);
      return `<rect x="${x}" y="${(HEIGHT - PAD - withHeight).toFixed(1)}" width="${width}" height="${withHeight.toFixed(1)}" fill="#2563eb"><title>${label}: ${week.runsWithKnowledge} with notes</title></rect><rect x="${x}" y="${(HEIGHT - PAD - withHeight - holdoutHeight).toFixed(1)}" width="${width}" height="${holdoutHeight.toFixed(1)}" fill="#9ca3af"><title>${label}: ${week.runsHoldout} holdout</title></rect>`;
    })
    .join("");
  const rows = weekly
    .map(
      (week) =>
        `<tr><td>${escapeAttr(week.weekStart)}</td><td>${week.runsWithKnowledge}</td><td>${week.runsHoldout}</td></tr>`,
    )
    .join("");
  return `<svg viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Runs with notes vs holdout per week" style="width:100%;max-width:420px">
    <line x1="${PAD}" y1="${HEIGHT - PAD}" x2="${WIDTH - PAD}" y2="${HEIGHT - PAD}" stroke="#9ca3af" stroke-width="1"/>${bars}
    <text x="${PAD}" y="10" font-size="10" fill="currentColor">${max}</text>
  </svg>
  <p class="muted"><span style="color:#2563eb">●</span> with notes &nbsp; <span style="color:#9ca3af">●</span> holdout</p>
  <table style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"><caption>Runs with notes vs holdout per week</caption><thead><tr><th>Week</th><th>With notes</th><th>Holdout</th></tr></thead><tbody>${rows}</tbody></table>`;
};
