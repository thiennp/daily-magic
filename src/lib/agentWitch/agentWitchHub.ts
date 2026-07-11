import isNonEmptyString from "./isNonEmptyString";
import isAgentWitchRole from "./isAgentWitchRole";
import type { AgentWitchRole } from "./types/AgentWitchRole.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

const isClaudeRunPayload = (
  payload: Readonly<Record<string, unknown>> | undefined,
): payload is { readonly prompt: string } =>
  payload !== undefined && isNonEmptyString(payload.prompt);

export interface AgentWitchHubStatus {
  readonly agentCount: number;
  readonly dashboardCount: number;
}

export interface AgentWitchHubClient {
  readonly id: string;
  readonly role: AgentWitchRole;
  readonly send: (message: AgentWitchMessage) => void;
}

export class AgentWitchHub {
  private readonly clients = new Map<string, AgentWitchHubClient>();

  registerClient(client: AgentWitchHubClient): void {
    this.clients.set(client.id, client);
  }

  unregisterClient(clientId: string): void {
    this.clients.delete(clientId);
  }

  getStatus(): AgentWitchHubStatus {
    const clients = [...this.clients.values()];
    return {
      agentCount: clients.filter((client) => client.role === "agent").length,
      dashboardCount: clients.filter((client) => client.role === "dashboard")
        .length,
    };
  }

  handleMessage(
    senderId: string,
    message: AgentWitchMessage,
  ): AgentWitchMessage | null {
    const sender = this.clients.get(senderId);

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER) {
      return {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          clientId: senderId,
          role: sender?.role ?? "dashboard",
        },
        requestId: message.requestId,
      };
    }

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT) {
      return {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        requestId: message.requestId,
      };
    }

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN) {
      if (sender?.role !== "dashboard") {
        return {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage:
              "Only dashboard clients can dispatch Claude commands.",
          },
          requestId: message.requestId,
        };
      }

      if (!isClaudeRunPayload(message.payload)) {
        return {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage: "command.claude.run requires payload.prompt.",
          },
          requestId: message.requestId,
        };
      }

      const agentClient = [...this.clients.values()].find(
        (client) => client.role === "agent",
      );

      if (agentClient === undefined) {
        return {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage: "No local agent is connected.",
          },
          requestId: message.requestId,
        };
      }

      agentClient.send({
        type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
        payload: {
          prompt: message.payload.prompt,
        },
        requestId: message.requestId,
      });

      return {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: true,
          agentClientId: agentClient.id,
        },
        requestId: message.requestId,
      };
    }

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT) {
      if (sender?.role !== "agent") {
        return {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage: "Only agent clients can publish Claude results.",
          },
          requestId: message.requestId,
        };
      }

      this.broadcastToRole("dashboard", message);
      return {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        requestId: message.requestId,
      };
    }

    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: `Unsupported message type: ${message.type}`,
      },
      requestId: message.requestId,
    };
  }

  resolveRoleFromRegisterPayload(
    payload: Readonly<Record<string, unknown>> | undefined,
  ): AgentWitchRole | null {
    if (payload === undefined) {
      return null;
    }

    const role = payload.role;
    if (isAgentWitchRole(role)) {
      return role;
    }

    return null;
  }

  broadcastToRole(role: AgentWitchRole, message: AgentWitchMessage): void {
    [...this.clients.values()]
      .filter((client) => client.role === role)
      .forEach((client) => {
        client.send(message);
      });
  }
}
