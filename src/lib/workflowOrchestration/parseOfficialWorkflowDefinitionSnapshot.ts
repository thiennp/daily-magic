import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import type { OfficialWorkflowNode } from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const parseSkipPhrases = (value: unknown): readonly string[] =>
  Array.isArray(value)
    ? value.filter(
        (phrase): phrase is string =>
          typeof phrase === "string" && phrase.trim().length > 0,
      )
    : [];

export const parseOfficialWorkflowDefinitionSnapshot = (
  snapshot: Record<string, unknown>,
): OfficialWorkflowDefinition | null => {
  const templateId =
    typeof snapshot.templateId === "string" ? snapshot.templateId : "";
  const capabilityName =
    typeof snapshot.capabilityName === "string" ? snapshot.capabilityName : "";
  const version =
    typeof snapshot.version === "number" &&
    Number.isInteger(snapshot.version) &&
    snapshot.version >= 1
      ? snapshot.version
      : null;
  const nodesRaw = snapshot.nodes;

  if (
    templateId.length === 0 ||
    capabilityName.length === 0 ||
    version === null ||
    !Array.isArray(nodesRaw)
  ) {
    return null;
  }

  const nodes: OfficialWorkflowNode[] = [];
  for (const node of nodesRaw) {
    if (typeof node !== "object" || node === null) {
      return null;
    }
    const record = node as Record<string, unknown>;
    const id = typeof record.id === "string" ? record.id : "";
    const kind =
      record.kind === "human" || record.kind === "agent" ? record.kind : null;
    const title = typeof record.title === "string" ? record.title : "";
    if (id.length === 0 || kind === null || title.length === 0) {
      return null;
    }
    if (kind === "human") {
      const instructions =
        typeof record.instructions === "string" ? record.instructions : "";
      if (instructions.length === 0) {
        return null;
      }
      nodes.push({
        id,
        kind,
        title,
        instructions,
        ...(record.allowSkip === true ? { allowSkip: true } : {}),
      });
    } else {
      const promptSection =
        typeof record.promptSection === "string" ? record.promptSection : "";
      if (promptSection.length === 0) {
        return null;
      }
      const skipWhenPriorResponseMatches = parseSkipPhrases(
        record.skipWhenPriorResponseMatches,
      );
      nodes.push({
        id,
        kind,
        title,
        promptSection,
        ...(skipWhenPriorResponseMatches.length > 0
          ? { skipWhenPriorResponseMatches }
          : {}),
      });
    }
  }

  if (nodes.length === 0) {
    return null;
  }

  return { templateId, version, capabilityName, nodes };
};

export default parseOfficialWorkflowDefinitionSnapshot;
