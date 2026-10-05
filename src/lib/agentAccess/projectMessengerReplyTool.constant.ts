import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const PROJECT_MESSENGER_REPLY_TOOL: AgentAccessToolDefinition = {
  name: "project_messenger_reply",
  description:
    'Reply in your project chat thread (shown to the owner and members as a chat bubble). Pass inReplyTo = the messageId you answer (owner, member, or Whole project message); the reply goes to that human, else to "Owner". kind: task.received (Got it) | task.processing | task.status (default) | task.done | task.blocked (say why). summary ≤200 chars including the id prefix. Same caps as project_dispatch. A reply after "No answer — blocked" is a new bubble; it does not reopen the message.',
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      summary: { type: "string" },
      kind: { type: "string" },
      inReplyTo: {
        type: "string",
        description: "messageId of the message you answer (optional).",
      },
    },
    required: ["projectId", "summary"],
    additionalProperties: false,
  },
};
