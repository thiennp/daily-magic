"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import ConfirmDestructiveModal from "@/features/shell/ConfirmDestructiveModal";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { COMPANY_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import type { GroupItem } from "@/features/admin/types/public-api/types";

interface GroupDeleteControlsProps {
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly deleteMembers: boolean;
  readonly canDelete: boolean;
  readonly onDeleteMembersChange: (value: boolean) => void;
  readonly onDeleteGroup: () => void;
}

export default function GroupDeleteControls({
  groups,
  selectedGroupId,
  deleteMembers,
  canDelete,
  onDeleteMembersChange,
  onDeleteGroup,
}: GroupDeleteControlsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const companyLabel = COMPANY_ENTITY_LABEL.toLowerCase();
  const selectedGroup = groups.find((group) => group.id === selectedGroupId);

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-awc-fg-muted">
          <input
            type="checkbox"
            checked={deleteMembers}
            disabled={!canDelete}
            onChange={(event) => {
              onDeleteMembersChange(event.target.checked);
            }}
          />
          {C.deleteAlsoMembers}
        </label>
        <Button
          variant="outline"
          disabled={!canDelete}
          className="border-awc-bad-dot/40 text-awc-bad"
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
        >
          {C.deleteCompany}
        </Button>
        {canDelete ? null : (
          <span className="text-sm text-awc-fg-muted">{C.deleteOwnerOnly}</span>
        )}
      </div>

      <ConfirmDestructiveModal
        isOpen={isDeleteModalOpen}
        title={`Delete ${selectedGroup?.name ?? companyLabel}?`}
        description={
          deleteMembers
            ? `Delete "${selectedGroup?.name ?? `this ${companyLabel}`}" and remove all users in it. ${C.deleteConfirmHint}`
            : `Removes the company, its members and its dispatch policy. ${C.deleteConfirmHint}`
        }
        confirmLabel={C.deleteCompany}
        typedConfirmText={selectedGroup?.name}
        typedConfirmLabel={
          <>
            {C.deleteTypeToConfirmBefore} <b>{selectedGroup?.name}</b>{" "}
            {C.deleteTypeToConfirmAfter}
          </>
        }
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
