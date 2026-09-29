import { randomUUID } from "node:crypto";

import { asRowArray, getSql } from "@/lib/db";
import {
  mapPromptSdlcJudgementRow,
  mapPromptSdlcRevisionRow,
} from "@/lib/promptOptimizer/mapPromptSdlcRows";
import type { PromptSdlcVerdict } from "@/lib/promptOptimizer/parsePromptJudgementVerdict";
import type PromptSdlcJudgementRecord from "@/lib/promptOptimizer/types/PromptSdlcJudgementRecord.type";
import type PromptSdlcRevisionRecord from "@/lib/promptOptimizer/types/PromptSdlcRevisionRecord.type";

export const insertPromptSdlcRevision = async (input: {
  readonly cycleId: string;
  readonly roundNumber: number;
  readonly promptText: string;
}): Promise<PromptSdlcRevisionRecord> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO prompt_sdlc_revisions (
        id,
        cycle_id,
        round_number,
        prompt_text
      )
      VALUES (
        ${randomUUID()},
        ${input.cycleId},
        ${input.roundNumber},
        ${input.promptText}
      )
      RETURNING *
    `,
  );

  return mapPromptSdlcRevisionRow(rows[0]);
};

export const listPromptSdlcRevisions = async (
  cycleId: string,
): Promise<readonly PromptSdlcRevisionRecord[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM prompt_sdlc_revisions
      WHERE cycle_id = ${cycleId}
      ORDER BY round_number ASC
    `,
  );

  return rows.map(mapPromptSdlcRevisionRow);
};

export const insertPromptSdlcJudgement = async (input: {
  readonly cycleId: string;
  readonly revisionId: string;
  readonly judgeKind: "writer" | "ollama";
  readonly judgeModel: string;
  readonly verdict: PromptSdlcVerdict | null;
  readonly rawReply: string;
}): Promise<PromptSdlcJudgementRecord> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO prompt_sdlc_judgements (
        id,
        cycle_id,
        revision_id,
        judge_kind,
        judge_model,
        score,
        passed,
        reasons,
        raw_reply
      )
      VALUES (
        ${randomUUID()},
        ${input.cycleId},
        ${input.revisionId},
        ${input.judgeKind},
        ${input.judgeModel},
        ${input.verdict?.score ?? null},
        ${input.verdict?.passed ?? null},
        ${input.verdict?.reasons ?? null},
        ${input.rawReply}
      )
      RETURNING *
    `,
  );

  return mapPromptSdlcJudgementRow(rows[0]);
};

export const listPromptSdlcJudgements = async (
  cycleId: string,
): Promise<readonly PromptSdlcJudgementRecord[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM prompt_sdlc_judgements
      WHERE cycle_id = ${cycleId}
      ORDER BY created_at ASC
    `,
  );

  return rows.map(mapPromptSdlcJudgementRow);
};
