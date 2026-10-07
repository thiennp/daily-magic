import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Server-local store for full agent-run prompts (Neon holds meta ≤120 only).
 * Prefer AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR; else ~/.agent-witch/agent-run-prompts
 * (same home layout as Mac project-computer reports under ~/.agent-witch/).
 * Neon must never be re-expanded from this store.
 */
export const AGENT_RUN_LOCAL_PROMPTS_DIR_NAME = "agent-run-prompts";

const isSafeAgentRunId = (agentRunId: string): boolean =>
  /^[A-Za-z0-9_-]+$/.test(agentRunId) && agentRunId.length > 0;

export const resolveAgentRunLocalPromptsDir = (): string => {
  const fromEnv = process.env.AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR?.trim();
  if (fromEnv !== undefined && fromEnv.length > 0) {
    return fromEnv;
  }
  return path.join(os.homedir(), ".agent-witch", AGENT_RUN_LOCAL_PROMPTS_DIR_NAME);
};

const resolvePromptPath = (agentRunId: string): string | null => {
  if (!isSafeAgentRunId(agentRunId)) {
    return null;
  }
  return path.join(resolveAgentRunLocalPromptsDir(), `${agentRunId}.txt`);
};

/** Write full prompt at create time. No-op for unsafe ids. */
export const putAgentRunLocalPrompt = (
  agentRunId: string,
  fullPrompt: string,
): void => {
  const promptPath = resolvePromptPath(agentRunId);
  if (promptPath === null) {
    return;
  }
  fs.mkdirSync(path.dirname(promptPath), { recursive: true });
  fs.writeFileSync(promptPath, fullPrompt, { encoding: "utf8", mode: 0o600 });
};

/** Read full prompt for pending_approval hydrate. Null if missing/unreadable. */
export const getAgentRunLocalPrompt = (
  agentRunId: string,
): string | null => {
  const promptPath = resolvePromptPath(agentRunId);
  if (promptPath === null || !fs.existsSync(promptPath)) {
    return null;
  }
  try {
    return fs.readFileSync(promptPath, "utf8");
  } catch {
    return null;
  }
};

/** Drop local body after terminal status (optional hygiene). */
export const deleteAgentRunLocalPrompt = (agentRunId: string): void => {
  const promptPath = resolvePromptPath(agentRunId);
  if (promptPath === null || !fs.existsSync(promptPath)) {
    return;
  }
  try {
    fs.unlinkSync(promptPath);
  } catch {
    // best-effort
  }
};

/** Prefer local full prompt; fall back to Neon meta (capped) text. */
export const resolveAgentRunPromptForHydrate = (
  agentRunId: string,
  neonPrompt: string,
): string => getAgentRunLocalPrompt(agentRunId) ?? neonPrompt;
