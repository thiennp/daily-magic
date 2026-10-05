/**
 * NRG contract route (session or device token):
 * GET /api/agent-witch/projects/:projectId/pitfalls?includeRetired=0|1
 * → { ok, projectId, count, pitfalls, syncedAt }
 */
const buildProjectPitfallsPath = (
  projectId: string,
  options: { readonly includeRetired?: boolean } = {},
): string => {
  const query = new URLSearchParams({
    includeRetired: options.includeRetired === true ? "1" : "0",
  });
  return `/api/agent-witch/projects/${encodeURIComponent(projectId.trim())}/pitfalls?${query.toString()}`;
};

export default buildProjectPitfallsPath;
