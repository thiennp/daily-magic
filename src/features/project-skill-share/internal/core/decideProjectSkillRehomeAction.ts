import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";

export type ProjectSkillRehomeAction =
  "verified" | "upload_from_local" | "local_diverged" | "missing";

/**
 * Before History purges local mirrors: AWC must hold the published body whose
 * hash equals the expected contentHash. Restore from the local mirror only
 * when it carries exactly those bytes; never overwrite an intact AWC body.
 */
export const decideProjectSkillRehomeAction = (input: {
  readonly expectedHash: string;
  readonly awcBody: string | null;
  readonly local: {
    readonly body: string;
    readonly contentHash: string;
  } | null;
}): ProjectSkillRehomeAction => {
  const awcIntact =
    input.awcBody !== null &&
    computeProjectSkillContentHash(input.awcBody) === input.expectedHash;
  if (awcIntact) {
    return input.local === null ||
      input.local.contentHash === input.expectedHash
      ? "verified"
      : "local_diverged";
  }
  const localRestores =
    input.local !== null &&
    input.local.contentHash === input.expectedHash &&
    computeProjectSkillContentHash(input.local.body) === input.expectedHash;
  return localRestores ? "upload_from_local" : "missing";
};
