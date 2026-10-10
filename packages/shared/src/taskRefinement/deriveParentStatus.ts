export type DerivedParentStatus =
  "queued" | "in_progress" | "blocked" | "done" | "cancelled";

const count = (statuses: readonly string[], ...wanted: string[]): number =>
  statuses.filter((status) => wanted.includes(status)).length;

/**
 * Parent status from its children (never set by hand). Null = no children.
 * Blocked wins only when nothing else can move; a parent with work started
 * and one blocked child stays in_progress ("partially blocked").
 */
export const deriveParentStatus = (
  childStatuses: readonly string[],
): DerivedParentStatus | null => {
  if (childStatuses.length === 0) {
    return null;
  }
  const open = count(childStatuses, "queued", "planned");
  const running = count(childStatuses, "in_progress");
  const blocked = count(childStatuses, "blocked");
  const done = count(childStatuses, "done");
  if (open + running + blocked === 0) {
    return done > 0 ? "done" : "cancelled";
  }
  if (running > 0 || (open > 0 && done + blocked > 0)) {
    return "in_progress";
  }
  return open > 0 ? "queued" : "blocked";
};
