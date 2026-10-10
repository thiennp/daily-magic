import { filterProjectSkillsByQuery } from "@/features/project-skill-share/internal/core/filterProjectSkillsByQuery";
import { loadVisibleProjectSkillRecords } from "@/features/project-skill-share/internal/infrastructure/orchestrators/loadVisibleProjectSkillRecords";

/**
 * Best published skill for a short task title, or null when nothing clears the
 * same match bar as list_project_skills (so a vague title never reuses a skill).
 */
export const matchProjectSkillForTask = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly text: string;
}): Promise<{ readonly skillId: string; readonly name: string } | null> => {
  const loaded = await loadVisibleProjectSkillRecords({
    actorUserId: input.actorUserId,
    args: { projectId: input.projectId, kind: "skill" },
  });
  if (!loaded.ok) {
    return null;
  }
  const published = loaded.records.filter((r) => r.state === "published");
  const top = filterProjectSkillsByQuery(published, input.text)[0];
  return top === undefined ? null : { skillId: top.skillId, name: top.name };
};
