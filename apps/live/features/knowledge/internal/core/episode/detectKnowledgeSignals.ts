import {
  EPISODE_REQUEST_MAX_CHARS,
  EPISODE_TAKEAWAY_MAX_CHARS,
} from "./episode.types";

const CORRECTION_WINDOW_CHARS = 160;
const CORRECTION_MAX_MESSAGE_CHARS = 400;

const CORRECTION_PHRASES = [
  "không phải",
  "ko phải",
  "không đúng",
  "chưa đúng",
  "sai rồi",
  "làm sai",
  "không như vậy",
  "không ý này",
  "hoàn tác",
  "revert",
  "undo",
  "redo",
  "try again",
  "that's not",
  "that is not",
  "not what i",
  "wrong",
  "incorrect",
  "you broke",
  "you missed",
] as const;

const VERIFY_FAILURE_PATTERNS: readonly RegExp[] = [
  /^\s*(?:FAIL|✗|×)\s/,
  /error TS\d+:/,
  /\b\d+\s+(?:tests?|specs?)\s+failed\b/i,
  /Test Files\s+\d+\s+failed/,
  /npm ERR!/,
  /\b\d+\s+errors?\b.*\b(?:eslint|lint)\b|\b(?:eslint|lint)\b.*\b\d+\s+errors?\b/i,
  /AssertionError/,
  /Traceback \(most recent call last\)/,
  /^panic:/,
];

const ERROR_LINE_PATTERN =
  /error|exception|failed|fatal|cannot|denied|not found|ENOENT|EACCES/i;

const REVERT_SUBJECT_PATTERN = /^Revert\s+"/;
const REVERTED_SHA_PATTERN = /This reverts commit ([0-9a-f]{7,40})/;

const collapse = (text: string): string => text.replace(/\s+/g, " ").trim();

const clip = (text: string, max: number): string =>
  text.length <= max ? text : `${text.slice(0, max - 1)}…`;

/** User message that pushes back on the previous result (rules only). */
export const isUserCorrection = (message: string): boolean => {
  const text = message.trim().toLowerCase();
  if (text.length === 0 || text.length > CORRECTION_MAX_MESSAGE_CHARS) {
    return false;
  }
  const head = text.slice(0, CORRECTION_WINDOW_CHARS);
  return CORRECTION_PHRASES.some((phrase) => head.includes(phrase));
};

/** First line of successful-run output that shows a red check, if any. */
export const findVerifyFailureLine = (output: string): string | null => {
  for (const line of output.split("\n")) {
    if (VERIFY_FAILURE_PATTERNS.some((pattern) => pattern.test(line))) {
      return clip(collapse(line), 160);
    }
  }
  return null;
};

export const findFirstErrorLine = (output: string): string => {
  const lines = output
    .split("\n")
    .map(collapse)
    .filter((line) => line.length > 0);
  return clip(
    lines.find((line) => ERROR_LINE_PATTERN.test(line)) ?? lines[0] ?? "",
    160,
  );
};

export const normalizeKnowledgeRequest = (prompt: string): string =>
  clip(collapse(prompt), EPISODE_REQUEST_MAX_CHARS);

export const deriveMistakeTakeaway = (input: {
  readonly request: string;
  readonly evidence: string;
}): string =>
  clip(
    `Asked "${clip(input.request, 80)}": hit "${clip(input.evidence, 140)}". Check this before repeating.`,
    EPISODE_TAKEAWAY_MAX_CHARS,
  );

export const deriveCorrectionTakeaway = (input: {
  readonly request: string;
  readonly correction: string;
}): string =>
  clip(
    `User corrected the result of "${clip(input.request, 80)}": "${clip(collapse(input.correction), 160)}"`,
    EPISODE_TAKEAWAY_MAX_CHARS,
  );

export const deriveFixTakeaway = (input: {
  readonly request: string;
  readonly commitSubject: string | null;
  readonly fileCount: number;
}): string =>
  clip(
    `Did "${clip(input.request, 80)}": ${input.commitSubject ?? `changed ${input.fileCount} file(s), not committed`}`,
    EPISODE_TAKEAWAY_MAX_CHARS,
  );

export const isRevertSubject = (subject: string): boolean =>
  REVERT_SUBJECT_PATTERN.test(subject);

export const parseRevertedSha = (commitBody: string): string | null =>
  REVERTED_SHA_PATTERN.exec(commitBody)?.[1] ?? null;
