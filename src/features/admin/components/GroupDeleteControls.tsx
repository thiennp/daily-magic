"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import ConfirmDestructiveModal from "@/features/shell/ConfirmDestructiveModal";
import { COMPANY_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

interface GroupDeleteControlsProps {
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly deleteMembers: boolean;
  readonly embedded?: boolean;
  readonly onDeleteMembersChange: (value: boolean) => void;
  readonly onDeleteGroup: () => void;
}

export default function GroupDeleteControls({
  groups,
  selectedGroupId,
  deleteMembers,
  embedded = false,
  onDeleteMembersChange,
  onDeleteGroup,
}: GroupDeleteControlsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const companyLabel = COMPANY_ENTITY_LABEL.toLowerCase();
  const selectedGroup = groups.find((group) => group.id === selectedGroupId);

  return (
    <>
      <div
        className={
          embedded
            ? "mt-4 flex flex-wrap items-center gap-3"
            : "mt-4 flex flex-wrap items-center gap-3"
        }
      >
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={deleteMembers}
            onChange={(event) => {
              onDeleteMembersChange(event.target.checked);
            }}
          />
          Also delete all users in this {companyLabel}
        </label>
        <Button
          variant="outline"
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
        >
          Delete {companyLabel}
        </Button>
      </div>

      <ConfirmDestructiveModal
        isOpen={isDeleteModalOpen}
        title={`Delete ${companyLabel}?`}
        description={
          deleteMembers
            ? `Delete "${selectedGroup?.name ?? `this ${companyLabel}`}" and remove all users in it. This cannot be undone.`
            : `Delete "${selectedGroup?.name ?? `this ${companyLabel}`}". Members will lose access to this ${companyLabel}.`
        }
        confirmLabel={`Delete ${companyLabel}`}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          void onDeleteGroup();
        }}
      />
    </>
  );
}
