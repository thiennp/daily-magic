import { asRowArray, getSql } from "@/lib/db";
import type {
  SkillSavingsReport,
  SkillWeeklyReport,
} from "@/lib/knowledge/knowledgeHeartbeat.type";

/** Latest per-computer skill stats snapshots of a project. */
export const loadSkillStats = async (
  projectId: string,
): Promise<
  {
    readonly skills: readonly SkillSavingsReport[];
    readonly weekly: readonly SkillWeeklyReport[];
  }[]
> =>
  asRowArray(
    await getSql()`
      SELECT skills, weekly FROM project_skill_stats
      WHERE project_id = ${projectId}`,
  ).map((row) => ({
    skills: Array.isArray(row.skills)
      ? (row.skills as SkillSavingsReport[])
      : [],
    weekly: Array.isArray(row.weekly)
      ? (row.weekly as SkillWeeklyReport[])
      : [],
  }));
