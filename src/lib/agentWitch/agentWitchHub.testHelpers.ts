import { AgentWitchPairingStore } from "./agentWitchPairingStore";
import { AgentWitchHub } from "./agentWitchHub";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";

export const USER_ID = "user-1";
export const USER_EMAIL = "user@example.com";
export const PAIRING_TOKEN = "pair-token-1";
export const DEVICE_ID = "device-1";

export const createCollector = () => {
  const messages: AgentWitchMessage[] = [];
  return {
    messages,
    send: (message: AgentWitchMessage) => {
      messages.push(message);
    },
  };
};

export const registerPairedClients = async (
  hub: AgentWitchHub,
  pairingStore: AgentWitchPairingStore,
  agentSend: (message: AgentWitchMessage) => void,
  dashboardSend: (message: AgentWitchMessage) => void,
): Promise<void> => {
  await pairingStore.claimPairing(PAIRING_TOKEN, USER_ID, USER_EMAIL);
  hub.registerClient({
    id: "agent-1",
    role: "agent",
    userId: USER_ID,
    deviceId: DEVICE_ID,
    pairingToken: PAIRING_TOKEN,
    send: agentSend,
  });
  hub.registerClient({
    id: "dash-1",
    role: "dashboard",
    userId: USER_ID,
    email: USER_EMAIL,
    send: dashboardSend,
  });
};

export const createHubFixture = (): {
  readonly hub: AgentWitchHub;
  readonly pairingStore: AgentWitchPairingStore;
} => {
  const pairingStore = new AgentWitchPairingStore();
  return {
    hub: new AgentWitchHub(pairingStore),
    pairingStore,
  };
};
