import { randomUUID } from "node:crypto";

import { isDeviceLiveOnAnotherInstance } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { decideProjectComputerAccess } from "@/lib/projects/acl/messaging/decideProjectComputerAccess";
import { HOSTED_DEVICE_HISTORY_PAGE_TIMEOUT_MS } from "@/lib/projects/acl/messaging/messenger/hostedDeviceHubProxy.constant";
import {
  registerProjectHistoryPageRequest,
  type ProjectHistoryPageCompletePayload,
} from "@/lib/projects/acl/messaging/messenger/projectHistoryPageRequestRegistry";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { summarizeProjectHistoryPageTraffic } from "@/lib/projects/acl/messaging/messenger/summarizeProjectHistoryPageTraffic";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type RequestProjectHistoryPageFromDeviceInput = {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly threadKey: string;
  readonly beforeCursor?: string;
  readonly limit: number;
};

export type ProjectHistoryPageFromDevice = {
  readonly entries: readonly ProjectMessengerTimelineEntry[];
  readonly nextBeforeCursor: string | null;
  readonly hasMore: boolean;
};

export type RequestProjectHistoryPageFromDeviceResult =
  | { readonly kind: "page"; readonly page: ProjectHistoryPageFromDevice }
  | { readonly kind: "soft_degrade"; readonly reason: string }
  | { readonly kind: "skipped"; readonly reason: string };

export type RequestProjectHistoryPageFromDevicePorts = {
  readonly getProject?: typeof getUserProjectById;
  readonly getHub?: () => AgentWitchHubRuntime;
  readonly findAgentClient?: (
    hub: AgentWitchHubRuntime,
    userId: string,
    deviceId: string,
  ) => AgentWitchHubClient | undefined;
  readonly isOtherInstance?: typeof isDeviceLiveOnAnotherInstance;
  readonly registerRequest?: typeof registerProjectHistoryPageRequest;
  readonly timeoutMs?: number;
  /** Optional sink for scrubbed traffic summaries (tests assert no bodies). */
  readonly logTraffic?: (summary: unknown) => void;
};

const emptySoft = (
  reason: string,
): RequestProjectHistoryPageFromDeviceResult => ({
  kind: "soft_degrade",
  reason,
});

/**
 * Ask the project's linked computer for a History page over the hub.
 *
 * Same-instance: WS send + in-memory request registry (bodies in RAM only).
 * Cross-instance (device WS on another Railway replica): documented Neon
 * soft-degrade — never write page bodies to Neon/relay/traffic logs.
 * Timeout / device error / unknown type (old AWL): soft-degrade.
 */
export const requestProjectHistoryPageFromDevice = async (
  input: RequestProjectHistoryPageFromDeviceInput,
  ports: RequestProjectHistoryPageFromDevicePorts = {},
): Promise<RequestProjectHistoryPageFromDeviceResult> => {
  const getProject = ports.getProject ?? getUserProjectById;
  const getHub = ports.getHub ?? getAgentWitchHub;
  const findAgentClient =
    ports.findAgentClient ??
    ((hub, userId, deviceId) => hub.findAgentClientForUser(userId, deviceId));
  const isOtherInstance =
    ports.isOtherInstance ?? isDeviceLiveOnAnotherInstance;
  const registerRequest =
    ports.registerRequest ?? registerProjectHistoryPageRequest;
  const timeoutMs = ports.timeoutMs ?? HOSTED_DEVICE_HISTORY_PAGE_TIMEOUT_MS;
  const logTraffic = ports.logTraffic;

  const project = await getProject(input.projectId);
  const deviceId = project?.deviceId?.trim() ?? "";
  if (project === null || deviceId.length === 0) {
    return { kind: "skipped", reason: "no_project_computer" };
  }

  const access = decideProjectComputerAccess({
    deviceId,
    deviceUserId: input.ownerUserId,
    projectOwnerUserId: project.ownerUserId,
    projectDeviceId: deviceId,
  });
  if (!access.allow) {
    return { kind: "skipped", reason: access.reason };
  }
  // Only the project owner's linked computer may be asked.
  if (project.ownerUserId !== input.ownerUserId) {
    return { kind: "skipped", reason: "not_owner" };
  }

  const hub = getHub();
  const agentClient = findAgentClient(hub, input.ownerUserId, deviceId);

  if (agentClient === undefined) {
    // Live on another instance → documented fallback (no body relay to Neon).
    const other = await isOtherInstance(input.ownerUserId, deviceId);
    if (other) {
      return emptySoft("cross_instance_neon_fallback");
    }
    return emptySoft("device_unreachable");
  }

  const requestId = randomUUID();
  const pending = registerRequest(requestId, timeoutMs);

  const requestPayload = {
    projectId: input.projectId,
    threadKey: input.threadKey,
    ...(input.beforeCursor !== undefined
      ? { beforeCursor: input.beforeCursor }
      : {}),
    limit: input.limit,
  };

  logTraffic?.(
    summarizeProjectHistoryPageTraffic({
      type: AGENT_WITCH_MESSAGE_TYPES.PROJECT_HISTORY_PAGE_REQUEST,
      requestId,
      payload: requestPayload,
    }),
  );

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.PROJECT_HISTORY_PAGE_REQUEST,
    payload: requestPayload,
    requestId,
  });

  const completed: ProjectHistoryPageCompletePayload = await pending;

  logTraffic?.(
    summarizeProjectHistoryPageTraffic({
      type: AGENT_WITCH_MESSAGE_TYPES.PROJECT_HISTORY_PAGE_RESULT,
      requestId,
      payload: completed,
    }),
  );

  if (!completed.ok) {
    return emptySoft(completed.errorCode);
  }

  return {
    kind: "page",
    page: {
      entries: completed.entries,
      nextBeforeCursor: completed.nextBeforeCursor,
      hasMore: completed.hasMore,
    },
  };
};
