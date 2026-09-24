import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import redactTextForProjectKnowledge from "../../../projects/internal/core/knowledge/redactTextForProjectKnowledge";
import {
  AGENT_WITCH_ERROR_TOOL_SUGGESTION_THRESHOLD,
  AGENT_WITCH_RAG_TOOL_SUGGESTION_RETRIEVAL_THRESHOLD,
} from "../../../projects/internal/core/knowledge/agentWitchProfileKnowledge.constants";
import resolveAgentWitchKnowledgeTelemetryPaths from "../../../projects/internal/core/knowledge/resolveAgentWitchKnowledgeTelemetryPaths";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

type AgentWitchKnowledgeUsageStats = {
  readonly schemaVersion: 1;
  readonly chunkRetrievalCounts: Record<string, number>;
  readonly errorOccurrences: Record<
    string,
    {
      readonly count: number;
      readonly lastSeenAt: string;
      readonly preview: string;
    }
  >;
  readonly linkedToolByChunkId: Record<string, string>;
};

export type AgentWitchKnowledgeSuggestion = {
  readonly kind:
    | "frequent_rag_without_tool"
    | "recurring_error_tool"
    | "recurring_error_rule";
  readonly priority: 1 | 2;
  readonly message: string;
  readonly hitCount: number;
  readonly chunkId?: string;
  readonly errorFingerprint?: string;
};

const emptyUsageStats = (): AgentWitchKnowledgeUsageStats => ({
  schemaVersion: 1,
  chunkRetrievalCounts: {},
  errorOccurrences: {},
  linkedToolByChunkId: {},
});

const readUsageStatsFile = (
  usageStatsFilePath: string,
): AgentWitchKnowledgeUsageStats => {
  if (!fs.existsSync(usageStatsFilePath)) {
    return emptyUsageStats();
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(usageStatsFilePath, "utf8"),
    );
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      (parsed as AgentWitchKnowledgeUsageStats).schemaVersion === 1
    ) {
      const record = parsed as AgentWitchKnowledgeUsageStats;
      return {
        schemaVersion: 1,
        chunkRetrievalCounts: record.chunkRetrievalCounts ?? {},
        errorOccurrences: record.errorOccurrences ?? {},
        linkedToolByChunkId: record.linkedToolByChunkId ?? {},
      };
    }
  } catch {
    // fall through
  }

  return emptyUsageStats();
};

const writeUsageStatsFile = (
  usageStatsFilePath: string,
  stats: AgentWitchKnowledgeUsageStats,
): void => {
  fs.mkdirSync(path.dirname(usageStatsFilePath), { recursive: true });
  fs.writeFileSync(usageStatsFilePath, `${JSON.stringify(stats)}\n`, "utf8");
};

export const fingerprintAgentWitchErrorText = (text: string): string => {
  const redacted = redactTextForProjectKnowledge(text).trim();
  const line = redacted.split("\n")[0]?.trim() ?? redacted;
  const sample = line.slice(0, 500);
  return createHash("sha256").update(sample).digest("hex").slice(0, 16);
};

export const readAgentWitchKnowledgeUsageStats = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
}): AgentWitchKnowledgeUsageStats | null => {
  const telemetryPaths = resolveAgentWitchKnowledgeTelemetryPaths(input);
  if (telemetryPaths === null) {
    return null;
  }

  return readUsageStatsFile(telemetryPaths.usageStatsFilePath);
};

export const recordAgentWitchChunkRetrievals = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly chunkIds: readonly string[];
  readonly projectFolderPath?: string;
  readonly projectId?: string;
}): void => {
  if (input.chunkIds.length === 0) {
    return;
  }

  const telemetryPaths = resolveAgentWitchKnowledgeTelemetryPaths(input);
  if (telemetryPaths === null) {
    return;
  }

  const stats = readUsageStatsFile(telemetryPaths.usageStatsFilePath);
  const nextCounts = { ...stats.chunkRetrievalCounts };

  for (const chunkId of input.chunkIds) {
    nextCounts[chunkId] = (nextCounts[chunkId] ?? 0) + 1;
  }

  writeUsageStatsFile(telemetryPaths.usageStatsFilePath, {
    ...stats,
    chunkRetrievalCounts: nextCounts,
  });
};

export const recordAgentWitchErrorOccurrence = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly errorText: string;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
}): string | null => {
  const trimmed = input.errorText.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const telemetryPaths = resolveAgentWitchKnowledgeTelemetryPaths(input);
  if (telemetryPaths === null) {
    return null;
  }

  const fingerprint = fingerprintAgentWitchErrorText(trimmed);
  const stats = readUsageStatsFile(telemetryPaths.usageStatsFilePath);
  const prior = stats.errorOccurrences[fingerprint];
  const preview =
    trimmed.split("\n")[0]?.trim().slice(0, 200) ?? trimmed.slice(0, 200);

  writeUsageStatsFile(telemetryPaths.usageStatsFilePath, {
    ...stats,
    errorOccurrences: {
      ...stats.errorOccurrences,
      [fingerprint]: {
        count: (prior?.count ?? 0) + 1,
        lastSeenAt: new Date().toISOString(),
        preview,
      },
    },
  });

  return fingerprint;
};

export const getAgentWitchChunkRetrievalCount = (
  stats: AgentWitchKnowledgeUsageStats | null,
  chunkId: string,
): number => {
  if (stats === null) {
    return 0;
  }

  return stats.chunkRetrievalCounts[chunkId] ?? 0;
};

export const computeAgentWitchKnowledgeSuggestions = (
  stats: AgentWitchKnowledgeUsageStats | null,
): readonly AgentWitchKnowledgeSuggestion[] => {
  if (stats === null) {
    return [];
  }

  const suggestions: AgentWitchKnowledgeSuggestion[] = [];

  for (const [chunkId, hitCount] of Object.entries(
    stats.chunkRetrievalCounts,
  )) {
    if (hitCount < AGENT_WITCH_RAG_TOOL_SUGGESTION_RETRIEVAL_THRESHOLD) {
      continue;
    }

    if (stats.linkedToolByChunkId[chunkId] !== undefined) {
      continue;
    }

    suggestions.push({
      kind: "frequent_rag_without_tool",
      priority: 1,
      hitCount,
      chunkId,
      message: `Knowledge chunk "${chunkId}" was injected ${hitCount} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`,
    });
  }

  for (const [fingerprint, entry] of Object.entries(stats.errorOccurrences)) {
    if (entry.count < AGENT_WITCH_ERROR_TOOL_SUGGESTION_THRESHOLD) {
      continue;
    }

    suggestions.push({
      kind: "recurring_error_tool",
      priority: 1,
      hitCount: entry.count,
      errorFingerprint: fingerprint,
      message: `Error "${entry.preview}" occurred ${entry.count} times. First priority: add a tool or capability step that prevents it.`,
    });

    suggestions.push({
      kind: "recurring_error_rule",
      priority: 2,
      hitCount: entry.count,
      errorFingerprint: fingerprint,
      message: `Same error (${entry.count}×): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`,
    });
  }

  return suggestions.sort(
    (left, right) =>
      left.priority - right.priority || right.hitCount - left.hitCount,
  );
};
