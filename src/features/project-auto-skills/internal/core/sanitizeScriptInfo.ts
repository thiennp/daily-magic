import type {
  AutoSkillReplayStatus,
  AutoSkillScriptInfo,
  AutoSkillScriptInfoEntry,
} from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";

type Rec = Readonly<Record<string, unknown>>;

const MAX_SCRIPTS = 10;
const STATUSES: readonly AutoSkillReplayStatus[] = [
  "ok",
  "failed",
  "not_replayed",
];

const isRec = (v: unknown): v is Rec =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const text = (v: unknown, max: number): string =>
  typeof v === "string" ? v.slice(0, max) : "";

const num = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? Math.round(v) : null;

const entry = (raw: unknown): AutoSkillScriptInfoEntry | null => {
  if (!isRec(raw) || text(raw.name, 48).length === 0) {
    return null;
  }
  const perms = isRec(raw.permissions) ? raw.permissions : {};
  const replay = isRec(raw.replay) ? raw.replay : {};
  const status = STATUSES.find((s) => s === replay.status) ?? "not_replayed";
  return {
    name: text(raw.name, 48),
    description: text(raw.description, 300),
    permissions: {
      write: perms.write === true,
      network: perms.network === true,
    },
    params: (Array.isArray(raw.params) ? raw.params : [])
      .filter(isRec)
      .slice(0, 8)
      .map((p) => ({ name: text(p.name, 32), required: p.required === true })),
    replay: {
      status,
      exitCode: num(replay.exitCode),
      ms: num(replay.ms),
      note: text(replay.note, 200) || null,
    },
  };
};

/** Device-supplied script info: bounded and shape-checked before it is stored. */
export const sanitizeScriptInfo = (
  raw: unknown,
): AutoSkillScriptInfo | null => {
  if (!isRec(raw) || !Array.isArray(raw.scripts)) {
    return null;
  }
  const scripts = raw.scripts
    .slice(0, MAX_SCRIPTS)
    .map(entry)
    .filter((e): e is AutoSkillScriptInfoEntry => e !== null);
  const skillId = text(raw.skillId, 128);
  return scripts.length === 0
    ? null
    : { ...(skillId.length > 0 ? { skillId } : {}), scripts };
};
