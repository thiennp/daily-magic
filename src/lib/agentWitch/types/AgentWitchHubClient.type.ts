import type { AgentWitchRole } from "./AgentWitchRole.type";
import type AgentWitchMessage from "./AgentWitchMessage.type";

export default interface AgentWitchHubClient {
  readonly id: string;
  readonly role: AgentWitchRole;
  readonly userId?: string;
  readonly email?: string;
  readonly pairingToken?: string;
  readonly send: (message: AgentWitchMessage) => void;
}
