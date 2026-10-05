import type { ProjectSkillHistoryPort } from "@agent-witch/shared/projectSkills";

import { listProjectSkillIds } from "./listProjectSkillIds";
import { readLocalProjectHistoryState } from "./localProjectHistoryState";
import { readProjectSkillVersion } from "./readProjectSkillVersion";
import { resolveProjectDataDir } from "./resolveProjectDataDir";
import {
  readProjectSkillTombstone,
  tombstoneProjectSkill,
} from "./tombstoneProjectSkill";
import { writeProjectSkillVersion } from "./writeProjectSkillVersion";

/** Real AWL History port for skill pull / publish mirrors. */
export const createProjectSkillHistoryPort = (): ProjectSkillHistoryPort => ({
  isHistoryEnabled: (projectId) => {
    const state = readLocalProjectHistoryState(projectId);
    return state?.state === "on_ready" || state?.state === "degraded";
  },
  resolveProjectDataDir: (projectId) => resolveProjectDataDir(projectId),
  writeProjectSkillVersion: (input) => writeProjectSkillVersion(input),
  readProjectSkillVersion: (input) => readProjectSkillVersion(input),
  tombstoneProjectSkill: (input) => tombstoneProjectSkill(input),
  readProjectSkillTombstone: (input) => readProjectSkillTombstone(input),
  listProjectSkillIds: (input) => listProjectSkillIds(input),
});
