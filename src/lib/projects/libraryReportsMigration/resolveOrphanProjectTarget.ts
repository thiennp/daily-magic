/**
 * Pure decision helper mirroring db/migrations/068-library-reports-require-project.sql.
 */

export interface MigrationProject {
  readonly id: string;
  readonly ownerUserId: string;
  readonly name: string;
  readonly createdAt: string;
}

export interface MigrationMembership {
  readonly projectId: string;
  readonly userId: string;
  /** Only "active" rows are considered; pass only active members. */
  readonly status: "active";
}

export type OrphanProjectTarget =
  | { readonly kind: "existing"; readonly projectId: string }
  | { readonly kind: "personal"; readonly reuseProjectId: string | null };

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

const findPersonal = (
  ownerUserId: string,
  projects: readonly MigrationProject[],
): MigrationProject | null => {
  const personal = projects
    .filter(
      (p) =>
        p.ownerUserId === ownerUserId && p.name.toLowerCase() === "personal",
    )
    .sort(compareOldest);
  return personal[0] ?? null;
};

/**
 * Oldest existing project (created_at, then id) if solo; else Personal.
 * Deleted projects are absent from `projects` and are skipped.
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

  const personal = findPersonal(input.ownerUserId, input.projects);
  return {
    kind: "personal",
    reuseProjectId: personal?.id ?? null,
  };
};
