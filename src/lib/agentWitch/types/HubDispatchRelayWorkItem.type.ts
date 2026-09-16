import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";

export type HubDispatchRelayEnqueueInput = {
  readonly ownerInstanceId: string;
  readonly executorUserId: string;
  readonly requesterUserId: string;
  readonly deviceId: string;
  readonly requestId: string;
  readonly body: AgentRunDispatchBody;
};

export type HubDispatchRelayWorkItem = {
  readonly relayId: string;
  readonly executorUserId: string;
  readonly requesterUserId: string;
  readonly requesterEmail: string | null;
  readonly deviceId: string;
  readonly requestId: string;
  readonly body: AgentRunDispatchBody;
};
