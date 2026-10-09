import {
  hasResidualOutboundSecret,
  scrubOutboundSecrets,
} from "@agent-witch/shared/dispatch";

import { scrubProjectHistorySkillgenIdentifiers } from "./scrubProjectHistorySkillgenIdentifiers";

export type ScrubProjectHistorySkillgenSecretsResult = {
  readonly scrubbed: string;
  /** True when a high-confidence secret pattern remains after replacements. */
  readonly residualSecret: boolean;
  readonly replacementCount: number;
};

const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * Step 5 — local regex secret/PII scrub. Must run before any LLM call.
 * Secret rules are the shared S0-8 set (`scrubOutboundSecrets`); skillgen
 * also strips emails. residualSecret → QUARANTINED (never reach LLM).
 */
export const scrubProjectHistorySkillgenSecrets = (
  text: string,
): ScrubProjectHistorySkillgenSecretsResult => {
  const secrets = scrubOutboundSecrets(text);
  const emailCount = secrets.scrubbed.match(EMAIL_PATTERN)?.length ?? 0;
  const scrubbed = secrets.scrubbed.replace(EMAIL_PATTERN, "[redacted-email]");
  return {
    scrubbed,
    residualSecret: hasResidualOutboundSecret(scrubbed),
    replacementCount: secrets.replacementCount + emailCount,
  };
};

/** True when scrubbed text still looks like it contains a secret. */
export const projectHistorySkillgenTextHasResidualSecret = (
  text: string,
): boolean => hasResidualOutboundSecret(text);

/**
 * Transcript for the owner LLM: secrets and emails scrubbed, then one-off
 * identifiers (tickets, PRs, hashes, urls, paths, ids and `knownNames`, the
 * senders/recipients of the chat) replaced by placeholders so the draft
 * stays reusable.
 */
export const scrubProjectHistorySkillgenTranscript = (
  text: string,
  knownNames: readonly string[] = [],
): ScrubProjectHistorySkillgenSecretsResult => {
  const secrets = scrubProjectHistorySkillgenSecrets(text);
  return {
    ...secrets,
    scrubbed: scrubProjectHistorySkillgenIdentifiers(
      secrets.scrubbed,
      knownNames,
    ),
  };
};
