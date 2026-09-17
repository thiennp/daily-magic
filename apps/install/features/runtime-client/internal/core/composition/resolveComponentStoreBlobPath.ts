import path from "node:path";

const resolveComponentStoreBlobPath = (
  installDir: string,
  contentSha256: string,
): string => {
  const trimmed = contentSha256.trim();

  return path.join(
    installDir,
    "components",
    "store",
    trimmed.slice(0, 2),
    trimmed,
  );
};

export default resolveComponentStoreBlobPath;
