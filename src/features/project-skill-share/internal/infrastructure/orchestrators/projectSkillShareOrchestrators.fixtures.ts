import type {
  ProjectSkillRecord,
  ProjectSkillVersionRecord,
} from "@/features/project-skill-share/internal/core/projectSkill.type";
import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";

export const projectSkillRecordFixture = (
  overrides: Partial<ProjectSkillRecord> = {},
): ProjectSkillRecord => ({
  rowId: "row-1",
  projectId: "proj-1",
  skillId: "deploy",
  name: "Deploy",
  description: null,
  publisherUserId: "pub",
  state: "published",
  publishedVersion: 1,
  latestVersion: 1,
  contentHash: "sha256:x",
  createdAt: "2026-10-05T00:00:00Z",
  updatedAt: "2026-10-05T00:00:00Z",
  revokedAt: null,
  ...overrides,
});

export const projectSkillVersionRowFixture = (
  body: string,
  contentHash: string,
): ProjectSkillVersionRecord => ({
  skillRowId: "row-1",
  version: 1,
  body,
  contentHash,
  byteSize: body.length,
  isDraft: false,
  createdByUserId: "pub",
  createdAt: "2026-10-05T00:00:00Z",
});

/** History ON port whose local mirror returns `local`. */
export const projectSkillHistoryPortFixture = (
  local: { readonly body: string; readonly contentHash: string } | null,
): ProjectSkillHistoryPort => ({
  isHistoryEnabled: () => true,
  resolveProjectDataDir: () => "/profile/project-data/proj-1",
  writeProjectSkillVersion: () => ({ path: "", contentHash: "" }),
  readProjectSkillVersion: () => local,
  tombstoneProjectSkill: async () => ({ removed: false }),
  readProjectSkillTombstone: async () => null,
  listProjectSkillIds: async () => [],
});
