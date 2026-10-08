import { readKnowledgeCount } from "@/lib/knowledge/readKnowledgeCount";
import type {
  SkillSavingsReport,
  SkillStatsReport,
  SkillWeeklyReport,
} from "@/lib/knowledge/knowledgeHeartbeat.type";

const MAX_PROJECTS = 20;
const MAX_SKILLS = 200;
const MAX_WEEKS = 16;

type Rec = Readonly<Record<string, unknown>>;

const isRec = (v: unknown): v is Rec =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const rate = (v: unknown): number | null =>
  typeof v === "number" && v >= 0 && v <= 1 ? v : null;

const parseSkill = (v: unknown): SkillSavingsReport | null => {
  if (!isRec(v) || typeof v.skillId !== "string" || v.skillId.length > 128) {
    return null;
  }
  const calls = readKnowledgeCount(v.calls);
  const saved = readKnowledgeCount(v.saved);
  const samples = readKnowledgeCount(v.samples);
  const holdouts = readKnowledgeCount(v.holdouts);
  const missRate = rate(v.missRate);
  if (
    calls === null ||
    saved === null ||
    samples === null ||
    holdouts === null ||
    missRate === null
  ) {
    return null;
  }
  return {
    skillId: v.skillId,
    calls,
    saved,
    baseline: readKnowledgeCount(v.baseline),
    samples,
    holdouts,
    estimate: v.estimate !== false,
    missRate,
    hasScripts: v.hasScripts === true,
    scriptCount: readKnowledgeCount(v.scriptCount) ?? 0,
  };
};

const parseWeek = (v: unknown): SkillWeeklyReport | null => {
  if (!isRec(v) || typeof v.weekStart !== "string") {
    return null;
  }
  const chosen = readKnowledgeCount(v.chosen);
  const missed = readKnowledgeCount(v.missed);
  return chosen === null ||
    missed === null ||
    !/^\d{4}-\d{2}-\d{2}$/.test(v.weekStart)
    ? null
    : { weekStart: v.weekStart, chosen, missed };
};

const compact = <T>(list: readonly (T | null)[]): T[] =>
  list.filter((x): x is T => x !== null);

export const parseSkillStats = (value: unknown): SkillStatsReport[] =>
  Array.isArray(value)
    ? compact(
        value.slice(0, MAX_PROJECTS).map((entry): SkillStatsReport | null => {
          if (!isRec(entry) || typeof entry.projectId !== "string") {
            return null;
          }
          return {
            projectId: entry.projectId.slice(0, 80),
            skills: compact(
              (Array.isArray(entry.skills) ? entry.skills : [])
                .slice(0, MAX_SKILLS)
                .map(parseSkill),
            ),
            weekly: compact(
              (Array.isArray(entry.weekly) ? entry.weekly : [])
                .slice(0, MAX_WEEKS)
                .map(parseWeek),
            ),
          };
        }),
      )
    : [];
