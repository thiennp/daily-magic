/**
 * Reject empty ids and path-traversal-ish segments (`/` or `..`) after decode.
 * Encode remaining characters for the URL path.
 */
export const isSafePitfallPathSegment = (raw: string): boolean => {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return false;
  }
  let decoded = trimmed;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    return false;
  }
  if (
    decoded.includes("/") ||
    decoded.includes("..") ||
    trimmed.includes("/") ||
    trimmed.includes("..")
  ) {
    return false;
  }
  return true;
};

export const buildProjectPitfallsPath = (projectId: string): string | null => {
  if (!isSafePitfallPathSegment(projectId)) {
    return null;
  }
  return `/api/agent-witch/projects/${encodeURIComponent(projectId.trim())}/pitfalls`;
};

export const buildProjectPitfallHitPath = (
  projectId: string,
  pitfallId: string,
): string | null => {
  if (!isSafePitfallPathSegment(projectId) || !isSafePitfallPathSegment(pitfallId)) {
    return null;
  }
  return `/api/agent-witch/projects/${encodeURIComponent(projectId.trim())}/pitfalls/${encodeURIComponent(pitfallId.trim())}/hit`;
};
