"use client";

import AppIcon from "@/components/ui/icon/AppIcon";
import GroupCompanySettingsModal from "@/features/admin/components/GroupCompanySettingsModal";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";
import { useModal } from "@/hooks/useModal";
import { GearIcon } from "@/icons";

interface GroupCompanySettingsGearButtonProps {
  readonly className: string;
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly canConfigureDispatchPolicy: boolean;
  readonly canDeleteTeam: boolean;
  readonly deleteMembers: boolean;
  readonly onDeleteMembersChange: (value: boolean) => void;
  readonly onDeleteGroup: () => void;
}

export default function GroupCompanySettingsGearButton({
  className,
  groups,
  selectedGroupId,
  canConfigureDispatchPolicy,
  canDeleteTeam,
  deleteMembers,
  onDeleteMembersChange,
  onDeleteGroup,
}: GroupCompanySettingsGearButtonProps) {
  const settingsModal = useModal();

  return (
    <>
      <button
        type="button"
        aria-label="Company settings"
        className={className}
        onClick={settingsModal.openModal}
      >
        <AppIcon icon={GearIcon} size="sm" />
      </button>
      <GroupCompanySettingsModal
        isOpen={settingsModal.isOpen}
        groupId={selectedGroupId}
        groups={groups}
        canConfigureDispatchPolicy={canConfigureDispatchPolicy}
        canDeleteTeam={canDeleteTeam}
        deleteMembers={deleteMembers}
        onClose={settingsModal.closeModal}
        onDeleteMembersChange={onDeleteMembersChange}
        onDeleteGroup={onDeleteGroup}
      />
    </>
  );
}
