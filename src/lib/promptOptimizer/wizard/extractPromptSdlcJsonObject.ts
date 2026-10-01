import { readJsonObjects } from "@/lib/promptOptimizer/readJsonObjects";

import { normalizeWriterJsonCandidate } from "./normalizeWriterJsonCandidate";

const stripMarkdownFence = (raw: string): string => {
  const trimmed = raw.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  return fence?.[1]?.trim() ?? trimmed;
};

type EscapeNewlinesState = {
  readonly out: string;
  readonly inString: boolean;
  readonly escaped: boolean;
};

const escapeNewlineChar = (
  state: EscapeNewlinesState,
  char: string,
): EscapeNewlinesState => {
  if (state.inString) {
    if (state.escaped) {
      return {
        ...state,
        out: `${state.out}${char}`,
        escaped: false,
      };
    }
    if (char === "\\") {
      return { ...state, out: `${state.out}${char}`, escaped: true };
    }
    if (char === '"') {
      return {
        ...state,
        out: `${state.out}${char}`,
        inString: false,
      };
    }
    if (char === "\n") {
      return { ...state, out: `${state.out}\\n` };
    }
    if (char === "\r") {
      return state;
    }
    return { ...state, out: `${state.out}${char}` };
  }
  if (char === '"') {
    return {
      ...state,
      out: `${state.out}${char}`,
      inString: true,
    };
  }
  return { ...state, out: `${state.out}${char}` };
};

/** Writers often put raw line breaks inside JSON string values. */
const escapeNewlinesInJsonStrings = (raw: string): string =>
  [...raw].reduce(escapeNewlineChar, {
    out: "",
    inString: false,
    escaped: false,
  }).out;

const readLastJsonObject = (raw: string): unknown | null => {
  const objects = readJsonObjects(raw);
  if (objects.length === 0) {
    return null;
  }
  return objects[objects.length - 1];
};

const formatJsonExtractError = (cause: unknown): Error => {
  const detail =
    cause instanceof Error ? cause.message : "Invalid JSON in writer reply.";
  const friendly =
    /unterminated string/i.test(detail) ||
    /unexpected end of json/i.test(detail) ||
    /bad control character/i.test(detail)
      ? "The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON."
      : /Expected property name or '}'/i.test(detail) ||
          /Expected double-quoted property name/i.test(detail)
        ? "The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes."
        : "The writer reply was not valid JSON.";
  return new Error(`${friendly} (${detail})`);
};

/** Pulls the first complete JSON object from a writer reply. */
export const extractPromptSdlcJsonObject = (raw: string): unknown => {
  const candidate = normalizeWriterJsonCandidate(stripMarkdownFence(raw));
  const direct = readLastJsonObject(candidate);
  if (direct !== null) {
    return direct;
  }

  const repaired = escapeNewlinesInJsonStrings(candidate);
  const afterRepair = readLastJsonObject(repaired);
  if (afterRepair !== null) {
    return afterRepair;
  }

  const start = candidate.indexOf("{");
  if (start === -1) {
    throw new Error("No JSON object in reply.");
  }

  try {
    return JSON.parse(candidate.slice(start)) as unknown;
  } catch (error) {
    throw formatJsonExtractError(error);
  }
};
