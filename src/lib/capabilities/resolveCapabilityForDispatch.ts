import { canViewPublishedCapability } from "@/lib/capabilities/canViewPublishedCapability";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";

export const resolveCapabilityForDispatch = async (
  requesterUserId: string,
  executorUserId: string,
  capabilityId: string | undefined,
  groupId: string | null,
  requestId?: string,
): Promise<
  | {
      readonly ok: true;
      readonly capability: PublishedCapabilityRecord | null;
      readonly capabilityVersionId: string | null;
    }
  | {
      readonly ok: false;
      readonly error: ReturnType<typeof buildDispatchError>;
    }
> => {
  if (requesterUserId === executorUserId) {
    return {
      ok: true,
      capability: null,
      capabilityVersionId: null,
    };
  }

  if (!capabilityId || capabilityId.length === 0) {
    return {
      ok: false,
      error: buildDispatchError(
        "Select an assistant from your teammate's offerings.",
        requestId,
      ),
    };
  }

  const capability = await getPublishedCapabilityById(capabilityId);

  if (
    capability === null ||
    capability.status !== CapabilityStatus.PUBLISHED ||
    capability.ownerUserId !== executorUserId
  ) {
    return {
      ok: false,
      error: buildDispatchError(
        "That assistant is not available from this teammate.",
        requestId,
      ),
    };
  }

  const canView = await canViewPublishedCapability(
    requesterUserId,
    capability.ownerUserId,
    capability.visibility,
    groupId ?? capability.groupId,
  );

  if (!canView) {
    return {
      ok: false,
      error: buildDispatchError(
        "You do not have access to that assistant.",
        requestId,
      ),
    };
  }

  return {
    ok: true,
    capability,
    capabilityVersionId: capability.currentVersionId,
  };
};
