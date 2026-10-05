import { HOME_RECENT_PROJECTS_LIMIT } from "@/features/home/constants/homeRecentProjectsLimit.constant";
import compareProjectsByRecentActivity from "@/features/home/utils/compareProjectsByRecentActivity";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/** Top 3 projects by recent activity. Pure: does not mutate the input list. */
export default function selectHomeRecentProjects(
  projects: readonly UserProjectRecord[],
): readonly UserProjectRecord[] {
  return [...projects]
    .sort(compareProjectsByRecentActivity)
    .slice(0, HOME_RECENT_PROJECTS_LIMIT);
}
