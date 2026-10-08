/** Skill script bundle (auto-skill plan, phase 3). Travels inside the skill body. */

export type SkillScriptParam = {
  readonly name: string;
  readonly required: boolean;
  readonly example: string;
};

export type SkillScriptPermissions = {
  /** May write files (always confined to the project folder). */
  readonly write: boolean;
  /** Declared to use the network; false runs with proxy env stripped. */
  readonly network: boolean;
};

export type SkillScriptEntry = {
  readonly name: string;
  /** Flat file name inside the skill's `scripts/` directory. */
  readonly file: string;
  readonly description: string;
  readonly params: readonly SkillScriptParam[];
  readonly permissions: SkillScriptPermissions;
  readonly sha256: string;
  readonly timeoutSec?: number;
};

export type SkillManifest = { readonly scripts: readonly SkillScriptEntry[] };

/** Manifest plus the script files (`file` name to UTF-8 text). */
export type SkillBundle = {
  readonly manifest: SkillManifest;
  readonly files: Readonly<Record<string, string>>;
};

export type SkillBundleResult =
  | { readonly ok: true; readonly bundle: SkillBundle }
  | { readonly ok: false; readonly reason: string };
