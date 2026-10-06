import { listAgentWitchDevicesForUser } from "@/lib/agentWitch/listAgentWitchDevicesForUser";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { summarizeAgentAccessMac } from "@/lib/agentAccess/summarizeAgentAccessMac";

export const executeAgentAccessAccountTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name === "whoami") {
    return agentAccessTextResult({
      ok: true,
      account: {
        id: input.actor.id,
        email: input.actor.email,
        displayName: input.actor.name,
        registrationMethod: input.actor.registrationMethod,
      },
    });
  }

  if (input.name === "list_macs") {
    const devices = await listAgentWitchDevicesForUser(input.actor.id);
    return agentAccessTextResult({
      ok: true,
      macs: devices.map(summarizeAgentAccessMac),
    });
  }

  return null;
};
