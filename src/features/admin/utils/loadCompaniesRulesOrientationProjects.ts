import type { CompaniesRulesOrientationProject } from "@/features/admin/types/companiesRulesOrientationProject.type";

const loadCompaniesRulesOrientationProjects = async (): Promise<
  readonly CompaniesRulesOrientationProject[]
> => {
  const response = await fetch("/api/projects");
  if (!response.ok) {
    return [];
  }
  const data: unknown = await response.json();
  if (
    typeof data !== "object" ||
    data === null ||
    !("projects" in data) ||
    !Array.isArray((data as { projects: unknown }).projects)
  ) {
    return [];
  }
  const next: CompaniesRulesOrientationProject[] = [];
  for (const raw of (data as { projects: unknown[] }).projects) {
    if (
      typeof raw === "object" &&
      raw !== null &&
      "id" in raw &&
      "name" in raw &&
      typeof (raw as { id: unknown }).id === "string" &&
      typeof (raw as { name: unknown }).name === "string"
    ) {
      next.push({
        id: (raw as { id: string }).id,
        name: (raw as { name: string }).name,
      });
    }
  }
  return next;
};

export default loadCompaniesRulesOrientationProjects;
