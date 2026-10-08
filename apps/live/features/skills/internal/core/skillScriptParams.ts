import {
  SKILL_SCRIPT_PARAM_VALUE_MAX,
  type SkillScriptEntry,
} from "@agent-witch/shared/projectSkills";

export type ParamResult =
  | { readonly ok: true; readonly argv: readonly string[] }
  | { readonly ok: false; readonly error: string };

/**
 * Params become positional argv in manifest order (an omitted optional param
 * is an empty string). Strings only, capped, no NUL; never a shell string.
 */
export const buildScriptArgv = (
  entry: SkillScriptEntry,
  raw: Readonly<Record<string, unknown>>,
): ParamResult => {
  const declared = new Set(entry.params.map((p) => p.name));
  const unknown = Object.keys(raw).find((key) => !declared.has(key));
  if (unknown !== undefined) {
    return { ok: false, error: `unknown_param:${unknown}` };
  }
  const argv: string[] = [];
  for (const param of entry.params) {
    const value = raw[param.name];
    if (value === undefined || value === "") {
      if (param.required) {
        return { ok: false, error: `missing_param:${param.name}` };
      }
      argv.push("");
      continue;
    }
    if (
      typeof value !== "string" ||
      value.length > SKILL_SCRIPT_PARAM_VALUE_MAX ||
      value.includes("\u0000")
    ) {
      return { ok: false, error: `invalid_param:${param.name}` };
    }
    argv.push(value);
  }
  return { ok: true, argv };
};
