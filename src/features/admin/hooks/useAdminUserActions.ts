"use client";

import { useState } from "react";

import type { UserItem } from "@/features/admin/components/UsersTable";

export function useAdminUserActions(initialUsers: readonly UserItem[]) {
  const [users, setUsers] = useState<readonly UserItem[]>(initialUsers);
  const [message, setMessage] = useState<string | null>(null);

  const loadUsers = async (): Promise<void> => {
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

  const deleteUser = async (userId: string): Promise<void> => {
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

  return { users, message, deleteUser };
}
