import fs from "node:fs";
import path from "node:path";

import redactTextForProjectKnowledge from "../../../projects/internal/core/knowledge/redactTextForProjectKnowledge";
import resolveAgentWitchProjectKnowledgePaths from "../../../projects/internal/core/knowledge/resolveAgentWitchProjectKnowledgePaths";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

export type AgentWitchMemoryEntry = {
  readonly id: string;
  readonly agentRunId?: string;
  readonly prompt: string;
  readonly output: string;
  readonly createdAt: string;
};

const resolveMemoryRunsPath = (
  layout: AgentWitchLocalLayout,
  projectFolderPath: string,
  projectId?: string,
): string | null => {
  const knowledgePaths = resolveAgentWitchProjectKnowledgePaths({
    layout,
    projectFolderPath,
    projectId,
  });

  return knowledgePaths?.memoryRunsFilePath ?? null;
};

export const readAgentWitchMemoryEntries = (
  layout: AgentWitchLocalLayout,
  projectFolderPath: string,
  projectId?: string,
): readonly AgentWitchMemoryEntry[] => {
  const memoryPath = resolveMemoryRunsPath(
    layout,
    projectFolderPath,
    projectId,
  );

  if (memoryPath === null) {
    return [];
  }

  if (!fs.existsSync(memoryPath)) {
    return [];
  }

  const lines = fs.readFileSync(memoryPath, "utf8").split("\n").filter(Boolean);
  const entries: AgentWitchMemoryEntry[] = [];

  for (const line of lines) {
    try {
      entries.push(JSON.parse(line) as AgentWitchMemoryEntry);
    } catch {
      // skip malformed lines
    }
  }

  return entries;
};

export const appendAgentWitchMemoryEntry = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly projectFolderPath: string;
  readonly projectId?: string;
  readonly entry: AgentWitchMemoryEntry;
}): void => {
  const memoryPath = resolveMemoryRunsPath(
    input.layout,
    input.projectFolderPath,
    input.projectId,
  );

  if (memoryPath === null) {
    return;
  }

  const entry = {
    ...input.entry,
    prompt: redactTextForProjectKnowledge(input.entry.prompt),
    output: redactTextForProjectKnowledge(input.entry.output),
  };

  fs.mkdirSync(path.dirname(memoryPath), { recursive: true });
  fs.appendFileSync(memoryPath, `${JSON.stringify(entry)}\n`, "utf8");
};

export const formatMemoryContextForPrompt = (
  entries: readonly AgentWitchMemoryEntry[],
  limit = 5,
): string => {
  if (entries.length === 0) {
    return "";
  }

  const recent = entries.slice(-limit).reverse();
  const body = recent
    .map((entry, index) => {
      const promptPreview =
        entry.prompt.length > 240
          ? `${entry.prompt.slice(0, 240)}…`
          : entry.prompt;
      const outputPreview =
        entry.output.length > 400
          ? `${entry.output.slice(0, 400)}…`
          : entry.output;

      return `[${index + 1}] Prompt: ${promptPreview}\nResult: ${outputPreview}`;
    })
    .join("\n\n");

  return `Recent project memory:\n\n${body}\n\n---\n\n`;
};
