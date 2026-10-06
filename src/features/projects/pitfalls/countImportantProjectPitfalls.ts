import type { ProjectPitfallView } from "@agent-witch/shared/pitfalls";

/** Active (not retired) safety rules with Important (block) severity. */
const countImportantProjectPitfalls = (
  items: readonly ProjectPitfallView[],
): number =>
  items.filter((item) => item.source !== "retired" && item.severity === "block")
    .length;

export default countImportantProjectPitfalls;
