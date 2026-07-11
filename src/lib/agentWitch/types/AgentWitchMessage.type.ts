import type { AgentWitchMessageType } from "./AgentWitchMessageType.constant";

export default interface AgentWitchMessage {
  readonly type: AgentWitchMessageType;
  readonly payload?: Readonly<Record<string, unknown>>;
  readonly requestId?: string;
}
