import type { AgentWitchMessageType } from "./AgentWitchMessageType.constant";

/** WebSocket frame body shared by AWC hub and AWI Mac client. */
export default interface AgentWitchMessage {
  readonly type: AgentWitchMessageType;
  readonly payload?: Readonly<Record<string, unknown>>;
  readonly requestId?: string;
}
