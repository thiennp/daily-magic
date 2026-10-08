import { useAssistantWakeHealth } from "@/features/projects/members/hooks/useAssistantWakeHealth";
import { resolveRailAssistantWakeStatus } from "@/features/projects/members/utils/resolveRailAssistantWakeStatus";

type WakeMember = Parameters<
  typeof resolveRailAssistantWakeStatus
>[0]["member"] & { readonly id: string };

/** Assistant row wake state: GET health + the resolved chip status (never a hard-coded Ready). */
export const useHelperRowWakeStatus = (
  projectId: string,
  member: WakeMember,
  savedIds: ReadonlySet<string>,
) => {
  const savedNow = savedIds.has(member.id);
  const wake = useAssistantWakeHealth({
    projectId,
    membershipId: member.id,
    enabled:
      member.wakeLinkSet === true &&
      (member.deliveryMode !== "poll" || savedNow),
    reloadKey: savedNow ? 1 : 0,
  });
  const { health } = wake;
  const status = resolveRailAssistantWakeStatus({
    member,
    savedIds,
    health,
    loadFailed: wake.loadFailed,
  });
  return { wake, health, status } as const;
};
