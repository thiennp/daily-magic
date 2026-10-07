"use client";

import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import UsersKindFilter from "@/features/admin/components/UsersKindFilter";
import UsersTable, {
  type UserItem,
} from "@/features/admin/components/UsersTable";
import {
  ADMIN_USER_KIND_FILTER_ALL,
  type AdminUserKindFilter,
} from "@/features/admin/utils/adminUserKindLabels.constant";
import filterAdminUsersByKind from "@/features/admin/utils/filterAdminUsersByKind";
import ConfirmDestructiveModal from "@/features/shell/ConfirmDestructiveModal";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { isPrivilegedGlobalRole } from "@/lib/auth/roles";

interface UserManagementPanelProps {
  readonly initialUsers: readonly UserItem[];
}

export default function UserManagementPanel({
  initialUsers,
}: UserManagementPanelProps) {
  const { data: session } = useSession();
  const isAdmin =
    session?.user?.globalRole &&
    isPrivilegedGlobalRole(session.user.globalRole);
  const [users, setUsers] = useState<readonly UserItem[]>(initialUsers);
  const [kindFilter, setKindFilter] = useState<AdminUserKindFilter>(
    ADMIN_USER_KIND_FILTER_ALL,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const pendingUser = users.find((user) => user.id === pendingUserId);
  const visibleUsers = useMemo(
    () => filterAdminUsersByKind(users, kindFilter),
    [users, kindFilter],
  );

  const loadUsers = async () => {
    const response = await fetch("/api/admin/users");
    const payload = (await response.json()) as {
      users?: UserItem[];
      error?: string;
    };

    if (!response.ok) {
      setMessage(payload.error ?? "Could not load users.");
      return;
    }

    setUsers(payload.users ?? []);
  };

  const handleDeleteUser = async (userId: string) => {
    const response = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(payload.error ?? "Could not delete user.");
      return;
    }

    setMessage("User deleted.");
    await loadUsers();
  };

  if (!isAdmin) {
    return (
      <p className="text-sm text-awc-fg-muted">
        Only global admins can manage users.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <AppPanel padding="compact">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-awc-fg">
            Users
          </h2>
          <UsersKindFilter value={kindFilter} onChange={setKindFilter} />
        </div>
        <UsersTable
          users={visibleUsers}
          currentUserId={session?.user?.id}
          onRemoveRequest={setPendingUserId}
        />
      </AppPanel>

      {message ? (
        <p className="text-sm text-awc-fg-muted">{message}</p>
      ) : null}

      <ConfirmDestructiveModal
        isOpen={pendingUserId !== null}
        title="Remove user?"
        description={`Permanently remove ${pendingUser?.email ?? "this user"} from ${AGENT_WITCH_PRODUCT_NAME}.`}
        confirmLabel="Remove user"
        onClose={() => {
          setPendingUserId(null);
        }}
        onConfirm={() => {
          if (pendingUserId !== null) {
            void handleDeleteUser(pendingUserId);
          }
          setPendingUserId(null);
        }}
      />
    </div>
  );
}
