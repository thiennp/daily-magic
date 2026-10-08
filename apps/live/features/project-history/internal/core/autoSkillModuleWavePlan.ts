const WAVE_PLAN_MARKER = "[[WAVE_PLAN]]";
const PLAN_LINE = /^(W|A)\|([^|\n]+)\|([^|\n]+)\|(\d+)\s*$/i;

/**
 * Step titles of the latest [[WAVE_PLAN]] block in agent output (lines
 * `W|id|title|est` and `A|id|title|est`). Agent lines win; waves are used
 * only when the plan has no agent lines. Empty when there is no plan.
 */
export const parseWavePlanStepTitles = (output: string): string[] => {
  const at = output.lastIndexOf(WAVE_PLAN_MARKER);
  if (at < 0) {
    return [];
  }
  const rows: { kind: string; title: string }[] = [];
  for (const line of output.slice(at + WAVE_PLAN_MARKER.length).split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("[[") && trimmed.includes("]]")) {
      break;
    }
    const m = PLAN_LINE.exec(trimmed);
    if (m !== null && Number(m[4]) > 0) {
      rows.push({
        kind: (m[1] ?? "").toUpperCase(),
        title: (m[3] ?? "").trim(),
      });
    }
  }
  const agents = rows.filter((r) => r.kind === "A");
  return (agents.length > 0 ? agents : rows).map((r) => r.title);
};
