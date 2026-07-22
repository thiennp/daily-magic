import { DEFAULT_USER_PROJECT_NAME } from "@/lib/projects/defaultUserProject.constants";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const isDefaultUserProject = (
  project: Pick<UserProjectRecord, "name">,
): boolean =>
  project.name.trim().toLowerCase() === DEFAULT_USER_PROJECT_NAME.toLowerCase();

export default isDefaultUserProject;
