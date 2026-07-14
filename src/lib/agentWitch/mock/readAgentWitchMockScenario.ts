import type { ConnectionScenarioId } from "@/lib/agentWitch/mock/connectionScenario.types";

const VALID_SCENARIOS: readonly ConnectionScenarioId[] = [
  "all-online",
  "all-offline",
  "mixed",
  "no-devices",
  "api-error",
  "ws-disconnected",
];

const isConnectionScenarioId = (value: string): value is ConnectionScenarioId =>
  (VALID_SCENARIOS as readonly string[]).includes(value);

export const readAgentWitchMockScenario = (): ConnectionScenarioId | null => {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const configured = process.env.AGENT_WITCH_MOCK_SCENARIO?.trim();
  if (configured === undefined || configured.length === 0) {
    return null;
  }

  return isConnectionScenarioId(configured) ? configured : null;
};
