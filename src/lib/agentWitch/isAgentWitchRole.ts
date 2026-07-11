import type { AgentWitchRole } from "./types/AgentWitchRole.type";

const AGENT_WITCH_ROLES: readonly AgentWitchRole[] = ["agent", "dashboard"];

const isAgentWitchRole = (value: unknown): value is AgentWitchRole =>
  typeof value === "string" &&
  AGENT_WITCH_ROLES.includes(value as AgentWitchRole);

export default isAgentWitchRole;
