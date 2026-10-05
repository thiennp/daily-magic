export {
  PITFALL_AVOIDANCE_MAX_CHARS,
  PITFALL_CAUSE_MAX_CHARS,
  PITFALL_MAX_ACTIVE_PER_PROJECT,
  PITFALL_SCHEMA_VERSION,
  PITFALL_SYMPTOM_MAX_CHARS,
  TOKEN_SAVER_DB_FILE_NAME,
} from "../../public-api/types";

/** SQLite busy_timeout for the pitfall DB (ms) so short write locks wait instead of failing. */
export const PITFALL_DB_BUSY_TIMEOUT_MS = 3000;
