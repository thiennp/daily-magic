import {
  AGENT_WITCH_LOCAL_APP_PORT_RANGE_CEILING,
  AGENT_WITCH_LOCAL_APP_PORT_RANGE_FLOOR,
  AGENT_WITCH_LOCAL_APP_PORT_RANGE_SIZE,
} from "./agentWitchLocalAppPortRange.constants";
import type { AgentWitchLocalAppPortRange } from "./agentWitchLocalAppPortRange.types";

export const isValidAgentWitchLocalAppPortRange = (
  value: unknown,
): value is AgentWitchLocalAppPortRange => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const record = value as Record<string, unknown>;
  const start = record.start;
  const end = record.end;
  if (
    typeof start !== "number" ||
    typeof end !== "number" ||
    !Number.isInteger(start) ||
    !Number.isInteger(end)
  ) {
    return false;
  }
  if (start < AGENT_WITCH_LOCAL_APP_PORT_RANGE_FLOOR) {
    return false;
  }
  if (end > AGENT_WITCH_LOCAL_APP_PORT_RANGE_CEILING) {
    return false;
  }
  if (end - start + 1 !== AGENT_WITCH_LOCAL_APP_PORT_RANGE_SIZE) {
    return false;
  }
  if (start > end) {
    return false;
  }
  return true;
};

export const isValidAgentWitchLocalAppPort = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value >= AGENT_WITCH_LOCAL_APP_PORT_RANGE_FLOOR &&
  value <= AGENT_WITCH_LOCAL_APP_PORT_RANGE_CEILING;
