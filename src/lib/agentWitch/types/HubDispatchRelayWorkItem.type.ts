import type { HubStopRelayBody } from "@/lib/agentWitch/types/HubStopRelayBody.type";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";

/** Run dispatch (legacy rows) or S0-7 stop request. */
export type HubDispatchRelayBody = AgentRunDispatchBody | HubStopRelayBody;

export type HubDispatchRelayEnqueueInput = {
  readonly ownerInstanceId: string;
  readonly executorUserId: string;
  readonly requesterUserId: string;
  readonly deviceId: string;
  readonly requestId: string;
  readonly body: HubDispatchRelayBody;
};

export type HubDispatchRelayWorkItem = {
  readonly relayId: string;
  readonly executorUserId: string;
  readonly requesterUserId: string;
  readonly requesterEmail: string | null;
  readonly deviceId: string;
  readonly requestId: string;
  readonly body: HubDispatchRelayBody;
};
