import { stripAgentRunProgressFromOutput } from "@/features/agent/utils/stripAgentRunProgressFromOutput";
import {
  parseAgentRunArtifacts,
  stripAgentRunArtifactsFromOutput,
} from "@/lib/dispatch/parseAgentRunArtifacts";
import type { AgentRunArtifactBlock } from "@/lib/dispatch/agentRunArtifact.constant";
import {
  parseAgentRunPartialOutputSections,
  type AgentRunPartialOutputSection,
} from "@/features/dispatch/utils/parseAgentRunPartialOutputSections";

export type AgentRunSemanticOutput = {
  readonly artifacts: readonly AgentRunArtifactBlock[];
  readonly sections: readonly AgentRunPartialOutputSection[];
  readonly plainText: string;
};

export const formatAgentRunSemanticOutput = (
  output: string,
): AgentRunSemanticOutput => {
  const artifacts = parseAgentRunArtifacts(output);
  const withoutArtifacts = stripAgentRunArtifactsFromOutput(output);
  const withoutProgress = stripAgentRunProgressFromOutput(withoutArtifacts);
  const sections = parseAgentRunPartialOutputSections(withoutProgress);

  return {
    artifacts,
    sections,
    plainText: withoutProgress.trim(),
  };
};

export const hasAgentRunSemanticOutput = (
  formatted: AgentRunSemanticOutput,
): boolean => formatted.artifacts.length > 0 || formatted.sections.length > 0;
