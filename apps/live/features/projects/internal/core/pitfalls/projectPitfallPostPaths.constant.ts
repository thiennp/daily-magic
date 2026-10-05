export type ProjectPitfallPostAction = "save" | "retire" | "restore";

/**
 * Form action paths for the AWL Pitfalls tab. Kept outside the POST handler so
 * the view can render forms without importing handler modules.
 */
export const PROJECT_PITFALL_POST_PATHS: Readonly<
  Record<ProjectPitfallPostAction, string>
> = {
  save: "/project/pitfalls/save",
  retire: "/project/pitfalls/retire",
  restore: "/project/pitfalls/restore",
};

export const resolveProjectPitfallPostAction = (
  pathname: string,
): ProjectPitfallPostAction | null => {
  const entry = Object.entries(PROJECT_PITFALL_POST_PATHS).find(
    ([, path]) => path === pathname,
  );
  return entry === undefined ? null : (entry[0] as ProjectPitfallPostAction);
};
