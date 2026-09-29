import { asRowArray, getSql } from "@/lib/db";
import { isPromptSdlcCycleStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";
import type PromptSdlcCycleSummary from "@/lib/promptOptimizer/types/PromptSdlcCycleSummary.type";

const readSummary = (
  row: Record<string, unknown>,
): PromptSdlcCycleSummary | null => {
  const status = String(row.status);
  if (typeof row.id !== "string" || !isPromptSdlcCycleStatus(status)) {
    return null;
  }

  return {
    id: row.id,
    goal: String(row.goal),
    status,
    currentRound: Number(row.current_round),
    createdAt: String(row.created_at),
  };
};

export const listPromptSdlcCycleSummaries = async (
  ownerUserId: string,
): Promise<readonly PromptSdlcCycleSummary[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id, goal, status, current_round, created_at
      FROM prompt_sdlc_cycles
      WHERE owner_user_id = ${ownerUserId}
      ORDER BY created_at DESC
      LIMIT 50
    `,
  );

  return rows.flatMap((row) => {
    const summary = readSummary(row);
    return summary === null ? [] : [summary];
  });
};
