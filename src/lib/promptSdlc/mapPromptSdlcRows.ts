import {
  isPromptSdlcCycleStatus,
  type PromptSdlcCycleStatus,
} from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
import { isPromptSdlcCallRole } from "@/lib/promptSdlc/promptSdlcModelChoice";
import type PromptSdlcCycleRecord from "@/lib/promptSdlc/types/PromptSdlcCycleRecord.type";
import type PromptSdlcJudgementRecord from "@/lib/promptSdlc/types/PromptSdlcJudgementRecord.type";
import type PromptSdlcRevisionRecord from "@/lib/promptSdlc/types/PromptSdlcRevisionRecord.type";

const readNullableString = (value: unknown): string | null =>
  value === null || value === undefined ? null : String(value);

const readKind = (value: unknown): "writer" | "ollama" => {
  const kind = String(value);
  if (kind === "writer" || kind === "ollama") {
    return kind;
  }

  throw new Error("Unknown prompt optimizer model kind.");
};

const readStatus = (value: unknown): PromptSdlcCycleStatus => {
  const status = String(value);
  if (isPromptSdlcCycleStatus(status)) {
    return status;
  }

  throw new Error("Unknown prompt optimizer cycle status.");
};

export const mapPromptSdlcCycleRow = (
  row: Record<string, unknown>,
): PromptSdlcCycleRecord => ({
  id: String(row.id),
  ownerUserId: String(row.owner_user_id),
  deviceId: readNullableString(row.device_id),
  goal: String(row.goal),
  sourcePrompt: String(row.source_prompt),
  judgeKind: readKind(row.judge_kind),
  judgeModel: String(row.judge_model),
  improverKind: readKind(row.improver_kind),
  improverModel: String(row.improver_model),
  passScore: Number(row.pass_score),
  maxRounds: Number(row.max_rounds),
  status: readStatus(row.status),
  activeRunId: readNullableString(row.active_run_id),
  pendingLocalPrompt: readNullableString(row.pending_local_prompt),
  pendingLocalRole: (() => {
    const role = readNullableString(row.pending_local_role);
    if (role === null) {
      return null;
    }
    if (!isPromptSdlcCallRole(role)) {
      throw new Error("Unknown prompt optimizer call role.");
    }
    return role;
  })(),
  currentRound: Number(row.current_round),
  errorMessage: readNullableString(row.error_message),
  createdAt: String(row.created_at),
  updatedAt: String(row.updated_at),
});

export const mapPromptSdlcRevisionRow = (
  row: Record<string, unknown>,
): PromptSdlcRevisionRecord => ({
  id: String(row.id),
  cycleId: String(row.cycle_id),
  roundNumber: Number(row.round_number),
  promptText: String(row.prompt_text),
  createdAt: String(row.created_at),
});

const readNullableBoolean = (value: unknown): boolean | null => {
  if (value === null || value === undefined) {
    return null;
  }
  return Boolean(value);
};

const readNullableScore = (value: unknown): number | null =>
  value === null || value === undefined ? null : Number(value);

export const mapPromptSdlcJudgementRow = (
  row: Record<string, unknown>,
): PromptSdlcJudgementRecord => ({
  id: String(row.id),
  cycleId: String(row.cycle_id),
  revisionId: String(row.revision_id),
  judgeKind: readKind(row.judge_kind),
  judgeModel: String(row.judge_model),
  score: readNullableScore(row.score),
  passed: readNullableBoolean(row.passed),
  reasons: readNullableString(row.reasons),
  rawReply: String(row.raw_reply),
  createdAt: String(row.created_at),
});
