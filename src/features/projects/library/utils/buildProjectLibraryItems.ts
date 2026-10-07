import type { ProjectSkillView } from "@/features/project-skill-share/public-api/types";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export type ProjectLibraryKind = "playbook" | "workflow" | "skill";
export type ProjectLibraryFilter = "all" | ProjectLibraryKind;

export interface ProjectLibraryItem {
  /** Capability id (legacy `/library/<id>` deep link) or `skill:<skillId>`. */
  readonly id: string;
  readonly name: string;
  readonly kind: ProjectLibraryKind;
  readonly state: "draft" | "published";
  readonly updatedAt: string;
  readonly body: string;
  readonly skillId: string | null;
}

export const PROJECT_LIBRARY_SKILL_ID_PREFIX = "skill:";

/** Library playbooks (agent) + workflows owned by this project; archived out. */
export const mapProjectLibraryCapabilities = (
  capabilities: readonly PublishedCapabilityRecord[],
  projectId: string,
): readonly ProjectLibraryItem[] =>
  capabilities
    .filter(
      (capability) =>
        capability.projectId === projectId &&
        capability.status !== CapabilityStatus.ARCHIVED,
    )
    .map((capability) => ({
      id: capability.id,
      name: capability.name,
      kind:
        capability.type === CapabilityType.WORKFLOW ? "workflow" : "playbook",
      state:
        capability.status === CapabilityStatus.PUBLISHED
          ? "published"
          : "draft",
      updatedAt: capability.updatedAt,
      body: capability.description || capability.exampleRequest,
      skillId: null,
    }));

/** Project skills + playbooks (kind "playbook") — draft / published; revoked out. */
export const mapProjectLibrarySkills = (
  skills: readonly ProjectSkillView[],
): readonly ProjectLibraryItem[] =>
  skills
    .filter((skill) => skill.state !== "revoked")
    .map((skill) => ({
      id: `${PROJECT_LIBRARY_SKILL_ID_PREFIX}${skill.skillId}`,
      name: skill.name,
      kind: skill.kind === "playbook" ? "playbook" : "skill",
      state: skill.state === "published" ? "published" : "draft",
      updatedAt: skill.updatedAt,
      body: skill.description ?? "",
      skillId: skill.skillId,
    }));

export const filterProjectLibraryItems = (
  items: readonly ProjectLibraryItem[],
  filter: ProjectLibraryFilter,
  query: string,
): readonly ProjectLibraryItem[] => {
  const needle = query.trim().toLowerCase();
  return items.filter(
    (item) =>
      (filter === "all" || item.kind === filter) &&
      (needle.length === 0 || item.name.toLowerCase().includes(needle)),
  );
};

export const countProjectLibraryItems = (
  items: readonly ProjectLibraryItem[],
): Readonly<Record<ProjectLibraryFilter, number>> => ({
  all: items.length,
  playbook: items.filter((item) => item.kind === "playbook").length,
  workflow: items.filter((item) => item.kind === "workflow").length,
  skill: items.filter((item) => item.kind === "skill").length,
});
