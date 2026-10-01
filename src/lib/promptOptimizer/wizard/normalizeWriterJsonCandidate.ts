import { convertSingleQuotedJsonStrings } from "./convertSingleQuotedJsonStrings";
import { removeJsonTrailingCommas } from "./removeJsonTrailingCommas";

const stripUtf8Bom = (raw: string): string =>
  raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;

/** Writers sometimes prefix the object with a literal "json" label. */
const stripOptionalJsonLabel = (raw: string): string => {
  const trimmed = raw.trim();
  const label = trimmed.match(/^json\s*([\s\S]*)$/i);
  return label?.[1]?.trim() ?? trimmed;
};

/** Repairs common non-JSON writer shapes before brace-aware extraction. */
export const normalizeWriterJsonCandidate = (raw: string): string =>
  removeJsonTrailingCommas(
    convertSingleQuotedJsonStrings(stripOptionalJsonLabel(stripUtf8Bom(raw))),
  );
