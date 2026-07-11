"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { isPrivilegedGlobalRole } from "@/lib/auth/roles";

interface UserItem {
  readonly id: string;
  readonly email: string;
  readonly name: string | null;
  readonly globalRole: string;
}

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

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Global role</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 dark:border-gray-800/80"
                >
                  <td className="px-3 py-2">{user.email}</td>
                  <td className="px-3 py-2">{user.globalRole}</td>
                  <td className="px-3 py-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={user.id === session?.user?.id}
                      onClick={() => {
                        void handleDeleteUser(user.id);
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

      {message ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
      ) : null}
    </div>
  );
}
