import {
  OUTBOUND_RESIDUAL_SECRET_PATTERNS,
  OUTBOUND_SECRET_RULES,
} from "./outboundSecretPatterns.constant";

export interface ScrubOutboundSecretsResult {
  readonly scrubbed: string;
  /** True when a high-confidence secret shape is still present. */
  readonly residualSecret: boolean;
  readonly replacementCount: number;
}

/** True when text still looks like it carries a secret. */
export const hasResidualOutboundSecret = (text: string): boolean =>
  OUTBOUND_RESIDUAL_SECRET_PATTERNS.some((pattern) => pattern.test(text));

/**
 * S0-8 pure scrub: replace secret-shaped substrings. Run before anything
 * leaves the computer (stream, result, report) or is kept as memory.
 */
export const scrubOutboundSecrets = (
  text: string,
): ScrubOutboundSecretsResult => {
  const counter = { replacements: 0 };
  const scrubbed = OUTBOUND_SECRET_RULES.reduce(
    (current, rule) =>
      current.replace(rule.pattern, (...args: unknown[]) => {
        counter.replacements += 1;
        const groups = args.slice(1, -2).map((value) =>
          typeof value === "string" ? value : "",
        );
        return rule.replacement.replace(
          /\$(\d)/g,
          (_match, index: string) => groups[Number(index) - 1] ?? "",
        );
      }),
    text,
  );
  return {
    scrubbed,
    residualSecret: hasResidualOutboundSecret(scrubbed),
    replacementCount: counter.replacements,
  };
};

/**
 * Text safe to send: scrubbed, or the hidden notice when a secret shape
 * survives scrubbing (Product copy `s0.secret.hidden`).
 */
export const toOutboundRunText = (
  text: string,
  hiddenNotice: string,
): string => {
  const result = scrubOutboundSecrets(text);
  return result.residualSecret ? hiddenNotice : result.scrubbed;
};
