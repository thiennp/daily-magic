import { asRowArray, getSql } from "@/lib/db";
import type { PromptSdlcCallRole } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

export const claimPromptSdlcActiveRun = async (input: {
  readonly cycleId: string;
  readonly ownerUserId: string;
  readonly runId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE prompt_sdlc_cycles
      SET active_run_id = NULL, updated_at = NOW()
      WHERE id = ${input.cycleId}
        AND owner_user_id = ${input.ownerUserId}
        AND active_run_id = ${input.runId}
        AND status IN ('judging', 'improving')
      RETURNING id
    `,
  );

  return rows.length > 0;
};

export const claimPromptSdlcLocalCall = async (input: {
  readonly cycleId: string;
  readonly ownerUserId: string;
  readonly role: PromptSdlcCallRole;
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE prompt_sdlc_cycles
      SET
        pending_local_prompt = NULL,
        pending_local_role = NULL,
        updated_at = NOW()
      WHERE id = ${input.cycleId}
        AND owner_user_id = ${input.ownerUserId}
        AND status = 'awaiting_local'
        AND pending_local_role = ${input.role}
      RETURNING id
    `,
  );

  return rows.length > 0;
};
