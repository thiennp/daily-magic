export type AwcRouteSkeletonKind =
  | "home"
  | "projects"
  | "project"
  | "page"
  | "none";

/** Signed-in shell routes without a bespoke skeleton → generic page skeleton. */
const SHELL_ROUTE_PREFIXES = [
  "/prompt-optimizer",
  "/marketplace",
  "/automations",
  "/notifications",
  "/account",
] as const;

const matchesPrefix = (pathname: string, prefix: string): boolean =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

/**
 * DF-016: pick the skeleton from the TARGET pathname. Next shows the first
 * missing segment's nearest loading boundary (often `(app)/loading.tsx` or
 * `projects/loading.tsx` even when going to `/projects/<id>`), so every
 * loading.tsx renders the same component and this decides what to draw.
 */
export const resolveAwcRouteSkeleton = (
  pathname: string,
): AwcRouteSkeletonKind => {
  if (pathname === "/") return "home";
  if (pathname === "/projects") return "projects";
  if (pathname.startsWith("/projects/")) return "project";
  // Redirect-only routes → land on project page / project picker.
  if (pathname.startsWith("/library/")) return "project";
  if (pathname === "/library" || matchesPrefix(pathname, "/new-task")) {
    return "projects";
  }
  if (SHELL_ROUTE_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix))) {
    return "page";
  }
  return "none";
};
