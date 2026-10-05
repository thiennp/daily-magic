import type {
  PreflightCheckResult,
  PreflightEvidence,
  PreflightRunResult,
} from "./PreflightResult.type";
import { PREFLIGHT_FAILURE_COPY } from "./preflightFailureCopy.constant";
import { PREFLIGHT_RERUN_HINT } from "./preflightAction.constant";
import {
  sanitizePreflightText,
  toSafePreflightEvidence,
} from "./toSafePreflightEvidence";

/** Display-time: NRG sanitize plus common bare token shapes (sk_/ghp_/xox…). */
const TOKENISH =
  /\b(?:sk|ghp|github_pat|xox[baprs]|AIza)[_-][A-Za-z0-9\-_.=]{8,}\b/g;

export const sanitizePreflightDisplayText = (value: string): string =>
  sanitizePreflightText(value).replace(TOKENISH, "[redacted]");

export type PreflightFailureFacts = {
  readonly reason: string;
  /** Stable id + short name from the payload (open set — never catalog-mapped). */
  readonly check: string;
  readonly checkId: string;
  readonly checkName: string;
  readonly fix: string;
  readonly rerunHint: string;
  readonly evidenceLines: readonly string[];
  /** True when checkId starts with `pit.` (active block pitfall). */
  readonly fromPitfall: boolean;
  readonly status: PreflightCheckResult["status"];
};

export type PreflightFailurePresentation = {
  /**
   * `blocked` — primary is block (hard).
   * `errored_check` — primary is errored (Couldn't check).
   * `warned` — warn-only run; soft continue path, no red block chrome.
   */
  readonly mode: "blocked" | "errored_check" | "warned";
  readonly primary: PreflightFailureFacts;
  /** Warn rows shown as softer notes under the primary (never the lead). */
  readonly warnNotes: readonly PreflightFailureFacts[];
};

/**
 * Primary lead: first `block`, else first `errored`. Warn never leads.
 */
export const pickPrimaryPreflightFailure = (
  result: PreflightRunResult,
): PreflightCheckResult | null => {
  const block = result.results.find((row) => row.status === "block");
  if (block !== undefined) {
    return block;
  }
  const errored = result.results.find((row) => row.status === "errored");
  return errored ?? null;
};

export const listPreflightWarnChecks = (
  result: PreflightRunResult,
): readonly PreflightCheckResult[] =>
  result.results.filter((row) => row.status === "warn");

const formatEvidenceLine = (item: PreflightEvidence): string => {
  const summary = sanitizePreflightDisplayText(item.summary).trim();
  const fingerprint =
    typeof item.fingerprint === "string" && item.fingerprint.trim().length > 0
      ? item.fingerprint.trim()
      : null;
  if (summary.length === 0 && fingerprint === null) {
    return "";
  }
  if (fingerprint === null) {
    return summary;
  }
  if (summary.length === 0) {
    return `fingerprint ${fingerprint}`;
  }
  return `${summary} · fingerprint ${fingerprint}`;
};

/**
 * Renders name/reason/fix/rerunHint straight from the payload (open check
 * id set). Errored checks use "Couldn't check: <name>" — never "failed".
 */
export const formatPreflightFailureFacts = (
  check: PreflightCheckResult,
): PreflightFailureFacts => {
  const name = sanitizePreflightDisplayText(check.name.trim() || check.checkId);
  const checkId = check.checkId.trim();
  const fromPitfall = checkId.startsWith("pit.");

  const reason =
    check.status === "errored"
      ? (() => {
          const detail = check.reason.trim();
          return detail.length > 0
            ? `${PREFLIGHT_FAILURE_COPY.couldntCheck}: ${name} — ${sanitizePreflightDisplayText(detail)}`
            : `${PREFLIGHT_FAILURE_COPY.couldntCheck}: ${name}`;
        })()
      : (() => {
          const reasonRaw = check.reason.trim();
          return reasonRaw.length > 0
            ? sanitizePreflightDisplayText(reasonRaw)
            : PREFLIGHT_FAILURE_COPY.secretSafeFallback;
        })();

  const fixRaw = check.fix.trim();
  const fix =
    fixRaw.length > 0
      ? sanitizePreflightDisplayText(fixRaw)
      : "Fix the problem on this Mac, then run preflight again.";
  const rerunRaw = check.rerunHint.trim();
  const rerunHint =
    rerunRaw.length > 0
      ? sanitizePreflightDisplayText(rerunRaw)
      : PREFLIGHT_RERUN_HINT;

  const safeEvidence = toSafePreflightEvidence(check.evidence);
  return {
    reason,
    check: `${checkId} · ${name}`,
    checkId,
    checkName: name,
    fix,
    rerunHint,
    evidenceLines: safeEvidence
      .map(formatEvidenceLine)
      .filter((line) => line.length > 0),
    fromPitfall,
    status: check.status,
  };
};

/**
 * Full presentation for a run: primary (block|errored) plus warn notes, or
 * warn-only mode when there is no block/errored primary.
 */
export const formatPreflightFailurePresentation = (
  result: PreflightRunResult,
): PreflightFailurePresentation | null => {
  const primaryCheck = pickPrimaryPreflightFailure(result);
  const warnChecks = listPreflightWarnChecks(result);

  if (primaryCheck !== null) {
    return {
      mode: primaryCheck.status === "errored" ? "errored_check" : "blocked",
      primary: formatPreflightFailureFacts(primaryCheck),
      warnNotes: warnChecks.map(formatPreflightFailureFacts),
    };
  }

  if (warnChecks.length === 0) {
    return null;
  }

  return {
    mode: "warned",
    primary: formatPreflightFailureFacts(warnChecks[0]!),
    warnNotes: warnChecks.slice(1).map(formatPreflightFailureFacts),
  };
};

/** @deprecated Prefer formatPreflightFailurePresentation — kept for call sites. */
export const formatPreflightFailureFactsFromRun = (
  result: PreflightRunResult,
): PreflightFailureFacts | null =>
  formatPreflightFailurePresentation(result)?.primary ?? null;
