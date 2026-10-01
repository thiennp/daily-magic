export type AwcProjectDetailAction = "rename";

const buildAwcProjectDetailHref = (
  projectId: string,
  action?: AwcProjectDetailAction,
): string => {
  const base = `/projects/${encodeURIComponent(projectId.trim())}`;
  if (action === "rename") {
    return `${base}?rename=1`;
  }
  return base;
};

export default buildAwcProjectDetailHref;
