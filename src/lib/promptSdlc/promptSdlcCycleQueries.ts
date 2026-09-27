import { randomUUID } from "node:crypto";

import { asRowArray, getSql } from "@/lib/db";
import { mapPromptSdlcCycleRow } from "@/lib/promptSdlc/mapPromptSdlcRows";
import {
  PROMPT_SDLC_MAX_ROUNDS,
  PROMPT_SDLC_PASS_SCORE,
} from "@/lib/promptSdlc/promptSdlcLimits.constant";
import { promptSdlcChoiceModelName } from "@/lib/promptSdlc/promptSdlcModelChoice";
import type { PromptSdlcCycleStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
import type PromptSdlcCycleRecord from "@/lib/promptSdlc/types/PromptSdlcCycleRecord.type";
import type { PromptSdlcCallRole } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";
import type { PromptSdlcModelChoice } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

export const insertPromptSdlcCycle = async (input: {
  readonly ownerUserId: string;
  readonly deviceId: string | null;
  readonly goal: string;
  readonly sourcePrompt: string;
  readonly judge: PromptSdlcModelChoice;
  readonly improver: PromptSdlcModelChoice;
}): Promise<PromptSdlcCycleRecord> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO prompt_sdlc_cycles (
        id,
        owner_user_id,
        device_id,
        goal,
        source_prompt,
        judge_kind,
        judge_model,
        improver_kind,
        improver_model,
        pass_score,
        max_rounds,
        status,
        current_round
      )
      VALUES (
        ${randomUUID()},
        ${input.ownerUserId},
        ${input.deviceId},
        ${input.goal.trim()},
        ${input.sourcePrompt.trim()},
        ${input.judge.kind},
        ${promptSdlcChoiceModelName(input.judge)},
        ${input.improver.kind},
        ${promptSdlcChoiceModelName(input.improver)},
        ${PROMPT_SDLC_PASS_SCORE},
        ${PROMPT_SDLC_MAX_ROUNDS},
        ${"judging"},
        ${0}
      )
      RETURNING *
    `,
  );

  return mapPromptSdlcCycleRow(rows[0]);
};

export const getPromptSdlcCycleForOwner = async (
  cycleId: string,
  ownerUserId: string,
): Promise<PromptSdlcCycleRecord | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM prompt_sdlc_cycles
      WHERE id = ${cycleId}
        AND owner_user_id = ${ownerUserId}
    `,
  );

  const row = rows[0];
  return row === undefined ? null : mapPromptSdlcCycleRow(row);
};

export const savePromptSdlcCycleProgress = async (input: {
  readonly cycleId: string;
  readonly ownerUserId: string;
  readonly status: PromptSdlcCycleStatus;
  readonly activeRunId: string | null;
  readonly pendingLocalPrompt: string | null;
  readonly pendingLocalRole: PromptSdlcCallRole | null;
  readonly currentRound: number;
  readonly errorMessage: string | null;
}): Promise<PromptSdlcCycleRecord | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE prompt_sdlc_cycles
      SET
        status = ${input.status},
        active_run_id = ${input.activeRunId},
        pending_local_prompt = ${input.pendingLocalPrompt},
        pending_local_role = ${input.pendingLocalRole},
        current_round = ${input.currentRound},
        error_message = ${input.errorMessage},
        updated_at = NOW()
      WHERE id = ${input.cycleId}
        AND owner_user_id = ${input.ownerUserId}
      RETURNING *
    `,
  );

  const row = rows[0];
  return row === undefined ? null : mapPromptSdlcCycleRow(row);
};
