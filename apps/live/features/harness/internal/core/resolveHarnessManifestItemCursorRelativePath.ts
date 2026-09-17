/** Maps stored harness item paths to paths relative to a repo `.cursor/` directory. */
export const resolveHarnessManifestItemCursorRelativePath = (
  manifestItemPath: string,
): string | null => {
  const trimmed = manifestItemPath.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const sharedMatch = /^shared\/items\/[^/]+\/(.+)$/.exec(trimmed);
  if (sharedMatch !== null && typeof sharedMatch[1] === "string") {
    return sharedMatch[1];
  }

  if (
    trimmed.startsWith("rules/") ||
    trimmed.startsWith("skills/") ||
    trimmed.startsWith("commands/") ||
    trimmed.startsWith("agents/") ||
    trimmed.startsWith("instructions/")
  ) {
    return trimmed;
  }

  return null;
};
