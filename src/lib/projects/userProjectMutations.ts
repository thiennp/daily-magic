import { randomUUID } from "node:crypto";

import { isActorOwnedLiveDevice } from "@/lib/projects/acl/isActorOwnedLiveDevice";
import { syncProjectComputerMembership } from "@/lib/projects/acl/syncProjectComputerMembership";
import { listUserProjectsForOwner } from "@/lib/projects/userProjectQueries";
import mapUserProjectRow from "@/lib/projects/mapUserProjectRow";
import type { CreateUserProjectInput } from "@/lib/projects/parseUserProjectBody";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export { updateUserProject } from "@/lib/projects/updateUserProject";

export const createUserProject = async (
  ownerUserId: string,
  input: CreateUserProjectInput,
): Promise<UserProjectRecord | null> => {
  const linkedDeviceId = input.deviceId?.trim() ?? "";
  if (linkedDeviceId.length === 0) {
    return null;
  }
  // A project can only be bound to a live computer its owner registered.
  const ownsDevice = await isActorOwnedLiveDevice({
    userId: ownerUserId,
    deviceId: linkedDeviceId,
  });
  if (!ownsDevice) {
    return null;
  }

  const projectId = randomUUID();
  const repoUrls = [...(input.repoUrls ?? [])];
  const defaultBranch =
    input.defaultBranch === undefined ? null : input.defaultBranch;
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO user_projects (
        id, owner_user_id, device_id, name, folder_path, repo_urls, default_branch
      )
      VALUES (
        ${projectId}, ${ownerUserId}, ${linkedDeviceId},
        ${input.name}, ${input.folderPath}, ${repoUrls}, ${defaultBranch}
      )
      RETURNING *
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  const project = mapUserProjectRow(rows[0]);
  await syncProjectComputerMembership({
    projectId: project.id,
    ownerUserId,
    previousDeviceId: null,
    nextDeviceId: linkedDeviceId,
  });
  return project;
};

export const listProjectsForOwner = listUserProjectsForOwner;
