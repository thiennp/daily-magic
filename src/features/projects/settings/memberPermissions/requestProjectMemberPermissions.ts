import { parseProjectMemberPermissions } from "@/lib/projects/acl/memberPermissions/parseProjectMemberPermissions";
import type { ProjectMemberPermissions } from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

export type MemberPermissionsResult =
  | { readonly ok: true; readonly permissions: ProjectMemberPermissions }
  | { readonly ok: false };

/**
 * GET (no `patch`) or PUT (with a partial `patch`) of
 * /api/projects/:id/access/member-permissions. The server answers with the
 * full map either way, so the UI always shows what is stored.
 */
export const requestProjectMemberPermissions = async (input: {
  readonly projectId: string;
  readonly patch?: Partial<ProjectMemberPermissions>;
  readonly signal?: AbortSignal;
}): Promise<MemberPermissionsResult> => {
  const isWrite = input.patch !== undefined;
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(input.projectId)}/access/member-permissions`,
      {
        method: isWrite ? "PUT" : "GET",
        signal: input.signal,
        ...(isWrite
          ? {
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ permissions: input.patch }),
            }
          : {}),
      },
    );
    const data = (await response.json().catch(() => null)) as {
      ok?: unknown;
      permissions?: unknown;
    } | null;
    return response.ok && data?.ok === true
      ? {
          ok: true,
          permissions: parseProjectMemberPermissions(data.permissions),
        }
      : { ok: false };
  } catch {
    return { ok: false };
  }
};
