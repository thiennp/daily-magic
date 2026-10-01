/** Last meaningful path segment for list disambiguation (repo folder name). */
const deriveProjectFolderSlug = (folderPath: string): string => {
  const normalized = folderPath.trim().replace(/\/+$/, "");
  if (normalized.length === 0) {
    return "";
  }

  const segments = normalized
    .split("/")
    .filter((segment) => segment.length > 0);
  const last = segments.at(-1) ?? "";
  return last.replace(/^~$/, "").trim();
};

export default deriveProjectFolderSlug;
