import isAgentWitchMessage from "@/lib/agentWitch/isAgentWitchMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export type AgentWitchTraceFormatError =
  | "json_parse"
  | "not_object"
  | "missing_type"
  | "unknown_type"
  | "invalid_payload"
  | "invalid_request_id";

const MESSAGE_TYPES = new Set<string>(Object.values(AGENT_WITCH_MESSAGE_TYPES));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export type AgentWitchTraceMessageClassification = {
  readonly formatOk: boolean;
  readonly formatError: AgentWitchTraceFormatError | null;
  readonly command: string;
  readonly type: string;
  readonly requestId: string | null;
  readonly parsed: Record<string, unknown> | null;
};

export const classifyAgentWitchTraceMessageFromObject = (
  value: unknown,
): AgentWitchTraceMessageClassification => {
  if (!isRecord(value)) {
    return {
      formatOk: false,
      formatError: "not_object",
      command: "<invalid>",
      type: "<invalid>",
      requestId: null,
      parsed: null,
    };
  }

  const messageType = value.type;
  if (typeof messageType !== "string") {
    return {
      formatOk: false,
      formatError: "missing_type",
      command: "<invalid>",
      type: "<invalid>",
      requestId: null,
      parsed: value,
    };
  }

  if (!MESSAGE_TYPES.has(messageType)) {
    return {
      formatOk: false,
      formatError: "unknown_type",
      command: messageType,
      type: messageType,
      requestId: typeof value.requestId === "string" ? value.requestId : null,
      parsed: value,
    };
  }

  if (value.payload !== undefined && !isRecord(value.payload)) {
    return {
      formatOk: false,
      formatError: "invalid_payload",
      command: messageType,
      type: messageType,
      requestId: typeof value.requestId === "string" ? value.requestId : null,
      parsed: value,
    };
  }

  if (value.requestId !== undefined && typeof value.requestId !== "string") {
    return {
      formatOk: false,
      formatError: "invalid_request_id",
      command: messageType,
      type: messageType,
      requestId: null,
      parsed: value,
    };
  }

  if (!isAgentWitchMessage(value)) {
    return {
      formatOk: false,
      formatError: "invalid_payload",
      command: messageType,
      type: messageType,
      requestId: typeof value.requestId === "string" ? value.requestId : null,
      parsed: value,
    };
  }

  return {
    formatOk: true,
    formatError: null,
    command: messageType,
    type: messageType,
    requestId: typeof value.requestId === "string" ? value.requestId : null,
    parsed: value,
  };
};

export const classifyAgentWitchTraceMessageFromRaw = (
  raw: string,
): AgentWitchTraceMessageClassification & { readonly rawPreview: string } => {
  const rawPreview = raw.length > 500 ? `${raw.slice(0, 500)}…` : raw;

  try {
    const parsed: unknown = JSON.parse(raw);
    return {
      ...classifyAgentWitchTraceMessageFromObject(parsed),
      rawPreview,
    };
  } catch {
    return {
      formatOk: false,
      formatError: "json_parse",
      command: "<invalid>",
      type: "<invalid>",
      requestId: null,
      parsed: null,
      rawPreview,
    };
  }
};
