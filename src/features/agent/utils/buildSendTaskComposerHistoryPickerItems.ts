import { buildSendTaskComposerHistoryPickerLabel } from "@/features/agent/utils/buildSendTaskComposerHistoryPickerLabel";
import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import {
  HARNESS_WRITER_AGENTS,
  type HarnessWriterAgent,
} from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const isHarnessWriterAgent = (value: string): value is HarnessWriterAgent =>
  (HARNESS_WRITER_AGENTS as readonly string[]).includes(value);

const DEFAULT_HISTORY_LIMIT = 5;

export const buildSendTaskComposerHistoryPickerItems = (
  runs: readonly AgentRunRecord[],
  limit: number = DEFAULT_HISTORY_LIMIT,
): readonly SendTaskComposerPickerItem[] =>
  runs.slice(0, limit).map((run): SendTaskComposerPickerItem => ({
    kind: "history",
    id: run.id,
    label: buildSendTaskComposerHistoryPickerLabel(run.prompt),
    itemType: "history",
    capabilityId: run.capabilityId,
    deviceId: run.deviceId,
    writerAgent: isHarnessWriterAgent(run.writerAgent) ? run.writerAgent : null,
  }));
