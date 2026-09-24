export const AGENT_WITCH_PROFILE_PROJECTS_DIR_NAME = "projects";

export const AGENT_WITCH_PROFILE_KNOWLEDGE_DIR_NAME = "knowledge";

export const AGENT_WITCH_PROFILE_KNOWLEDGE_CHUNKS_FILE_NAME = "chunks.ndjson";

export const AGENT_WITCH_PROFILE_KNOWLEDGE_LESSONS_FILE_NAME = "lessons.ndjson";

export const AGENT_WITCH_PROFILE_KNOWLEDGE_ERROR_CHUNKS_FILE_NAME =
  "error-chunks.ndjson";

export const AGENT_WITCH_PROFILE_KNOWLEDGE_USAGE_STATS_FILE_NAME =
  "usage-stats.json";

export const AGENT_WITCH_REPO_KNOWLEDGE_POINTER_FILE_NAME =
  "knowledge-location.json";

/** Soft cap per project — oldest chunks dropped after indexing. */
export const AGENT_WITCH_PROJECT_RAG_CHUNK_CEILING = 500;

/** Suggest materializing a tool when a chunk is retrieved this many times without a linked tool. */
export const AGENT_WITCH_RAG_TOOL_SUGGESTION_RETRIEVAL_THRESHOLD = 10;

/** Suggest a tool (priority 1) or rule (priority 2) after this many similar failures. */
export const AGENT_WITCH_ERROR_TOOL_SUGGESTION_THRESHOLD = 3;
