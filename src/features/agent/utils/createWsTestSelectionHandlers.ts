import type { useTeamDispatchSelection } from "@/features/dispatch/hooks/useTeamDispatchSelection";

export const createWsTestSelectionHandlers = (
  selection: ReturnType<typeof useTeamDispatchSelection>,
  clearWorkflowFields: () => void,
): {
  readonly setSelectedGroupId: (groupId: string) => void;
  readonly setSelectedTargetUserId: (userId: string) => void;
  readonly setSelectedCapabilityId: (capabilityId: string) => void;
} => ({
  setSelectedGroupId: (groupId: string) => {
    selection.setSelectedGroupId(groupId);
    clearWorkflowFields();
  },
  setSelectedTargetUserId: (userId: string) => {
    selection.setSelectedTargetUserId(userId);
    clearWorkflowFields();
  },
  setSelectedCapabilityId: (capabilityId: string) => {
    selection.setSelectedCapabilityId(capabilityId);
    clearWorkflowFields();
  },
});
