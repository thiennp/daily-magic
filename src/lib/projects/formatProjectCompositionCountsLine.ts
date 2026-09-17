import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";

const formatProjectCompositionCountsLine = (
  counts: ProjectCompositionCounts,
): string => {
  const harnessLabel = counts.harness === 1 ? "Harness" : "Harness";
  const workflowLabel = counts.workflow === 1 ? "Workflow" : "Workflows";
  const agentLabel = counts.agent === 1 ? "Agent" : "Agents";

  return `${counts.harness} ${harnessLabel} · ${counts.workflow} ${workflowLabel} · ${counts.agent} ${agentLabel}`;
};

export default formatProjectCompositionCountsLine;
