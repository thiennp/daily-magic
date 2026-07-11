import { AgentWitchHub } from "./agentWitchHub";
import { AgentWitchPairingStore } from "./agentWitchPairingStore";

const pairingStoreHolder: { value?: AgentWitchPairingStore } = {};
const hubHolder: { value?: AgentWitchHub } = {};

export const getAgentWitchPairingStore = (): AgentWitchPairingStore => {
  if (pairingStoreHolder.value === undefined) {
    pairingStoreHolder.value = new AgentWitchPairingStore({
      persistToDatabase: process.env.NODE_ENV !== "test",
    });
  }

  return pairingStoreHolder.value;
};

export const getAgentWitchHub = (): AgentWitchHub => {
  if (hubHolder.value === undefined) {
    hubHolder.value = new AgentWitchHub(getAgentWitchPairingStore());
  }

  return hubHolder.value;
};

export const resetAgentWitchHubForTests = (): void => {
  hubHolder.value = undefined;
  pairingStoreHolder.value = undefined;
};
