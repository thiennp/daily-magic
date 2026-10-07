export const PROJECT_GROK_ROUTINE_WAKE_EVENT = "project_message.stored";

export type ProjectGrokRoutineWakeBodyInput = {
  readonly projectId: string;
  readonly projectName: string | null;
  readonly messageId: string;
  readonly summary: string;
  readonly fromMembershipId: string | null;
  readonly fromProjectDisplayName: string | null;
};

/**
 * Grok routine wake POST body — scoped to ONE project + ONE triggering message.
 * Whitelist only: current projectId, project name, triggering messageId + body
 * (summary), and that message's sender. Never add other projects' status,
 * tips, briefing, or any cross-project content here.
 */
export const buildProjectGrokRoutineWakeBody = (
  input: ProjectGrokRoutineWakeBodyInput,
): string =>
  JSON.stringify({
    projectId: input.projectId,
    projectName: input.projectName,
    messageId: input.messageId,
    event: PROJECT_GROK_ROUTINE_WAKE_EVENT,
    body: input.summary,
    summary: input.summary,
    fromMembershipId: input.fromMembershipId,
    fromProjectDisplayName: input.fromProjectDisplayName,
  });
