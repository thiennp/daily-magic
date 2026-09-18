import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export const filterAwcProjectsByQuery = (
  projects: readonly UserProjectRecord[],
  query: string,
): readonly UserProjectRecord[] => {
  const trimmedQuery = query.trim().toLowerCase();
  if (trimmedQuery === "") {
    return projects;
  }

  return projects.filter(
    (project) =>
      project.name.toLowerCase().includes(trimmedQuery) ||
      project.folderPath.toLowerCase().includes(trimmedQuery),
  );
};
