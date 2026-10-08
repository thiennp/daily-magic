import { indexSkill } from "./indexSkill";
import type { SkillEmbedder, SkillIndexDb } from "./skillIndex.types";
import { deleteSkillRow, listSkillRows } from "./skillIndexDb";
import {
  listMirrorSkills,
  readMirrorSkillBody,
  resolveMirrorSkillsDir,
} from "./skillMirror";
import { parseSkillText } from "./skillText";

export type ReindexResult = {
  readonly indexed: number;
  readonly removed: number;
  readonly unchanged: number;
};

/**
 * Bring the index in line with the installed skills of one project:
 * add/update changed versions (and retry embedding for keyword-only rows),
 * drop rows whose skill is gone. Idempotent.
 */
export const reindexProject = async (input: {
  readonly db: SkillIndexDb;
  readonly projectDataDir: string;
  readonly projectId: string;
  readonly embed?: SkillEmbedder;
}): Promise<ReindexResult> => {
  const skillsDir = resolveMirrorSkillsDir(
    input.projectDataDir,
    input.projectId,
  );
  const mirror = skillsDir === null ? [] : listMirrorSkills(skillsDir);
  const existing = new Map(
    listSkillRows(input.db, input.projectId).map(
      (r) => [r.skillId, r] as const,
    ),
  );
  let indexed = 0;
  let unchanged = 0;
  for (const skill of mirror) {
    const row = existing.get(skill.skillId);
    existing.delete(skill.skillId);
    const needsEmbedding = row !== undefined && row.vector === null;
    if (
      row?.version === skill.version &&
      row.hasScripts === skill.hasScripts &&
      !(needsEmbedding && input.embed !== undefined)
    ) {
      unchanged += 1;
      continue;
    }
    const body = readMirrorSkillBody(skill);
    if (body === null) {
      continue;
    }
    const result = await indexSkill(
      input.db,
      {
        ...parseSkillText(body, skill.skillId),
        skillId: skill.skillId,
        projectId: input.projectId,
        version: skill.version,
        hasScripts: skill.hasScripts,
      },
      input.embed,
      {
        requireVector:
          row?.version === skill.version && row.hasScripts === skill.hasScripts,
      },
    );
    if (result.wrote) {
      indexed += 1;
    } else {
      unchanged += 1;
    }
  }
  for (const gone of existing.keys()) {
    deleteSkillRow(input.db, input.projectId, gone);
  }
  return { indexed, removed: existing.size, unchanged };
};
