"use client";

import { useState } from "react";

import GroupMemberInviteForm from "@/features/admin/components/GroupMemberInviteForm";
import GroupMembersTable from "@/features/admin/components/GroupMembersTable";
import ConfirmDestructiveModal from "@/features/shell/ConfirmDestructiveModal";
import type { MemberItem } from "@/features/admin/types/groupManagement.types";

interface GroupMembersSectionProps {
  readonly members: readonly MemberItem[];
  readonly memberEmail: string;
  readonly memberRole: string;
  readonly onMemberEmailChange: (value: string) => void;
  readonly onMemberRoleChange: (value: string) => void;
  readonly onAddMember: () => void;
  readonly onRoleChange: (membershipId: string, role: string) => void;
  readonly onRemoveMember: (membershipId: string) => void;
}

export default function GroupMembersSection({
  members,
  memberEmail,
  memberRole,
  onMemberEmailChange,
  onMemberRoleChange,
  onAddMember,
  onRoleChange,
  onRemoveMember,
}: GroupMembersSectionProps) {
  const [pendingMembershipId, setPendingMembershipId] = useState<string | null>(
    null,
  );
  const pendingMember = members.find(
    (member) => member.membership.id === pendingMembershipId,
  );

  return (
    <>
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Group members
        </h2>

        <GroupMemberInviteForm
          memberEmail={memberEmail}
          memberRole={memberRole}
          onMemberEmailChange={onMemberEmailChange}
          onMemberRoleChange={onMemberRoleChange}
          onAddMember={onAddMember}
        />

        <GroupMembersTable
          members={members}
          onRoleChange={onRoleChange}
          onRemoveMember={(membershipId) => {
            setPendingMembershipId(membershipId);
          }}
        />
      </section>

      <ConfirmDestructiveModal
        isOpen={pendingMembershipId !== null}
        title="Remove member?"
        description={`Remove ${
          pendingMember?.user?.email ?? "this member"
        } from the group.`}
        confirmLabel="Remove member"
        onClose={() => {
          setPendingMembershipId(null);
        }}
        onConfirm={() => {
          if (pendingMembershipId !== null) {
            onRemoveMember(pendingMembershipId);
          }
          setPendingMembershipId(null);
        }}
      />
    </>
  );
}
