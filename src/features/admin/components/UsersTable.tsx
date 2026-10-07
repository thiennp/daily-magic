"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AdminSetFreeButton from "@/features/billing/components/AdminSetFreeButton";
import formatAdminUserKindLabel from "@/features/admin/utils/formatAdminUserKindLabel";
import formatAdminUserLastActivity from "@/features/admin/utils/formatAdminUserLastActivity";
import formatGlobalRole from "@/lib/auth/formatGlobalRole";
import type AdminUserRecord from "@/lib/auth/types/AdminUserRecord.type";

type UserItem = AdminUserRecord & { readonly adminFree?: boolean };

interface UsersTableProps {
  readonly users: readonly UserItem[];
  readonly currentUserId?: string;
  readonly onRemoveRequest: (userId: string) => void;
}

export default function UsersTable({
  users,
  currentUserId,
  onRemoveRequest,
}: UsersTableProps) {
  const [freeByUserId, setFreeByUserId] = useState<Record<string, boolean>>({});

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Kind</th>
            <th className="px-3 py-2">Global role</th>
            <th className="px-3 py-2">Last activity</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const adminFree =
              freeByUserId[user.id] ?? user.adminFree ?? false;
            return (
              <tr
                key={user.id}
                className="border-b border-gray-100 dark:border-gray-800/80"
              >
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2">
                  {formatAdminUserKindLabel(user.kind)}
                </td>
                <td className="px-3 py-2">
                  {formatGlobalRole(user.globalRole)}
                </td>
                <td className="px-3 py-2">
                  {formatAdminUserLastActivity(user.lastActivityAt)}
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                    <AdminSetFreeButton
                      userId={user.id}
                      adminFree={adminFree}
                      onUpdated={() => {
                        setFreeByUserId((prev) => ({
                          ...prev,
                          [user.id]: !adminFree,
                        }));
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={user.id === currentUserId}
                      onClick={() => {
                        onRemoveRequest(user.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export type { UserItem };
