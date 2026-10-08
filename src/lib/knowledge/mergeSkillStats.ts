import type {
  SkillStatsReport,
  SkillWeeklyReport,
} from "@/lib/knowledge/knowledgeHeartbeat.type";
import type { SkillImpactRow } from "@/lib/knowledge/knowledgeImpactView.type";

type Snapshot = Pick<SkillStatsReport, "skills" | "weekly">;

/** Fewer baseline samples than this stay marked as an estimate. */
export const SKILL_MIN_SAMPLES = 3;

/**
 * Merge per-computer snapshots: calls, savings and holdouts add up; the
 * baseline comes from the computer with the most samples; the miss rate is
 * the mean over computers that know the skill.
 */
export const mergeSkillStats = (snapshots: readonly Snapshot[]) => {
  const bySkill = new Map<string, SkillImpactRow[]>();
  for (const snapshot of snapshots) {
    for (const s of snapshot.skills) {
      bySkill.set(s.skillId, [...(bySkill.get(s.skillId) ?? []), s]);
    }
  }
  const skills: SkillImpactRow[] = [...bySkill.entries()].map(
    ([skillId, rows]) => {
      const best = [...rows].sort((a, b) => b.samples - a.samples)[0]!;
      const samples = rows.reduce((sum, r) => sum + r.samples, 0);
      return {
        skillId,
        calls: rows.reduce((sum, r) => sum + r.calls, 0),
        saved: rows.reduce((sum, r) => sum + r.saved, 0),
        baseline: best.baseline,
        samples,
        holdouts: rows.reduce((sum, r) => sum + r.holdouts, 0),
        estimate: samples < SKILL_MIN_SAMPLES || rows.some((r) => r.estimate),
        missRate: rows.reduce((sum, r) => sum + r.missRate, 0) / rows.length,
        hasScripts: rows.some((r) => r.hasScripts),
        scriptCount: Math.max(...rows.map((r) => r.scriptCount)),
      };
    },
  );
  const weeks = new Map<string, SkillWeeklyReport>();
  for (const w of snapshots.flatMap((s) => s.weekly)) {
    const prev = weeks.get(w.weekStart);
    weeks.set(w.weekStart, {
      weekStart: w.weekStart,
      chosen: (prev?.chosen ?? 0) + w.chosen,
      missed: (prev?.missed ?? 0) + w.missed,
    });
  }
  return {
    skills: skills.sort((a, b) => b.saved - a.saved || b.calls - a.calls),
    weekly: [...weeks.values()].sort((a, b) =>
      a.weekStart.localeCompare(b.weekStart),
    ),
  };
};
