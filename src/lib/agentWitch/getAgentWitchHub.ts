import { AgentWitchHub } from "./agentWitchHub";
import { AgentWitchPairingStore } from "./agentWitchPairingStore";

/**
 * Process-wide holders so `server.ts` (WebSocket upgrade) and Next.js API route
 * bundles share one hub. Module-scoped vars are not enough: Next compiles routes
 * into a separate graph that would otherwise create an empty second hub while
 * Mac heartbeats still update `last_seen_at` → UI shows “Seen recently”.
 */
const agentWitchGlobal = globalThis as typeof globalThis & {
  __dailyMagicAgentWitchPairingStore?: AgentWitchPairingStore;
  __dailyMagicAgentWitchHub?: AgentWitchHub;
};

export const getAgentWitchPairingStore = (): AgentWitchPairingStore => {
  if (agentWitchGlobal.__dailyMagicAgentWitchPairingStore === undefined) {
    agentWitchGlobal.__dailyMagicAgentWitchPairingStore =
      new AgentWitchPairingStore({
        persistToDatabase:
          process.env.NODE_ENV !== "test" &&
          process.env.AGENT_WITCH_DEV_DASHBOARD !== "1",
      });
  }

  return agentWitchGlobal.__dailyMagicAgentWitchPairingStore;
};

export const getAgentWitchHub = (): AgentWitchHub => {
  if (agentWitchGlobal.__dailyMagicAgentWitchHub === undefined) {
    agentWitchGlobal.__dailyMagicAgentWitchHub = new AgentWitchHub(
      getAgentWitchPairingStore(),
    );
  }

  return agentWitchGlobal.__dailyMagicAgentWitchHub;
};

export const resetAgentWitchHubForTests = (): void => {
  agentWitchGlobal.__dailyMagicAgentWitchHub = undefined;
  agentWitchGlobal.__dailyMagicAgentWitchPairingStore = undefined;
};
