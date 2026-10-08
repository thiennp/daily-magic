import GroupMembersSection from "@/features/admin/components/GroupMembersSection";
import GroupTeamActivityPanel from "@/features/admin/components/GroupTeamActivityPanel";
import type { useGroupManagement } from "@/features/admin/hooks/useGroupManagement";

interface GroupMembersAndRunsProps {
  readonly groupManagement: ReturnType<typeof useGroupManagement>;
  readonly actorUserId: string | null;
  readonly actorIsAdmin: boolean;
}

export default function GroupMembersAndRuns({
  groupManagement,
  actorUserId,
  actorIsAdmin,
}: GroupMembersAndRunsProps) {
  const groupId = groupManagement.selectedGroupId;
  const companyName =
    groupManagement.groups.find((group) => group.id === groupId)?.name ?? "";

  return (
    <div className="grid gap-5 xl:grid-cols-2 xl:items-start">
      <GroupMembersSection
        members={groupManagement.members}
        companyName={companyName}
        actorUserId={actorUserId}
        actorIsAdmin={actorIsAdmin}
        memberEmail={groupManagement.memberEmail}
        memberRole={groupManagement.memberRole}
        onMemberEmailChange={groupManagement.setMemberEmail}
        onMemberRoleChange={groupManagement.setMemberRole}
        onAddMember={() => void groupManagement.handleAddMember()}
        onRoleChange={groupManagement.handleRoleChange}
        onRemoveMember={groupManagement.handleRemoveMember}
      />
      <GroupTeamActivityPanel groupId={groupId} />
    </div>
  );
}
