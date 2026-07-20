import { AGENT_WITCH_PROJECTS_HOME_PATH } from "@/lib/projects/constants";
import slugifyProjectName from "@/lib/projects/slugifyProjectName";

const buildDefaultProjectFolderPath = (projectName: string): string => {
  const slug = slugifyProjectName(projectName);

  return `${AGENT_WITCH_PROJECTS_HOME_PATH}/${slug.length > 0 ? slug : "project"}`;
};

export default buildDefaultProjectFolderPath;
