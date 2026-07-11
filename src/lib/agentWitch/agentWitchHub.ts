import isHarnessRequestPayload from "./harness/isHarnessRequestPayload";
import isNonEmptyString from "./isNonEmptyString";
import isAgentWitchRole from "./isAgentWitchRole";
import type { AgentWitchRole } from "./types/AgentWitchRole.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

const isClaudeRunPayload = (
  payload: Readonly<Record<string, unknown>> | undefined,
): payload is { readonly prompt: string } =>
  payload !== undefined && isNonEmptyString(payload.prompt);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export interface AgentWitchHubStatus {
  readonly agentCount: number;
  readonly dashboardCount: number;
}

export interface AgentWitchConnectedClient {
  readonly id: string;
  readonly role: AgentWitchRole;
  readonly connectedAt: string;
}

export interface AgentWitchHarnessManifestReport {
  readonly agentClientId: string;
  readonly hostname: string;
  readonly manifest: Readonly<Record<string, unknown>>;
  readonly reportedAt: string;
}

export interface AgentWitchHubClient {
  readonly id: string;
  readonly role: AgentWitchRole;
  readonly send: (message: AgentWitchMessage) => void;
}

export class AgentWitchHub {
  private readonly clients = new Map<string, AgentWitchHubClient>();
  private readonly connectedAtByClientId = new Map<string, number>();
  private readonly manifestByAgentClientId = new Map<
    string,
    AgentWitchHarnessManifestReport
  >();

  registerClient(client: AgentWitchHubClient): void {
    if (!this.connectedAtByClientId.has(client.id)) {
      this.connectedAtByClientId.set(client.id, Date.now());
    }

    this.clients.set(client.id, client);
  }

  unregisterClient(clientId: string): void {
    this.clients.delete(clientId);
    this.connectedAtByClientId.delete(clientId);
    this.manifestByAgentClientId.delete(clientId);
  }

  getStatus(): AgentWitchHubStatus {
    const clients = [...this.clients.values()];
    return {
      agentCount: clients.filter((client) => client.role === "agent").length,
      dashboardCount: clients.filter((client) => client.role === "dashboard")
        .length,
    };
  }

  listConnectedClients(): readonly AgentWitchConnectedClient[] {
    return [...this.clients.values()]
      .map((client) => ({
        id: client.id,
        role: client.role,
        connectedAt: new Date(
          this.connectedAtByClientId.get(client.id) ?? Date.now(),
        ).toISOString(),
      }))
      .sort((left, right) => left.connectedAt.localeCompare(right.connectedAt));
  }

  listHarnessManifestReports(): readonly AgentWitchHarnessManifestReport[] {
    return [...this.manifestByAgentClientId.values()].sort((left, right) =>
      right.reportedAt.localeCompare(left.reportedAt),
    );
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

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST) {
      if (sender?.role !== "dashboard") {
        return {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage:
              "Only dashboard clients can dispatch harness requests.",
          },
          requestId: message.requestId,
        };
      }

      if (!isHarnessRequestPayload(message.payload)) {
        return {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage:
              "harness.request requires writerAgent, spec, and instruction.",
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
        type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
        payload: {
          writerAgent: message.payload.writerAgent,
          spec: message.payload.spec,
          instruction: message.payload.instruction,
        },
        requestId: message.requestId,
      });

      return {
        type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST_ACK,
        payload: {
          dispatched: true,
          agentClientId: agentClient.id,
          writerAgent: message.payload.writerAgent,
        },
        requestId: message.requestId,
      };
    }

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST_ACK) {
      if (sender?.role !== "agent") {
        return {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage:
              "Only agent clients can publish harness request acks.",
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

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST_RESULT) {
      if (sender?.role !== "agent") {
        return {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage:
              "Only agent clients can publish harness request results.",
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

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_MANIFEST_REPORT) {
      if (sender?.role !== "agent") {
        return {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage:
              "Only agent clients can publish harness manifest reports.",
          },
          requestId: message.requestId,
        };
      }

      const payload = message.payload;
      if (
        payload === undefined ||
        !isRecord(payload.manifest) ||
        typeof payload.hostname !== "string"
      ) {
        return {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage:
              "harness.manifest.report requires payload.hostname and payload.manifest.",
          },
          requestId: message.requestId,
        };
      }

      const report: AgentWitchHarnessManifestReport = {
        agentClientId: senderId,
        hostname: payload.hostname,
        manifest: payload.manifest,
        reportedAt: new Date().toISOString(),
      };
      this.manifestByAgentClientId.set(senderId, report);
      this.broadcastToRole("dashboard", message);

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
