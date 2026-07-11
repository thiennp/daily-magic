"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { GroupRole, isPrivilegedGlobalRole } from "@/lib/auth/roles";

interface GroupItem {
  readonly id: string;
  readonly name: string;
}

interface MemberItem {
  readonly membership: {
    readonly id: string;
    readonly role: string;
    readonly userId: string;
  };
  readonly user: {
    readonly id: string;
    readonly email: string;
    readonly name: string | null;
  } | null;
}

const GROUP_ROLE_OPTIONS = [
  GroupRole.USER,
  GroupRole.GROUP_ADMIN,
  GroupRole.GROUP_SUPER_ADMIN,
] as const;

interface GroupManagementPanelProps {
  readonly initialGroups: readonly GroupItem[];
}

export default function GroupManagementPanel({
  initialGroups,
}: GroupManagementPanelProps) {
  const { data: session } = useSession();
  const isAdmin =
    session?.user?.globalRole &&
    isPrivilegedGlobalRole(session.user.globalRole);
  const [groups, setGroups] = useState<readonly GroupItem[]>(initialGroups);
  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    initialGroups[0]?.id ?? "",
  );
  const [members, setMembers] = useState<readonly MemberItem[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState<string>(GroupRole.USER);
  const [deleteMembers, setDeleteMembers] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadGroups = async () => {
    const response = await fetch("/api/admin/groups");
    const payload = (await response.json()) as {
      groups?: GroupItem[];
      error?: string;
    };

    if (!response.ok) {
      setMessage(payload.error ?? "Could not load groups.");
      return;
    }

    setGroups(payload.groups ?? []);
    setSelectedGroupId((current) => current || payload.groups?.[0]?.id || "");
  };

  const loadMembers = async (groupId: string) => {
    if (!groupId) {
      setMembers([]);
      return;
    }

    const response = await fetch(`/api/admin/groups/${groupId}/members`);
    const payload = (await response.json()) as {
      members?: MemberItem[];
      error?: string;
    };

    if (!response.ok) {
      setMessage(payload.error ?? "Could not load members.");
      return;
    }

    setMembers(payload.members ?? []);
  };

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    void loadMembers(groupId);
  };

  const handleCreateGroup = async () => {
    const response = await fetch("/api/admin/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newGroupName }),
    });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(payload.error ?? "Could not create group.");
      return;
    }

    setNewGroupName("");
    setMessage("Group created.");
    await loadGroups();
  };

  const handleDeleteGroup = async () => {
    if (!selectedGroupId) {
      return;
    }

    const response = await fetch("/api/admin/groups", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupId: selectedGroupId,
        deleteMembers,
      }),
    });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(payload.error ?? "Could not delete group.");
      return;
    }

    setSelectedGroupId("");
    setMembers([]);
    setMessage("Group deleted.");
    await loadGroups();
  };

  const handleAddMember = async () => {
    if (!selectedGroupId) {
      return;
    }

    const response = await fetch(
      `/api/admin/groups/${selectedGroupId}/members`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: memberEmail, role: memberRole }),
      },
    );
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(payload.error ?? "Could not add member.");
      return;
    }

    setMemberEmail("");
    setMessage("Member added.");
    await loadMembers(selectedGroupId);
  };

  const handleRoleChange = async (membershipId: string, role: string) => {
    if (!selectedGroupId) {
      return;
    }

    const response = await fetch(
      `/api/admin/groups/${selectedGroupId}/members`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ membershipId, role }),
      },
    );
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(payload.error ?? "Could not update role.");
      return;
    }

    setMessage("Role updated.");
    await loadMembers(selectedGroupId);
  };

  const handleRemoveMember = async (membershipId: string) => {
    if (!selectedGroupId) {
      return;
    }

    const response = await fetch(
      `/api/admin/groups/${selectedGroupId}/members`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ membershipId }),
      },
    );
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(payload.error ?? "Could not remove member.");
      return;
    }

    setMessage("Member removed.");
    await loadMembers(selectedGroupId);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Groups
        </h2>

        {isAdmin ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={newGroupName}
              onChange={(event) => {
                setNewGroupName(event.target.value);
              }}
              placeholder="New group name"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
            />
            <Button onClick={() => void handleCreateGroup()}>Add group</Button>
          </div>
        ) : null}

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Selected group
            <select
              value={selectedGroupId}
              onChange={(event) => {
                handleSelectGroup(event.target.value);
              }}
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="">Select a group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isAdmin && selectedGroupId ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={deleteMembers}
                onChange={(event) => {
                  setDeleteMembers(event.target.checked);
                }}
              />
              Also delete all users in this group
            </label>
            <Button variant="outline" onClick={() => void handleDeleteGroup()}>
              Delete group
            </Button>
          </div>
        ) : null}
      </section>

      {selectedGroupId ? (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Group members
          </h2>

          <div className="mt-4 flex flex-col gap-3 lg:flex-row">
            <input
              value={memberEmail}
              onChange={(event) => {
                setMemberEmail(event.target.value);
              }}
              placeholder="user@example.com"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
            />
            <select
              value={memberRole}
              onChange={(event) => {
                setMemberRole(event.target.value);
              }}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
            >
              {GROUP_ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <Button onClick={() => void handleAddMember()}>Add member</Button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.membership.id}
                    className="border-b border-gray-100 dark:border-gray-800/80"
                  >
                    <td className="px-3 py-2">
                      {member.user?.email ?? member.membership.userId}
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={member.membership.role}
                        onChange={(event) => {
                          void handleRoleChange(
                            member.membership.id,
                            event.target.value,
                          );
                        }}
                        className="rounded-lg border border-gray-200 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950"
                      >
                        {GROUP_ROLE_OPTIONS.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          void handleRemoveMember(member.membership.id);
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {message ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
      ) : null}
    </div>
  );
}
