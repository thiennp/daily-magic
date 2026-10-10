import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectBotKnowledgeSchema } from "@/lib/knowledge/bots/ensureProjectBotKnowledgeSchema";
import {
  recordSkillUsesOnClaim,
  recordSkillUsesOnRelease,
} from "@/lib/knowledge/skillUses/recordSkillUses";
import { fingerprintFailureReason } from "@/lib/knowledge/bots/fingerprintFailureReason";

/** A skill lookup this recent counts as "looked the library up first". */
const LOOKUP_WINDOW_MINUTES = 20;
const REPEAT_WINDOW_DAYS = 30;

export const botKnowledgeEventId = (taskId: string, fence: number): string =>
  `${taskId}:${fence}`;

/** An assistant claimed a task: one run, with or without a prior skill lookup. Never throws. */
export const recordBotClaim = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly fence: number;
  readonly membershipId: string;
  readonly actorUserId: string;
  readonly skillId: string | null;
  readonly effortTier: string;
}): Promise<void> => {
  try {
    await ensureProjectBotKnowledgeSchema();
    const sql = getSql();
    await sql`
      INSERT INTO project_bot_knowledge_events (
        id, project_id, task_id, membership_id, had_lookup, skill_id, effort_tier
      ) VALUES (
        ${botKnowledgeEventId(input.taskId, input.fence)}, ${input.projectId},
        ${input.taskId}, ${input.membershipId},
        EXISTS (
          SELECT 1 FROM project_skill_lookup_log
          WHERE project_id = ${input.projectId}
            AND actor_user_id = ${input.actorUserId}
            AND returned > 0
            AND created_at > NOW() - make_interval(mins => ${LOOKUP_WINDOW_MINUTES})
        ),
        ${input.skillId}, ${input.effortTier}
      )
      ON CONFLICT (id) DO NOTHING`;
    await recordSkillUsesOnClaim({
      projectId: input.projectId,
      taskId: input.taskId,
      fence: input.fence,
      actorUserId: input.actorUserId,
      assignedSkillId: input.skillId,
    });
  } catch (error: unknown) {
    console.error("bot knowledge claim record failed", {
      error: error instanceof Error ? error.message : "record_failed",
    });
  }
};

/** The claim ended: store the outcome, and whether this mistake was seen before. Never throws. */
export const recordBotRelease = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly fence: number;
  readonly outcome: "done" | "failed" | "blocked" | "released";
  readonly verifySignal: string | null;
  readonly reason: string | null;
}): Promise<void> => {
  try {
    await ensureProjectBotKnowledgeSchema();
    const sql = getSql();
    const failed = input.outcome === "failed" || input.outcome === "blocked";
    const fingerprint =
      failed && input.reason !== null
        ? fingerprintFailureReason(input.reason)
        : null;
    const repeated =
      fingerprint === null
        ? false
        : asRowArray(
            await sql`
              SELECT 1 FROM project_bot_knowledge_events
              WHERE project_id = ${input.projectId} AND fingerprint = ${fingerprint}
                AND task_id <> ${input.taskId}
                AND claimed_at > NOW() - make_interval(days => ${REPEAT_WINDOW_DAYS})
              LIMIT 1`,
          ).length > 0;
    await sql`
      UPDATE project_bot_knowledge_events SET
        outcome = ${input.outcome}, verify_signal = ${input.verifySignal},
        fingerprint = ${fingerprint}, repeated_mistake = ${repeated},
        released_at = NOW()
      WHERE id = ${botKnowledgeEventId(input.taskId, input.fence)}`;
    await recordSkillUsesOnRelease({
      projectId: input.projectId,
      taskId: input.taskId,
      fence: input.fence,
      outcome: input.outcome,
      fingerprint,
    });
  } catch (error: unknown) {
    console.error("bot knowledge release record failed", {
      error: error instanceof Error ? error.message : "record_failed",
    });
  }
};
