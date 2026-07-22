import os from "node:os";

const expandAgentWitchProjectFolderPath = (folderPath: string): string => {
  const trimmed = folderPath.trim();

  if (trimmed.startsWith("~/")) {
    return `${os.homedir()}${trimmed.slice(1)}`;
  }

  if (trimmed === "~") {
    return os.homedir();
  }

  return trimmed;
};

export default expandAgentWitchProjectFolderPath;
