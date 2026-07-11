import { AgentWitchHub } from "./agentWitchHub";

const hubHolder: { value?: AgentWitchHub } = {};

export const getAgentWitchHub = (): AgentWitchHub => {
  if (hubHolder.value === undefined) {
    hubHolder.value = new AgentWitchHub();
  }
  return hubHolder.value;
};

export const resetAgentWitchHubForTests = (): void => {
  hubHolder.value = undefined;
};
