import { parseKnowledgeDailyRow } from "@/lib/knowledge/parseKnowledgeDailyRow";
import {
  parseKnowledgeSharedCards,
  parseShareOffProjectIds,
} from "@/lib/knowledge/parseKnowledgeSharedCards";
import { parseSkillStats } from "@/lib/knowledge/parseSkillStats";
import { readKnowledgeCount } from "@/lib/knowledge/readKnowledgeCount";
import type {
  KnowledgeCapabilitiesReport,
  KnowledgeComputerStatus,
  KnowledgeDailyReport,
  KnowledgeHeartbeatReport,
} from "@/lib/knowledge/knowledgeHeartbeat.type";

const MAX_DAILY_ROWS = 64;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseCapabilities = (
  value: unknown,
): KnowledgeCapabilitiesReport | null => {
  if (!isRecord(value)) {
    return null;
  }
  const cardCount = readKnowledgeCount(value.cardCount);
  if (
    typeof value.enabled !== "boolean" ||
    (value.storage !== "sqlite" && value.storage !== "none") ||
    (value.ollama !== "ready" && value.ollama !== "missing") ||
    typeof value.embedModel !== "string" ||
    cardCount === null
  ) {
    return null;
  }
  return {
    enabled: value.enabled,
    storage: value.storage,
    ollama: value.ollama,
    embedModel: value.embedModel.slice(0, 80),
    cardCount,
  };
};

/** Validate the heartbeat `knowledge` block; null when absent or malformed. */
export const parseKnowledgeHeartbeat = (
  payload: Readonly<Record<string, unknown>> | undefined,
): KnowledgeHeartbeatReport | null => {
  const raw = payload?.knowledge;
  if (!isRecord(raw)) {
    return null;
  }
  const capabilities = parseCapabilities(raw.capabilities);
  if (capabilities === null) {
    return null;
  }
  const daily = Array.isArray(raw.daily)
    ? raw.daily
        .slice(0, MAX_DAILY_ROWS)
        .map(parseKnowledgeDailyRow)
        .filter((row): row is KnowledgeDailyReport => row !== null)
    : [];
  return {
    capabilities,
    daily,
    cards: parseKnowledgeSharedCards(raw.cards),
    shareOffProjectIds: parseShareOffProjectIds(raw.shareOffProjectIds),
    skillStats: parseSkillStats(raw.skillStats),
  };
};

export const resolveKnowledgeComputerStatus = (
  capabilities: KnowledgeCapabilitiesReport | null,
): KnowledgeComputerStatus => {
  if (capabilities === null) {
    return "unknown";
  }
  if (!capabilities.enabled) {
    return "off";
  }
  if (capabilities.storage === "none") {
    return "unavailable";
  }
  return capabilities.ollama === "ready" ? "ready" : "degraded";
};
