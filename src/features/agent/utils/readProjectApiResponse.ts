import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export const readProjectErrorMessage = (data: unknown): string => {
  if (
    typeof data === "object" &&
    data !== null &&
    "errorMessage" in data &&
    typeof (data as { errorMessage: unknown }).errorMessage === "string"
  ) {
    return (data as { errorMessage: string }).errorMessage;
  }

  return "Could not save project.";
};

export const readCreatedProject = (data: unknown): UserProjectRecord | null => {
  if (
    typeof data === "object" &&
    data !== null &&
    "project" in data &&
    typeof (data as { project: unknown }).project === "object" &&
    (data as { project: UserProjectRecord | null }).project !== null
  ) {
    return (data as { project: UserProjectRecord }).project;
  }

  return null;
};
