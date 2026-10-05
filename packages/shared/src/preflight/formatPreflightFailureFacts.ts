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
  /** Stable id + short name, e.g. `pf.writer-login · Writer signed in`. */
  readonly check: string;
  readonly checkId: string;
  readonly checkName: string;
  readonly fix: string;
  readonly rerunHint: string;
  readonly evidenceLines: readonly string[];
};

const isFailureStatus = (status: PreflightCheckResult["status"]): boolean =>
  status === "block" || status === "warn" || status === "errored";

/**
 * Primary failure row: first block, else first errored, else first warn.
 * Returns null when nothing failed.
 */
export const pickPrimaryPreflightFailure = (
  result: PreflightRunResult,
): PreflightCheckResult | null => {
  const block = result.results.find((row) => row.status === "block");
  if (block !== undefined) {
    return block;
  }
  const errored = result.results.find((row) => row.status === "errored");
  if (errored !== undefined) {
    return errored;
  }
  const warn = result.results.find((row) => row.status === "warn");
  return warn ?? null;
};

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
 * Turns a blocked/warn/errored check into the four facts (reason, check, fix,
 * rerun) plus optional safe evidence lines for Details.
 */
export const formatPreflightFailureFacts = (
  check: PreflightCheckResult,
): PreflightFailureFacts => {
  const reasonRaw = check.reason.trim();
  const reason =
    reasonRaw.length > 0
      ? sanitizePreflightDisplayText(reasonRaw)
      : check.status === "errored"
        ? `${PREFLIGHT_FAILURE_COPY.erroredPrefix} check failed`
        : PREFLIGHT_FAILURE_COPY.secretSafeFallback;

  const name = sanitizePreflightDisplayText(check.name.trim() || check.checkId);
  const checkId = check.checkId.trim();
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
  };
};

export const formatPreflightFailureFactsFromRun = (
  result: PreflightRunResult,
): PreflightFailureFacts | null => {
  const primary = pickPrimaryPreflightFailure(result);
  if (primary === null || !isFailureStatus(primary.status)) {
    return null;
  }
  return formatPreflightFailureFacts(primary);
};
