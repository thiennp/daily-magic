import ensureHarnessComponentForOwner from "@/lib/projects/ensureHarnessComponentForOwner";
import resolveLatestComponentVersionId from "@/lib/projects/resolveLatestComponentVersionId";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { getSql } from "@/lib/db";

export type SyncProjectHarnessBindingsResult =
  | { readonly ok: true; readonly boundHarnessCount: number }
  | { readonly ok: false; readonly errorMessage: string };

const syncProjectHarnessBindingsForDevice = async (input: {
  readonly ownerUserId: string;
  readonly deviceId: string;
  readonly projectId: string;
  readonly harnessSetSlugs: readonly string[];
}): Promise<SyncProjectHarnessBindingsResult> => {
  const project = await getUserProjectById(input.projectId);

  if (project === null || project.ownerUserId !== input.ownerUserId) {
    return { ok: false, errorMessage: "Project not found." };
  }

  if (
    project.deviceId !== null &&
    project.deviceId.length > 0 &&
    project.deviceId !== input.deviceId
  ) {
    return {
      ok: false,
      errorMessage: "This project is bound to another Mac.",
    };
  }

  const uniqueSlugs = [
    ...new Set(
      input.harnessSetSlugs
        .map((slug) => slug.trim().toLowerCase())
        .filter((slug) => slug.length > 0),
    ),
  ];

  const sql = getSql();

  await sql`
    UPDATE project_components
    SET removed_at = NOW(), updated_at = NOW()
    WHERE project_id = ${input.projectId}
      AND kind = 'harness'
      AND removed_at IS NULL
  `;

  for (const slug of uniqueSlugs) {
    const componentId = await ensureHarnessComponentForOwner({
      ownerUserId: input.ownerUserId,
      setSlug: slug,
    });
    const versionId = await resolveLatestComponentVersionId(componentId);

    await sql`
      INSERT INTO project_components (
        project_id,
        component_id,
        kind,
        channel,
        pinned_version_id,
        enabled,
        materialize_target
      )
      VALUES (
        ${input.projectId},
        ${componentId},
        'harness',
        'pinned',
        ${versionId},
        true,
        'repo'
      )
    `;
  }

  return { ok: true, boundHarnessCount: uniqueSlugs.length };
};

export default syncProjectHarnessBindingsForDevice;
