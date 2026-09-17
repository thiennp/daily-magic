import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import isRecord from "@/lib/agentWitch/isRecord";

export interface OfficialWorkflowRunStartBody {
  readonly capabilityId: string;
  readonly fieldValues: Readonly<Record<string, string>>;
  readonly writerAgent?: HarnessWriterAgent;
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly targetDeviceId?: string;
}

const parseFieldValues = (
  value: unknown,
): Readonly<Record<string, string>> | null => {
  if (!isRecord(value)) {
    return null;
  }

  const entries = Object.entries(value).flatMap(([key, fieldValue]) =>
    typeof fieldValue === "string" ? [[key, fieldValue] as const] : [],
  );

  return Object.fromEntries(entries);
};

export const parseOfficialWorkflowRunStartBody = (
  body: unknown,
): OfficialWorkflowRunStartBody | null => {
  if (!isRecord(body)) {
    return null;
  }

  const capabilityId =
    typeof body.capabilityId === "string" ? body.capabilityId.trim() : "";
  const fieldValues = parseFieldValues(body.fieldValues);

  if (capabilityId.length === 0 || fieldValues === null) {
    return null;
  }

  const writerAgent =
    typeof body.writerAgent === "string" &&
    isHarnessWriterAgent(body.writerAgent)
      ? body.writerAgent
      : undefined;

  return {
    capabilityId,
    fieldValues,
    ...(writerAgent !== undefined ? { writerAgent } : {}),
    ...(typeof body.targetUserId === "string" && body.targetUserId.length > 0
      ? { targetUserId: body.targetUserId }
      : {}),
    ...(typeof body.groupId === "string" && body.groupId.length > 0
      ? { groupId: body.groupId }
      : {}),
    ...(typeof body.targetDeviceId === "string" &&
    body.targetDeviceId.length > 0
      ? { targetDeviceId: body.targetDeviceId }
      : {}),
  };
};

export default parseOfficialWorkflowRunStartBody;
