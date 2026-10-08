import type { SkillImpactRow } from "@/lib/knowledge/knowledgeImpactView.type";

/** "Used 3 times · saved ≈1,200 tokens"; null while the skill was never used. */
export const formatSkillUsage = (
  stats: SkillImpactRow | undefined,
): string | null => {
  if (stats === undefined || stats.calls === 0) {
    return null;
  }
  const times = `Used ${stats.calls} ${stats.calls === 1 ? "time" : "times"}`;
  const saved = new Intl.NumberFormat("en-US").format(stats.saved);
  return `${times} · saved ${stats.estimate ? "≈" : ""}${saved} tokens`;
};
