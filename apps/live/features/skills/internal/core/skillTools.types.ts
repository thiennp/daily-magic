import type { SkillEmbedder, SkillIndexDb } from "./skillIndex.types";
import type { SkillRerankCompleter } from "./skillRerank";

/** Everything the tool handlers need; injected so tests need no disk or Ollama. */
export type SkillToolDeps = {
  /** null when SQLite is unavailable: tools answer "unavailable". */
  readonly openDb: () => SkillIndexDb | null;
  /** Project of a working directory (null: not a linked project). */
  readonly resolveProjectId: (cwd: string) => string | null;
  /** `<profileDir>/project-data`. */
  readonly projectDataDir: string;
  readonly embed?: SkillEmbedder;
  readonly rerank?: SkillRerankCompleter;
  /** The run this MCP process serves, when the host exports it. */
  readonly runId?: string | null;
  /** Coding-tools pause switch (S0-7a); scripts refuse while paused. */
  readonly isPaused?: () => boolean;
  /** Fallback cwd for stdio servers started inside the project. */
  readonly defaultCwd?: () => string;
};
