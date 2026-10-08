import {
  buildSkillBundle,
  type SkillBundle,
  type SkillScriptProposal,
} from "@agent-witch/shared/projectSkills";

type Rec = Readonly<Record<string, unknown>>;

const FENCE = /```scripts[^\n]*\n([\s\S]*?)```/i;
const ABSOLUTE_PATH =
  /(?:^|[\s"'=(:])\/(?:Users|home|etc|var|tmp|root|private|Library|System|opt)\b|~\/|\$HOME|\$\{HOME\}|[A-Z]:\\/;
const NETWORK_TOOL = /\b(?:curl|wget|ssh|scp|nc|ncat)\b|\bfetch\(|https?:\/\//;
/** Escapes the project folder or runs arbitrary programs: never proposed. */
const DANGEROUS =
  /\bsudo\b|\beval\b|\bchmod\b|\bchown\b|\.\.[\/\\]|\bcd\s+\.\.|child_process|process\.chdir|\brm\s+-[a-z]*r/;

export type SplitScriptsBlock = {
  /** Model output without the fenced scripts block. */
  readonly rest: string;
  /** Raw JSON of the block, or null when the model proposed none. */
  readonly json: string | null;
};

export const splitScriptsBlock = (text: string): SplitScriptsBlock => {
  const match = FENCE.exec(text);
  return match === null
    ? { rest: text, json: null }
    : { rest: text.replace(FENCE, ""), json: match[1] ?? null };
};

const isRec = (v: unknown): v is Rec =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const toProposal = (raw: unknown): SkillScriptProposal | null => {
  if (!isRec(raw) || typeof raw.content !== "string") {
    return null;
  }
  const perms = isRec(raw.permissions) ? raw.permissions : {};
  const network = perms.network === true;
  if (
    ABSOLUTE_PATH.test(raw.content) ||
    DANGEROUS.test(raw.content) ||
    (!network && NETWORK_TOOL.test(raw.content))
  ) {
    return null;
  }
  return {
    name: String(raw.name ?? ""),
    file: String(raw.file ?? ""),
    description: String(raw.description ?? "").slice(0, 300),
    params: (Array.isArray(raw.params) ? raw.params : [])
      .filter(isRec)
      .map((p) => ({
        name: String(p.name ?? ""),
        required: p.required === true,
        example: String(p.example ?? "").slice(0, 200),
      })),
    permissions: { write: perms.write === true, network },
    content: raw.content,
  };
};

export type ParsedScripts = {
  readonly proposals: readonly SkillScriptProposal[];
  readonly bundle: SkillBundle;
};

/**
 * Parse + validate the proposal (all or nothing): shape, caps, no binary or
 * secrets, no absolute or home paths, no network tools unless declared, and a
 * sha256 per script. Returns null so the skill ships without scripts.
 */
export const parseScriptProposals = (json: string): ParsedScripts | null => {
  try {
    const raw: unknown = JSON.parse(json);
    if (!Array.isArray(raw) || raw.length === 0) {
      return null;
    }
    const proposals = raw.map(toProposal);
    if (proposals.some((p) => p === null)) {
      return null;
    }
    const list = proposals as SkillScriptProposal[];
    const built = buildSkillBundle(list);
    return built.ok ? { proposals: list, bundle: built.bundle } : null;
  } catch {
    return null;
  }
};
