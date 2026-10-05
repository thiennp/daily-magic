/**
 * Pure decision helper mirroring db/migrations/068-library-reports-require-project.sql.
 * Private fallback prefers the owner's Default project
 * (DEFAULT_USER_PROJECT_NAME / isDefaultUserProject / resolveDefaultUserProject).
 */

import { DEFAULT_USER_PROJECT_NAME } from "@/lib/projects/defaultUserProject.constants";

export interface MigrationProject {
  readonly id: string;
  readonly ownerUserId: string;
  readonly name: string;
  readonly createdAt: string;
}

export interface MigrationMembership {
  readonly projectId: string;
  readonly userId: string;
  readonly status: "active";
}

export type OrphanProjectTarget =
  | { readonly kind: "existing"; readonly projectId: string }
  | {
      readonly kind: "private_fallback";
      readonly name: "Default" | "Personal";
      readonly reuseProjectId: string | null;
    };

const compareOldest = (a: MigrationProject, b: MigrationProject): number => {
  if (a.createdAt < b.createdAt) return -1;
  if (a.createdAt > b.createdAt) return 1;
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
};

const isSharedProject = (
  project: MigrationProject,
  memberships: readonly MigrationMembership[],
): boolean =>
  memberships.some(
    (m) =>
      m.projectId === project.id &&
      m.status === "active" &&
      m.userId !== project.ownerUserId,
  );

const namedProjects = (
  ownerUserId: string,
  name: string,
  projects: readonly MigrationProject[],
): MigrationProject[] =>
  projects
    .filter(
      (p) =>
        p.ownerUserId === ownerUserId &&
        p.name.trim().toLowerCase() === name.toLowerCase(),
    )
    .sort(compareOldest);

/**
 * Oldest solo project, else solo Default, else create Default,
 * else Personal when every Default is shared.
 */
export const resolveOrphanProjectTarget = (input: {
  readonly ownerUserId: string;
  readonly projects: readonly MigrationProject[];
  readonly activeMemberships: readonly MigrationMembership[];
}): OrphanProjectTarget => {
  const owned = input.projects
    .filter((p) => p.ownerUserId === input.ownerUserId)
    .sort(compareOldest);

  const oldest = owned[0] ?? null;
  if (oldest !== null && !isSharedProject(oldest, input.activeMemberships)) {
    return { kind: "existing", projectId: oldest.id };
  }

  const defaults = namedProjects(
    input.ownerUserId,
    DEFAULT_USER_PROJECT_NAME,
    input.projects,
  );
  const soloDefault = defaults.find(
    (p) => !isSharedProject(p, input.activeMemberships),
  );
  if (soloDefault !== undefined) {
    return { kind: "existing", projectId: soloDefault.id };
  }

  if (defaults.length === 0) {
    return {
      kind: "private_fallback",
      name: "Default",
      reuseProjectId: null,
    };
  }

  const personal = namedProjects(input.ownerUserId, "Personal", input.projects);
  return {
    kind: "private_fallback",
    name: "Personal",
    reuseProjectId: personal[0]?.id ?? null,
  };
};
