"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AdminSetPlanControl from "@/features/billing/components/AdminSetPlanControl";
import AdminCostControlExcludeCheckbox from "@/features/billing/components/AdminCostControlExcludeCheckbox";
import type { BillingPlanId } from "@/features/billing/billingPlan.types";
import formatBillingPlanLabel from "@/features/billing/formatBillingPlanLabel";
import formatAdminUserKindLabel from "@/features/admin/utils/formatAdminUserKindLabel";
import formatAdminUserLastActivity from "@/features/admin/utils/formatAdminUserLastActivity";
import formatGlobalRole from "@/lib/auth/formatGlobalRole";
import type AdminUserRecord from "@/lib/auth/types/AdminUserRecord.type";

type UserItem = AdminUserRecord & {
  readonly plan: BillingPlanId;
  readonly adminFree: boolean;
  readonly costControlExcluded?: boolean;
};

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
  const [planByUserId, setPlanByUserId] = useState<
    Record<string, BillingPlanId>
  >({});

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-awc-border">
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Kind</th>
            <th className="px-3 py-2">Global role</th>
            <th className="px-3 py-2">Plan</th>
            <th className="px-3 py-2">Last activity</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const plan = planByUserId[user.id] ?? user.plan ?? "trial";
            return (
              <tr key={user.id} className="border-b border-awc-border">
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2">
                  {formatAdminUserKindLabel(user.kind)}
                </td>
                <td className="px-3 py-2">
                  {formatGlobalRole(user.globalRole)}
                </td>
                <td className="px-3 py-2">{formatBillingPlanLabel(plan)}</td>
                <td className="px-3 py-2">
                  {formatAdminUserLastActivity(user.lastActivityAt)}
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                    <AdminSetPlanControl
                      key={`${user.id}-${plan}`}
                      userId={user.id}
                      plan={plan}
                      onUpdated={(next) => {
                        setPlanByUserId((prev) => ({
                          ...prev,
                          [user.id]: next.plan,
                        }));
                      }}
                    />
                    <AdminCostControlExcludeCheckbox
                      userId={user.id}
                      email={user.email}
                      excluded={user.costControlExcluded ?? false}
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
