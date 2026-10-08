import {
  SKILL_SCRIPT_FILE_PATTERN,
  SKILL_SCRIPT_MAX_COUNT,
  SKILL_SCRIPT_MAX_PARAMS,
  SKILL_SCRIPT_MAX_TIMEOUT_SEC,
  SKILL_SCRIPT_NAME_PATTERN,
  SKILL_SCRIPT_PARAM_PATTERN,
  SKILL_SCRIPT_PARAM_VALUE_MAX,
} from "./skillBundle.constant";
import type {
  SkillManifest,
  SkillScriptEntry,
  SkillScriptParam,
} from "./skillBundle.type";

type Rec = Readonly<Record<string, unknown>>;

const isRec = (value: unknown): value is Rec =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseParam = (raw: unknown): SkillScriptParam | null => {
  if (!isRec(raw) || typeof raw.name !== "string") {
    return null;
  }
  const example = typeof raw.example === "string" ? raw.example : "";
  return SKILL_SCRIPT_PARAM_PATTERN.test(raw.name) &&
    example.length <= SKILL_SCRIPT_PARAM_VALUE_MAX
    ? { name: raw.name, required: raw.required === true, example }
    : null;
};

const parseEntry = (raw: unknown): SkillScriptEntry | null => {
  if (
    !isRec(raw) ||
    typeof raw.name !== "string" ||
    typeof raw.file !== "string" ||
    typeof raw.sha256 !== "string" ||
    !SKILL_SCRIPT_NAME_PATTERN.test(raw.name) ||
    !SKILL_SCRIPT_FILE_PATTERN.test(raw.file) ||
    !/^[0-9a-f]{64}$/.test(raw.sha256)
  ) {
    return null;
  }
  const rawParams = Array.isArray(raw.params) ? raw.params : [];
  const params = rawParams.map(parseParam);
  const perms = isRec(raw.permissions) ? raw.permissions : {};
  const timeout = raw.timeoutSec;
  if (
    params.length > SKILL_SCRIPT_MAX_PARAMS ||
    params.some((p) => p === null) ||
    new Set(params.map((p) => p?.name)).size !== params.length ||
    (timeout !== undefined &&
      !(
        Number.isInteger(timeout) &&
        (timeout as number) > 0 &&
        (timeout as number) <= SKILL_SCRIPT_MAX_TIMEOUT_SEC
      ))
  ) {
    return null;
  }
  return {
    name: raw.name,
    file: raw.file,
    description:
      typeof raw.description === "string" ? raw.description.slice(0, 300) : "",
    params: params as SkillScriptParam[],
    permissions: {
      write: perms.write === true,
      network: perms.network === true,
    },
    sha256: raw.sha256,
    ...(timeout === undefined ? {} : { timeoutSec: timeout as number }),
  };
};

/** Strict manifest parser; null on any shape violation or duplicate name/file. */
export const parseSkillManifest = (raw: unknown): SkillManifest | null => {
  if (!isRec(raw) || !Array.isArray(raw.scripts)) {
    return null;
  }
  const entries = raw.scripts.map(parseEntry);
  if (
    entries.length === 0 ||
    entries.length > SKILL_SCRIPT_MAX_COUNT ||
    entries.some((e) => e === null)
  ) {
    return null;
  }
  const scripts = entries as SkillScriptEntry[];
  const unique = (pick: (e: SkillScriptEntry) => string): boolean =>
    new Set(scripts.map(pick)).size === scripts.length;
  return unique((e) => e.name) && unique((e) => e.file) ? { scripts } : null;
};
