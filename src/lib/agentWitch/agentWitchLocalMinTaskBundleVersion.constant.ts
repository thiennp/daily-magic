/**
 * Minimum AgentWitch Local install bundle that may take project tasks on a
 * computer membership seat. Owned by AW Mac; Dispatch reuses this for the
 * assignability gate. Bump independently of the Connect floor when a
 * project-task-specific AWL handler lands.
 *
 * 267 = S0 local CLI safety (workspace-write flags, session limits). Older
 * installs still run CLIs with danger flags and no time limit, so they must
 * not receive project tasks.
 */
export const AGENT_WITCH_LOCAL_MIN_TASK_BUNDLE_VERSION = "267";
