import { asRowArray, getSql } from "@/lib/db";
import { parseProjectInvitePlatform } from "@/lib/projects/acl/invites/projectInvitePlatform.constant";

/** invite id → platform (null when unknown), for the expected join mode. */
export const loadProjectInvitePlatforms = async (
  inviteIds: readonly string[],
): Promise<ReadonlyMap<string, string | null>> => {
  const map = new Map<string, string | null>();
  if (inviteIds.length === 0) return map;
  try {
    const rows = asRowArray(
      await getSql()`
        SELECT id, platform FROM project_invites
        WHERE id = ANY(${[...inviteIds]})
      `,
    );
    for (const row of rows) {
      map.set(String(row.id), parseProjectInvitePlatform(row.platform));
    }
  } catch (error: unknown) {
    console.error("approval card invite platforms failed", {
      error: error instanceof Error ? error.message : "load_failed",
    });
  }
  return map;
};
