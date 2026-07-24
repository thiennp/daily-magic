import { buildAgentWitchProjectsHomePath } from "@/lib/projects/buildAgentWitchProjectsHomePath";
import slugifyProjectName from "@/lib/projects/slugifyProjectName";

const buildDefaultProjectFolderPath = (
  projectName: string,
  profileEmail: string,
  installDirName?: string,
): string => {
  const slug = slugifyProjectName(projectName);

  return `${buildAgentWitchProjectsHomePath(profileEmail, installDirName)}/${slug.length > 0 ? slug : "project"}`;
};

export default buildDefaultProjectFolderPath;
