import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import mapUserProjectRow from "@/lib/projects/mapUserProjectRow";
import { setUserProjectLinkedDevice } from "@/lib/projects/setUserProjectLinkedDevice";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { asRowArray, getSql } from "@/lib/db";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";
import { projectUpdatedNotifyFieldsForUserProjectPatch } from "@/lib/projects/acl/messaging/projectUpdatedNotifyFieldsForUserProjectPatch";

export const updateUserProject = async (
  ownerUserId: string,
  projectId: string,
  input: {
    readonly name?: string;
    readonly deviceId?: string | null;
    readonly repoUrls?: readonly string[];
    readonly defaultBranch?: string | null;
  },
): Promise<UserProjectRecord | null> => {
  const existing = await getUserProjectById(projectId);

  if (existing === null || existing.ownerUserId !== ownerUserId) {
    return null;
  }

  const nextRepoUrls =
    input.repoUrls !== undefined ? [...input.repoUrls] : [...existing.repoUrls];
  const nextDefaultBranch =
    input.defaultBranch !== undefined
      ? input.defaultBranch
      : existing.defaultBranch;

  // device_id is never written here: setUserProjectLinkedDevice is the sole writer.
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE user_projects
      SET
        name = ${input.name ?? existing.name},
        repo_urls = ${nextRepoUrls},
        default_branch = ${nextDefaultBranch},
        updated_at = NOW()
      WHERE id = ${projectId}
        AND owner_user_id = ${ownerUserId}
      RETURNING *
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  let project: UserProjectRecord | null = mapUserProjectRow(rows[0]);

  if (input.deviceId !== undefined) {
    // Device bind/rebind/unbind goes through the sole device_id UPDATE choke.
    project = await setUserProjectLinkedDevice({
      ownerUserId,
      projectId,
      deviceId: input.deviceId,
    });
    if (project === null) {
      return null;
    }
  }

  // Device-only writes skip notify (matches updateUserProjectFolderPath).
  const fields = projectUpdatedNotifyFieldsForUserProjectPatch({
    name: input.name,
    repoUrls: input.repoUrls,
    defaultBranch: input.defaultBranch,
  });
  if (fields.length > 0) {
    await scheduleProjectUpdatedNotify({
      projectId,
      fields,
      actorUserId: ownerUserId,
    });
  }
  return project;
};
