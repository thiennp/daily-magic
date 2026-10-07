"use client";

import { Modal } from "@/components/ui/modal";
import GroupDeleteControls from "@/features/admin/components/GroupDeleteControls";
import GroupDispatchPolicyControl from "@/features/admin/components/GroupDispatchPolicyControl";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";
import { COMPANY_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";

interface GroupCompanySettingsModalProps {
  readonly isOpen: boolean;
  readonly groupId: string;
  readonly groups: readonly GroupItem[];
  readonly canConfigureDispatchPolicy: boolean;
  readonly canDeleteTeam: boolean;
  readonly deleteMembers: boolean;
  readonly onClose: () => void;
  readonly onDeleteMembersChange: (value: boolean) => void;
  readonly onDeleteGroup: () => void;
}

export default function GroupCompanySettingsModal({
  isOpen,
  groupId,
  groups,
  canConfigureDispatchPolicy,
  canDeleteTeam,
  deleteMembers,
  onClose,
  onDeleteMembersChange,
  onDeleteGroup,
}: GroupCompanySettingsModalProps) {
  const selectedGroup = groups.find((group) => group.id === groupId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-800 dark:text-white/90">
        {C.companySettings}
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {selectedGroup?.name ?? COMPANY_ENTITY_LABEL}
      </p>

      {canConfigureDispatchPolicy ? (
        <GroupDispatchPolicyControl groupId={groupId} embedded />
      ) : (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {C.onlyAdminsChange}
        </p>
      )}

      {canDeleteTeam ? (
        <section className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-error-700 dark:text-error-300">
            {C.dangerZone}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {C.deleteBody}
          </p>
          <GroupDeleteControls
            embedded
            groups={groups}
            selectedGroupId={groupId}
            deleteMembers={deleteMembers}
            onDeleteMembersChange={onDeleteMembersChange}
            onDeleteGroup={onDeleteGroup}
          />
        </section>
      ) : null}
    </Modal>
  );
}
