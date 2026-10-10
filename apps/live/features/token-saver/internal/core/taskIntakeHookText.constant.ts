/** Hook line prefix; the global CLAUDE.md block tells the agent to follow lines that start with it. */
export const TASK_INTAKE_HOOK_PREFIX = "AgentWitch · task intake";

/** Context for a valid project with no remembered choice. */
export const buildTaskIntakeAskText = (cwd: string): string =>
  [
    `${TASK_INTAKE_HOOK_PREFIX}: this folder is a linked AgentWitch project.`,
    "Skip this for questions and one-step edits. For any other new request, ask once per session whether to create an AgentWitch task first, unless already answered this session. Options: always no this session, always yes this session, ask for every new request this session.",
    `If the user picks always yes, ask exactly once: "Remember this for all future chats in this project?" If yes, run: agent-witch task-intake remember --cwd "${cwd}"`,
    "Never write this choice into a repo file.",
  ].join("\n");

/** Context for a valid project where the user already chose always-yes. */
export const buildTaskIntakeAutoText = (cwd: string): string =>
  [
    `${TASK_INTAKE_HOOK_PREFIX}: the user chose to always create a task in this project.`,
    "For a new non-trivial request, create the AgentWitch task without asking, then continue.",
    `To stop remembering (only if the user asks): agent-witch task-intake forget --cwd "${cwd}"`,
  ].join("\n");

/** Thin global rule (CLAUDE.md block); the real logic lives in the hook and AWL. */
export const buildTaskIntakeGlobalInstructionLines = (): readonly string[] => [
  `AgentWitch task intake: when a hook line starts with "${TASK_INTAKE_HOOK_PREFIX}", follow it.`,
  "Never store the intake choice in a repo file; AgentWitch keeps it outside the repo.",
];
