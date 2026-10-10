import { asRowArray, getSql } from "@/lib/db";
import { queueCheckForSkillVersion } from "@/lib/knowledge/skillUses/queueSkillCheckForVersion";
import { notifySkillCheckDue } from "@/lib/knowledge/skillUses/notifySkillCheckDue";
import { ensureProjectSkillChecksSchema } from "@/lib/knowledge/skillUses/ensureProjectSkillChecksSchema";

/**
 * A run ended: for every skill version it used, queue a 'due' check when that
 * version just reached a checkpoint (or failed early). Never throws.
 */
export const queueSkillChecksForRun = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly fence: number;
}): Promise<void> => {
  try {
    await ensureProjectSkillChecksSchema();
    const sql = getSql();
    const queuedFlags: boolean[] = [];
    const used = asRowArray(
      await sql`
        SELECT skill_id, skill_version FROM project_skill_uses
        WHERE project_id = ${input.projectId} AND task_id = ${input.taskId}
          AND fence = ${input.fence}`,
    );
    for (const row of used) {
      const skillId = String(row.skill_id);
      const version = Number(row.skill_version);
      queuedFlags.push(
        await queueCheckForSkillVersion({
          projectId: input.projectId,
          skillId,
          version,
        }),
      );
    }
    if (queuedFlags.some(Boolean)) await notifySkillCheckDue(input.projectId);
  } catch (error: unknown) {
    console.error("skill check queue failed", {
      error: error instanceof Error ? error.message : "queue_failed",
    });
  }
};
