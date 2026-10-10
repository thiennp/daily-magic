"use client";

import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import GroupMemberInviteForm from "@/features/admin/components/GroupMemberInviteForm";
import GroupMembersTable from "@/features/admin/components/GroupMembersTable";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { ConfirmDestructiveModal } from "@/features/shell/public-api/presentation";
import type { MemberItem } from "@/features/admin/types/public-api/types";

interface GroupMembersSectionProps {
  readonly members: readonly MemberItem[];
  readonly companyName: string;
  readonly actorUserId: string | null;
  readonly actorIsAdmin: boolean;
  readonly actorCanManageAdmins: boolean;
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
  companyName,
  actorUserId,
  actorIsAdmin,
  actorCanManageAdmins,
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
  const pendingName =
    pendingMember?.user?.name?.trim() ||
    pendingMember?.user?.email ||
    "this member";

  return (
    <>
      <AppPanel padding="compact" aria-labelledby="mem-h">
        <div className="flex items-center gap-2">
          <h2 id="mem-h" className="text-lg font-semibold text-awc-fg">
            {C.membersTitle}
          </h2>
          <span className="rounded-full bg-awc-fill px-2 py-0.5 text-xs font-semibold tabular-nums text-awc-fg-muted">
            {members.length}
          </span>
        </div>

        <GroupMemberInviteForm
          memberEmail={memberEmail}
          memberRole={memberRole}
          memberEmails={members.flatMap((member) =>
            member.user?.email ? [member.user.email] : [],
          )}
          canInvite={actorIsAdmin}
          onMemberEmailChange={onMemberEmailChange}
          onMemberRoleChange={onMemberRoleChange}
          onAddMember={onAddMember}
        />

        <GroupMembersTable
          members={members}
          actorUserId={actorUserId}
          actorIsAdmin={actorIsAdmin}
          actorCanManageAdmins={actorCanManageAdmins}
          onRoleChange={onRoleChange}
          onRemoveMember={setPendingMembershipId}
        />
      </AppPanel>

      <ConfirmDestructiveModal
        isOpen={pendingMembershipId !== null}
        title={`Remove ${pendingName}?`}
        description={C.removeMemberText
          .replace("{name}", pendingName)
          .replace("{company}", companyName)}
        confirmLabel={C.removeMemberConfirm}
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
