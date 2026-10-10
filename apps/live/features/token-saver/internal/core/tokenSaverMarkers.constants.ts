/** Marker key for all token-saver CLI merges (idempotent upsert). */
export const TOKEN_SAVER_MARKER = "agent-witch-token-saver";

export const MARKER_BEGIN = `# BEGIN ${TOKEN_SAVER_MARKER}`;
export const MARKER_END = `# END ${TOKEN_SAVER_MARKER}`;
export const KNOWLEDGE_MARKER_BEGIN = `# BEGIN ${TOKEN_SAVER_MARKER}-knowledge`;
export const KNOWLEDGE_MARKER_END = `# END ${TOKEN_SAVER_MARKER}-knowledge`;
export const HTML_MARKER_BEGIN = `<!-- BEGIN ${TOKEN_SAVER_MARKER} -->`;
export const HTML_MARKER_END = `<!-- END ${TOKEN_SAVER_MARKER} -->`;

export const CURSOR_PROJECT_RULE_RELATIVE =
  ".cursor/rules/agent-witch-check-context.mdc";
export const CURSOR_GLOBAL_KNOWLEDGE_RULE_RELATIVE =
  ".cursor/rules/agent-witch-knowledge-report.mdc";
export const CURSOR_GLOBAL_MCP_RELATIVE = ".cursor/mcp.json";
export const CODEX_GLOBAL_CONFIG_RELATIVE = ".codex/config.toml";
export const CODEX_GLOBAL_AGENTS_RELATIVE = ".codex/AGENTS.md";
export const CLAUDE_GLOBAL_SETTINGS_RELATIVE = ".claude/settings.json";
export const CLAUDE_GLOBAL_CLAUDE_MD_RELATIVE = ".claude/CLAUDE.md";
export const PROJECT_REPO_AGENTS_MD = "AGENTS.md";
export const PROJECT_REPO_CLAUDE_MD = "CLAUDE.md";
export const DECLINED_PROJECTS_FILE_NAME = "declined-projects.json";
export const MCP_SERVER_NAME = "agent-witch";
export const MCP_STDIO_COMMAND = "agent-witch";
export const MCP_STDIO_ARGS = ["mcp"] as const;
/** `agent-witch <subcommand> <hook>` — dispatched in `scripts/agentWitchAppEntry.ts`. */
export const CHECK_CONTEXT_HOOK_SUBCOMMAND = "mcp-hook";
export const CHECK_CONTEXT_HOOK_NAME = "check_context";
export const CLAUDE_HOOK_COMMAND = `${MCP_STDIO_COMMAND} ${CHECK_CONTEXT_HOOK_SUBCOMMAND} ${CHECK_CONTEXT_HOOK_NAME}`;
export const TASK_INTAKE_MARKER_BEGIN = `# BEGIN ${TOKEN_SAVER_MARKER}-task-intake`;
export const TASK_INTAKE_MARKER_END = `# END ${TOKEN_SAVER_MARKER}-task-intake`;
export const TASK_INTAKE_PREFS_FILE_NAME = "task-intake-prefs.json";
export const TASK_INTAKE_CLI_SUBCOMMAND = "task-intake";
export const CURSOR_GLOBAL_TASK_INTAKE_RULE_RELATIVE =
  ".cursor/rules/agent-witch-task-intake.mdc";
