import { createHash } from "node:crypto";

import {
  GENERIC_MODULE_VERBS,
  MODULE_CANONICAL_CAP,
  MODULE_MIN_MEANINGFUL_TOKENS,
  MODULE_STOPWORDS,
} from "./autoSkillModule.constants";
import type {
  AutoSkillModule,
  AutoSkillModuleParam,
} from "./autoSkillModule.types";
import { scrubProjectHistorySkillgenSecrets } from "./scrubProjectHistorySkillgenSecrets";

export const PARAM_PLACEHOLDER = "<param>";

const VALUE_PATTERNS: readonly { name: string; re: RegExp }[] = [
  { name: "value", re: /"[^"\n]{1,120}"|'[^'\n]{1,120}'|`[^`\n]{1,120}`/g },
  { name: "url", re: /\bhttps?:\/\/\S+/g },
  { name: "path", re: /(?:[\w.~-]*\/)+[\w.-]*|\b[\w-]+\.[a-z]{1,5}\b/gi },
  { name: "number", re: /\b\d[\d.,:-]*\b/g },
];

/** Replace values with <param>; collect their examples. */
export const extractModuleParams = (
  raw: string,
): { readonly text: string; readonly params: AutoSkillModuleParam[] } => {
  const params: AutoSkillModuleParam[] = [];
  const text = VALUE_PATTERNS.reduce(
    (acc, { name, re }) =>
      acc.replace(re, (hit) => {
        params.push({ name, example: hit.slice(0, 80) });
        return PARAM_PLACEHOLDER;
      }),
    scrubProjectHistorySkillgenSecrets(raw).scrubbed,
  );
  return { text, params };
};

export const canonicalizeModuleText = (raw: string): string =>
  extractModuleParams(raw)
    .text.toLowerCase()
    .replace(/[^\p{L}\p{N}\s<>-]+/gu, " ")
    .replace(/(<param>\s*)+/g, `${PARAM_PLACEHOLDER} `)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MODULE_CANONICAL_CAP);

export const hashModuleCanonical = (canonical: string): string =>
  createHash("sha256").update(canonical).digest("hex").slice(0, 24);

const meaningfulTokens = (canonical: string): string[] =>
  canonical
    .split(" ")
    .filter(
      (t) =>
        t.length > 2 && t !== PARAM_PLACEHOLDER && !MODULE_STOPWORDS.has(t),
    );

/** Too small or too generic to become a skill on its own. */
export const isTrivialModule = (canonical: string): boolean => {
  const tokens = meaningfulTokens(canonical);
  return (
    tokens.length < MODULE_MIN_MEANINGFUL_TOKENS ||
    tokens.every((t) => GENERIC_MODULE_VERBS.has(t))
  );
};

export type AutoSkillModuleHint = {
  readonly verb?: string;
  readonly target?: string;
  readonly params?: readonly AutoSkillModuleParam[];
};

/** Build a module from step text (LLM hints override derived verb/target). */
export const buildAutoSkillModule = (
  text: string,
  position: number,
  hint?: AutoSkillModuleHint,
): AutoSkillModule | null => {
  const canonical = canonicalizeModuleText(text);
  if (canonical.length === 0 || isTrivialModule(canonical)) {
    return null;
  }
  const tokens = meaningfulTokens(canonical);
  const extracted = extractModuleParams(text);
  return {
    verb: hint?.verb?.toLowerCase().trim() || tokens[0] || "",
    target: hint?.target?.toLowerCase().trim() || tokens.slice(1, 4).join(" "),
    params: hint?.params ?? extracted.params,
    text: extracted.text.slice(0, MODULE_CANONICAL_CAP),
    canonical,
    hash: hashModuleCanonical(canonical),
    position,
  };
};
