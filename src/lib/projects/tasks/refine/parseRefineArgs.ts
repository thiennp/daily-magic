import {
  EFFORT_TIERS,
  SPLIT_MAX_SUBTASKS,
  type EffortTier,
} from "@agent-witch/shared/taskRefinement";
import { isValidProjectSkillId } from "@agent-witch/shared/projectSkills";

export type RefineArgsError = "invalid_arguments";

export const rec = (v: unknown): Record<string, unknown> | null =>
  v !== null && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : null;

export const text = (v: unknown, max: number): string | null =>
  typeof v === "string" && v.trim().length > 0 && v.trim().length <= max
    ? v.trim()
    : null;

export const oneOf = <T extends string>(
  v: unknown,
  list: readonly T[],
): T | null =>
  typeof v === "string" && (list as readonly string[]).includes(v)
    ? (v as T)
    : null;

export type SubtaskInput = {
  readonly title: string;
  readonly skillId?: string;
  readonly skillParams?: Record<string, unknown>;
  readonly effortTier?: EffortTier;
  readonly needsSkill: boolean;
};

const parseSubtask = (raw: unknown): SubtaskInput | null => {
  const r = rec(raw);
  const title = text(r?.title, 120);
  if (r === null || title === null) return null;
  const skillId = r.skillId === undefined ? undefined : text(r.skillId, 80);
  if (
    skillId === null ||
    (skillId !== undefined && !isValidProjectSkillId(skillId))
  )
    return null;
  const params = r.skillParams === undefined ? undefined : rec(r.skillParams);
  if (params === null || JSON.stringify(params ?? {}).length > 1000)
    return null;
  const tier =
    r.effortTier === undefined ? undefined : oneOf(r.effortTier, EFFORT_TIERS);
  if (tier === null) return null;
  return {
    title,
    ...(skillId !== undefined ? { skillId } : {}),
    ...(params !== undefined ? { skillParams: params } : {}),
    ...(tier !== undefined ? { effortTier: tier } : {}),
    needsSkill: r.needsSkill === true,
  };
};

export const parseSplitArgs = (
  args: unknown,
):
  | { ok: true; projectId: string; taskId: string; subtasks: SubtaskInput[] }
  | { ok: false; code: RefineArgsError } => {
  const r = rec(args);
  const projectId = text(r?.projectId, 80);
  const taskId = text(r?.taskId, 80);
  const list = Array.isArray(r?.subtasks) ? r.subtasks : null;
  if (projectId === null || taskId === null || list === null)
    return { ok: false, code: "invalid_arguments" };
  if (list.length === 0 || list.length > SPLIT_MAX_SUBTASKS)
    return { ok: false, code: "invalid_arguments" };
  const parsed = list.map(parseSubtask);
  if (parsed.some((s) => s === null))
    return { ok: false, code: "invalid_arguments" };
  return { ok: true, projectId, taskId, subtasks: parsed as SubtaskInput[] };
};
