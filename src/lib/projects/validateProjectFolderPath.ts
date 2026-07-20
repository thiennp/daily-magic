const PROJECT_PATH_TRAVERSAL_PATTERN = /(^|\/)\.\.(\/|$)/;

const normalizeProjectFolderPath = (folderPath: string): string =>
  folderPath.trim().replace(/\/+$/u, "");

export const isValidProjectFolderPath = (folderPath: string): boolean => {
  const normalized = normalizeProjectFolderPath(folderPath);

  return (
    normalized.length > 0 &&
    !PROJECT_PATH_TRAVERSAL_PATTERN.test(normalized) &&
    !normalized.includes("\0")
  );
};

export const normalizeValidatedProjectFolderPath = (
  folderPath: string,
): string | null => {
  const normalized = normalizeProjectFolderPath(folderPath);

  return isValidProjectFolderPath(normalized) ? normalized : null;
};
