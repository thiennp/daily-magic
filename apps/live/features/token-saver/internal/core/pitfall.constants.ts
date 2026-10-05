export {
  PITFALL_AVOIDANCE_MAX_CHARS,
  PITFALL_CAUSE_MAX_CHARS,
  PITFALL_MATCH_MAX_LINES,
  PITFALL_MATCH_MAX_TOKENS,
  PITFALL_MAX_ACTIVE_PER_PROJECT,
  PITFALL_SCHEMA_VERSION,
  PITFALL_SYMPTOM_MAX_CHARS,
  TOKEN_SAVER_DB_FILE_NAME,
} from "../../public-api/types";

/** Approximate tokens from UTF-16 length (chars/4), enough for the bot payload cap. */
export const estimateTokenCount = (text: string): number =>
  Math.ceil(text.length / 4);
