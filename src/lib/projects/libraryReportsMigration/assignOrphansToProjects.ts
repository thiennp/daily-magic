import {
  resolveOrphanProjectTarget,
  type MigrationMembership,
  type MigrationProject,
} from "@/lib/projects/libraryReportsMigration/resolveOrphanProjectTarget";

export interface AssignOrphansInput {
  readonly orphans: readonly {
    readonly id: string;
    readonly ownerUserId: string;
    readonly projectId: string | null;
  }[];
  readonly projects: readonly MigrationProject[];
  readonly activeMemberships: readonly MigrationMembership[];
  readonly ensurePrivateProjectId: (
    ownerUserId: string,
    name: "Default" | "Personal",
  ) => string;
}

export interface AssignOrphansResult {
  readonly assignments: ReadonlyMap<string, string>;
  readonly createdPrivate: readonly {
    readonly ownerUserId: string;
    readonly name: "Default" | "Personal";
  }[];
}

const privateProject = (
  id: string,
  ownerUserId: string,
  name: "Default" | "Personal",
): MigrationProject => ({
  id,
  ownerUserId,
  name,
  createdAt: "9999-01-01T00:00:00.000Z",
});

/** Idempotent assignment; items with projectId are untouched. */
export const assignOrphansToProjects = (
  input: AssignOrphansInput,
): AssignOrphansResult => {
  const projects = [...input.projects];
  const createdPrivate: {
    readonly ownerUserId: string;
    readonly name: "Default" | "Personal";
  }[] = [];
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

    const projectId =
      target.reuseProjectId ??
      (() => {
        const id = input.ensurePrivateProjectId(
          orphan.ownerUserId,
          target.name,
        );
        projects.push(privateProject(id, orphan.ownerUserId, target.name));
        createdPrivate.push({
          ownerUserId: orphan.ownerUserId,
          name: target.name,
        });
        return id;
      })();

    assignments.set(orphan.id, projectId);
  }

  return { assignments, createdPrivate };
};
