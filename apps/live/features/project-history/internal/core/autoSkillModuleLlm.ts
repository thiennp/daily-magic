import type { AutoSkillCompleter } from "./autoSkill.types";
import { MODULE_MAX_PER_RUN } from "./autoSkillModule.constants";
import type { AutoSkillModuleParam } from "./autoSkillModule.types";

const EXTRACT_TIMEOUT_MS = 30_000;
const EXTRACT_ATTEMPTS = 2;
const PROMPT_CAP = 3_000;

export type LlmModuleRow = {
  readonly verb: string;
  readonly target: string;
  readonly params: readonly AutoSkillModuleParam[];
  readonly text: string;
};

export const buildModuleExtractionPrompt = (prompt: string): string =>
  [
    "Split this coding-task request into its small reusable steps (modules).",
    "Each module: one action on one target, like a step of a recipe.",
    "Replace concrete values (paths, numbers, names) by params.",
    'Answer ONLY strict JSON: {"modules":[{"verb":"<one word>","target":"<short noun phrase>","params":[{"name":"<param name>","example":"<value>"}],"text":"<the step as one sentence>"}]}',
    "",
    `REQUEST: ${prompt.slice(0, PROMPT_CAP)}`,
  ].join("\n");

const toParam = (row: unknown): AutoSkillModuleParam | null => {
  const r = row as Record<string, unknown> | null;
  return typeof r?.name === "string" && typeof r.example === "string"
    ? { name: r.name.slice(0, 40), example: r.example.slice(0, 80) }
    : null;
};

const toRow = (row: unknown): LlmModuleRow | null => {
  const r = row as Record<string, unknown> | null;
  if (
    typeof r?.verb !== "string" ||
    typeof r.target !== "string" ||
    typeof r.text !== "string" ||
    !Array.isArray(r.params) ||
    r.text.trim().length === 0
  ) {
    return null;
  }
  const params = r.params.map(toParam);
  return params.some((p) => p === null)
    ? null
    : {
        verb: r.verb,
        target: r.target,
        text: r.text,
        params: params as AutoSkillModuleParam[],
      };
};

/** Strict schema check; null when the shape is wrong in any row. */
export const parseModuleExtractionJson = (
  text: string,
): readonly LlmModuleRow[] | null => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) {
    return null;
  }
  try {
    const rows = (
      JSON.parse(text.slice(start, end + 1)) as { modules?: unknown }
    ).modules;
    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
    }
    const parsed = rows.map(toRow);
    return parsed.some((p) => p === null)
      ? null
      : (parsed as LlmModuleRow[]).slice(0, MODULE_MAX_PER_RUN);
  } catch {
    return null;
  }
};

/** Ask the completer for modules; one retry; null means "use the splitter". */
export const extractModulesWithLlm = async (
  prompt: string,
  completer: AutoSkillCompleter,
): Promise<readonly LlmModuleRow[] | null> => {
  for (let attempt = 0; attempt < EXTRACT_ATTEMPTS; attempt += 1) {
    const done = await completer({
      prompt: buildModuleExtractionPrompt(prompt),
      json: true,
      timeoutMs: EXTRACT_TIMEOUT_MS,
    });
    const rows = done.ok ? parseModuleExtractionJson(done.text) : null;
    if (rows !== null) {
      return rows;
    }
  }
  return null;
};
