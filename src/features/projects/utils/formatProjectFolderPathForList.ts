export interface ProjectFolderPathListDisplay {
  readonly display: string;
  readonly full: string;
}

const formatProjectFolderPathForList = (
  folderPath: string,
  maxLength = 52,
): ProjectFolderPathListDisplay => {
  const full = folderPath.trim();
  if (full.length <= maxLength) {
    return { display: full, full };
  }

  const tailChars = Math.min(28, Math.max(12, Math.floor(maxLength * 0.45)));
  const headChars = Math.max(8, maxLength - tailChars - 1);
  const display = `${full.slice(0, headChars)}…${full.slice(-tailChars)}`;

  return { display, full };
};

export default formatProjectFolderPathForList;
