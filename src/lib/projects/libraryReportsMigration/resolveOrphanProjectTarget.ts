/**
 * Pure decision helper mirroring db/migrations/068-library-reports-require-project.sql.
 * Used by unit tests so the privacy rule stays locked without hitting a real DB.
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
 * Resolve where an orphan Library item or Report for `ownerUserId` should go.
 * - Oldest existing project for the owner (created_at, then id) if it is solo.
 * - Otherwise Personal (reuse existing Personal name, else create).
 * Deleted/archived projects are simply absent from `projects` and are skipped.
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

/**
 * Idempotent assignment map: itemId -> projectId.
 * Items that already have a projectId are left untouched (re-run no-op).
 * When Personal must be created, `ensurePersonalProjectId` supplies one stable id.
 */
export const assignOrphansToProjects = (input: {
  readonly orphans: readonly {
    readonly id: string;
    readonly ownerUserId: string;
    readonly projectId: string | null;
  }[];
  readonly projects: readonly MigrationProject[];
  readonly activeMemberships: readonly MigrationMembership[];
  readonly ensurePersonalProjectId: (ownerUserId: string) => string;
}): {
  readonly assignments: ReadonlyMap<string, string>;
  readonly createdPersonalOwnerIds: readonly string[];
} => {
  const projects = [...input.projects];
  const createdPersonalOwnerIds: string[] = [];
  const assignments = new Map<string, string>();

  for (const orphan of input.orphans) {
    if (orphan.projectId !== null && orphan.projectId.length > 0) {
      continue;
    }

    const target = resolveOrphanProjectTarget({
      ownerUserId: orphan.ownerUserId,
      projects,
      activeMemberships: input.activeMemberships,
    });

    if (target.kind === "existing") {
      assignments.set(orphan.id, target.projectId);
      continue;
    }

    let personalId = target.reuseProjectId;
    if (personalId === null) {
      personalId = input.ensurePersonalProjectId(orphan.ownerUserId);
      projects.push({
        id: personalId,
        ownerUserId: orphan.ownerUserId,
        name: "Personal",
        createdAt: "9999-01-01T00:00:00.000Z",
      });
      createdPersonalOwnerIds.push(orphan.ownerUserId);
    }
    assignments.set(orphan.id, personalId);
  }

  return { assignments, createdPersonalOwnerIds };
};
