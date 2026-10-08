import { computeSkillScriptSha256 } from "./computeSkillScriptSha256";
import type { SkillBundle, SkillScriptEntry } from "./skillBundle.type";
import { splitSkillBundle } from "./skillBundleCodec";
import {
  parseSkillBundleJson,
  validateSkillBundle,
} from "./validateSkillBundle";

export type SkillBodyBundle = {
  readonly markdown: string;
  /** Verified bundle, or null when none / invalid. */
  readonly bundle: SkillBundle | null;
  /** Why an embedded bundle was rejected (null when none or valid). */
  readonly error: string | null;
};

/** Split a stored skill body into SKILL.md and its verified script bundle. */
export const readSkillBundleFromBody = (body: string): SkillBodyBundle => {
  const { markdown, bundleJson } = splitSkillBundle(body);
  if (bundleJson === null) {
    return { markdown, bundle: null, error: null };
  }
  const parsed = parseSkillBundleJson(bundleJson);
  return parsed.ok
    ? { markdown, bundle: parsed.bundle, error: null }
    : { markdown, bundle: null, error: parsed.reason };
};

export type SkillScriptProposal = Omit<SkillScriptEntry, "sha256"> & {
  readonly content: string;
};

/** Hash each proposed script and validate the resulting bundle. */
export const buildSkillBundle = (
  proposals: readonly SkillScriptProposal[],
): ReturnType<typeof validateSkillBundle> =>
  validateSkillBundle({
    manifest: {
      scripts: proposals.map(({ content, ...entry }) => ({
        ...entry,
        sha256: computeSkillScriptSha256(content),
      })),
    },
    files: Object.fromEntries(proposals.map((p) => [p.file, p.content])),
  });
