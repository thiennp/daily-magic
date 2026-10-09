import {
  deriveProjectSkillIdFromName,
  getProjectSkill,
  listProjectSkills,
} from "@/features/project-skill-share/public-api/infrastructure";

const frontMatterValue = (markdown: string, key: string): string | null =>
  new RegExp(`^${key}:[ \\t]*(\\S.*)$`, "m").exec(markdown)?.[1]?.trim() ??
  null;

const sourcePath = (markdown: string): string | null =>
  frontMatterValue(markdown, "source")?.split("@")[0] ?? null;

/**
 * A question from a changed project doc names the skill it updates
 * (`updates: <skillId>`). Trust it only when that skill really came from the
 * same doc (`origin: folder-doc` and the same `source:` path); anything else
 * falls back to a new skill.
 */
export const resolveDocUpdateSkillId = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly draftBody: string;
}): Promise<string | null> => {
  const target = frontMatterValue(input.draftBody, "updates");
  const path = sourcePath(input.draftBody);
  if (target === null || path === null) {
    return null;
  }
  const existing = await getProjectSkill({
    actorUserId: input.actorUserId,
    args: { projectId: input.projectId, skillId: target },
  });
  if (!existing.ok) {
    return null;
  }
  const body = existing.skill.body;
  return frontMatterValue(body, "origin") === "folder-doc" &&
    sourcePath(body) === path
    ? target
    : null;
};

/** Skill id for an accepted question: the skill it updates, else its name, else name-xxxx when taken. */
export const pickAutoSkillId = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly name: string;
  readonly suggestionId: string;
  readonly draftBody: string;
}): Promise<string> => {
  const updated = await resolveDocUpdateSkillId(input);
  if (updated !== null) {
    return updated;
  }
  const base =
    deriveProjectSkillIdFromName(input.name) ??
    `auto-${input.suggestionId.slice(0, 8)}`;
  const listed = await listProjectSkills({
    actorUserId: input.actorUserId,
    args: { projectId: input.projectId },
  });
  const taken = listed.ok && listed.skills.some((s) => s.skillId === base);
  return taken ? `${base}-${input.suggestionId.slice(0, 4)}` : base;
};
