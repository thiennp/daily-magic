import compareNullableTimesDesc from "@/features/home/utils/compareNullableTimesDesc";
import parseProjectActivityTime from "@/features/home/utils/parseProjectActivityTime";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/**
 * Most recent activity first.
 *
 * 1. `lastUsedAt` desc — set by `touchUserProjectLastUsed` when the project is
 *    used; the same key `/api/projects` orders by (`last_used_at DESC NULLS LAST`).
 *    Missing / unparseable values sort last.
 * 2. `updatedAt` desc, then `createdAt` desc (missing / unparseable last).
 * 3. `id` ascending, so equal timestamps always resolve the same way.
 */
export default function compareProjectsByRecentActivity(
  left: UserProjectRecord,
  right: UserProjectRecord,
): number {
  const byLastUsed = compareNullableTimesDesc(
    parseProjectActivityTime(left.lastUsedAt),
    parseProjectActivityTime(right.lastUsedAt),
  );

  if (byLastUsed !== 0) {
    return byLastUsed;
  }

  const byUpdated = compareNullableTimesDesc(
    parseProjectActivityTime(left.updatedAt),
    parseProjectActivityTime(right.updatedAt),
  );

  if (byUpdated !== 0) {
    return byUpdated;
  }

  const byCreated = compareNullableTimesDesc(
    parseProjectActivityTime(left.createdAt),
    parseProjectActivityTime(right.createdAt),
  );

  if (byCreated !== 0) {
    return byCreated;
  }

  if (left.id === right.id) {
    return 0;
  }

  return left.id < right.id ? -1 : 1;
}
