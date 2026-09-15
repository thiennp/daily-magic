import { CURSOR_CLOUD_EXECUTOR_DEVICE_ID } from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";

export const isCursorCloudDispatchBody = (
  body: AgentRunDispatchBody,
): boolean =>
  body.writerAgent === "cursor-cloud" ||
  body.targetDeviceId === CURSOR_CLOUD_EXECUTOR_DEVICE_ID;
