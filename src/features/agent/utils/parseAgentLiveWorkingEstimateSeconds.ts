import { AGENT_RUN_WORKING_ESTIMATE_MARKER } from "@/lib/dispatch/agentRunWorkingEstimate.constant";

const ESTIMATE_BLOCK = /\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi;

const collectLatestEstimateSeconds = (
  matches: IterableIterator<RegExpMatchArray>,
  latest: number | null,
): number | null => {
  const next = matches.next();
  if (next.done) {
    return latest;
  }

  const seconds = Number.parseInt(next.value[1] ?? "", 10);
  const nextLatest = Number.isFinite(seconds) && seconds > 0 ? seconds : latest;
  return collectLatestEstimateSeconds(matches, nextLatest);
};

/** Latest positive working-estimate seconds from agent output, or null. */
export const parseAgentLiveWorkingEstimateSeconds = (
  output: string,
): number | null => {
  if (!output.includes(AGENT_RUN_WORKING_ESTIMATE_MARKER)) {
    return null;
  }

  return collectLatestEstimateSeconds(output.matchAll(ESTIMATE_BLOCK), null);
};
