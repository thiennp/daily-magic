import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";

const formatProjectCompositionCountsLine = (
  counts: ProjectCompositionCounts,
): string | null => {
  if (counts.harness === 0 && counts.workflow === 0 && counts.agent === 0) {
    return null;
  }

  const playbookLabel = counts.harness === 1 ? "Playbook" : "Playbooks";
  const workflowLabel = counts.workflow === 1 ? "Workflow" : "Workflows";
  const agentLabel = counts.agent === 1 ? "Agent" : "Agents";

  return `${counts.harness} ${playbookLabel} · ${counts.workflow} ${workflowLabel} · ${counts.agent} ${agentLabel}`;
};

export default formatProjectCompositionCountsLine;
