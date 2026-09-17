import { randomUUID } from "node:crypto";

import type { ProjectCompositionSnapshotWire } from "@agent-witch/shared/protocol";

import buildProjectCompositionSnapshotDigest from "@/lib/projects/composition/buildProjectCompositionSnapshotDigest";
import resolveProjectCompositionSnapshotEntries from "@/lib/projects/composition/resolveProjectCompositionSnapshotEntries";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { getSql } from "@/lib/db";

export type CreateProjectCompositionSnapshotResult =
  | { readonly ok: true; readonly snapshot: ProjectCompositionSnapshotWire }
  | { readonly ok: false; readonly errorMessage: string };

const createProjectCompositionSnapshotForDispatch = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  readonly runScopedComponentIds: readonly string[];
}): Promise<CreateProjectCompositionSnapshotResult> => {
  const project = await getUserProjectById(input.projectId);

  if (project === null || project.ownerUserId !== input.ownerUserId) {
    return { ok: false, errorMessage: "Project not found." };
  }

  const resolved = await resolveProjectCompositionSnapshotEntries(input);

  if (!resolved.ok) {
    return resolved;
  }

  const digest = buildProjectCompositionSnapshotDigest(resolved.entries);
  const snapshotId = randomUUID();
  const sql = getSql();

  await sql`
    INSERT INTO project_composition_snapshots (id, project_id, resolved, digest)
    VALUES (
      ${snapshotId},
      ${input.projectId},
      ${JSON.stringify(resolved.entries)}::jsonb,
      ${digest}
    )
  `;

  return {
    ok: true,
    snapshot: {
      id: snapshotId,
      projectId: input.projectId,
      digest,
      entries: resolved.entries,
    },
  };
};

export default createProjectCompositionSnapshotForDispatch;
