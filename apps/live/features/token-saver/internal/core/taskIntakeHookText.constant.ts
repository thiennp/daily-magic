/** Hook line prefix; the global CLAUDE.md block tells the agent to follow lines that start with it. */
export const TASK_INTAKE_HOOK_PREFIX = "AgentWitch · task intake";

/** A message is a candidate request only with at least this many words and characters. */
export const TASK_INTAKE_MIN_REQUEST_WORDS = 4;
export const TASK_INTAKE_MIN_REQUEST_CHARS = 20;

const TASK_RULES = [
  "First check whether an AgentWitch task already covers this request (list_project_tasks).",
  "If one does, mention it in one line and ask whether to work on it now.",
  "If none does and a task is needed, create one (create_project_task, one-line title), mention it in one line, then continue.",
  'For a request with several steps, split it into single-purpose subtasks (split_project_task) and attach the closest skill; for the cheapest effort run: agent-witch task-intake suggest --title "<subtask>" [--has-skill].',
  "If no task is needed, say nothing about tasks.",
];

/** Context for a valid project with no remembered choice. */
export const buildTaskIntakeAskText = (cwd: string): string =>
  [
    `${TASK_INTAKE_HOOK_PREFIX}: this folder is a linked AgentWitch project.`,
    "Only for a real request (not a question, greeting, acknowledgement or one-step edit): ask once per session whether to create AgentWitch tasks. Options: always no this session, always yes this session, ask for every new request this session.",
    `If the user explicitly picks always yes, ask exactly once: "Remember this for all future chats in this project?" Only after they answer yes, run: agent-witch task-intake remember --cwd "${cwd}" --answer "<their exact reply>"`,
    "Once they allow tasks:",
    ...TASK_RULES,
    "Never write this choice into a repo file.",
  ].join("\n");

/** Context for a valid project where the user already chose always-yes. */
export const buildTaskIntakeAutoText = (cwd: string): string =>
  [
    `${TASK_INTAKE_HOOK_PREFIX}: the user chose to always create tasks in this project. Do not ask again.`,
    "Only for a real request (not a question, greeting, acknowledgement or one-step edit):",
    ...TASK_RULES,
    `To stop remembering (only if the user asks): agent-witch task-intake forget --cwd "${cwd}"`,
  ].join("\n");

/** Thin global rule (CLAUDE.md block); the real logic lives in the hook and AWL. */
export const buildTaskIntakeGlobalInstructionLines = (): readonly string[] => [
  `AgentWitch task intake: when a hook line starts with "${TASK_INTAKE_HOOK_PREFIX}", follow it.`,
  "Never store the intake choice in a repo file; AgentWitch keeps it outside the repo.",
];

/** Thin rule for agents without the Claude hook (Codex AGENTS.md, Cursor rule). */
export const buildTaskIntakeStatusInstructionLines = (): readonly string[] => [
  `AgentWitch task intake: for each new real request in a project folder (not a question, greeting or one-step edit; at least ${TASK_INTAKE_MIN_REQUEST_WORDS} words), run: agent-witch task-intake status --cwd "<folder>" --prompt "<the request>" and follow its output. No output means do nothing about tasks.`,
  "Never store the intake choice in a repo file; AgentWitch keeps it outside the repo.",
];
