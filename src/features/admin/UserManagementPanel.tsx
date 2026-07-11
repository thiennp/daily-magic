"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import UsersTable, {
  type UserItem,
} from "@/features/admin/components/UsersTable";
import ConfirmDestructiveModal from "@/features/shell/ConfirmDestructiveModal";
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
  const [message, setMessage] = useState<string | null>(null);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const pendingUser = users.find((user) => user.id === pendingUserId);

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
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Only global admins can manage users.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Users
        </h2>
        <UsersTable
          users={users}
          currentUserId={session?.user?.id}
          onRemoveRequest={setPendingUserId}
        />
      </section>

      {message ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
      ) : null}

      <ConfirmDestructiveModal
        isOpen={pendingUserId !== null}
        title="Remove user?"
        description={`Permanently remove ${pendingUser?.email ?? "this user"} from Daily Magic.`}
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
