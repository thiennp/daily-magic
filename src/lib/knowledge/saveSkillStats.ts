import { getSql } from "@/lib/db";
import type { SkillStatsReport } from "@/lib/knowledge/knowledgeHeartbeat.type";

/** Replace this computer's snapshot of one project's skill savings and misses. */
export const saveSkillStats = async (
  deviceId: string,
  stats: SkillStatsReport,
): Promise<void> => {
  await getSql()`
    INSERT INTO project_skill_stats (project_id, device_id, skills, weekly, updated_at)
    VALUES (${stats.projectId}, ${deviceId}, ${JSON.stringify(stats.skills)}::jsonb,
      ${JSON.stringify(stats.weekly)}::jsonb, NOW())
    ON CONFLICT (project_id, device_id) DO UPDATE SET
      skills = EXCLUDED.skills, weekly = EXCLUDED.weekly, updated_at = NOW()
  `;
};
