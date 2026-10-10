"use client";

import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import AdminNoAccess from "@/features/admin/components/AdminNoAccess";
import AdminUsersToolbar from "@/features/admin/components/AdminUsersToolbar";
import UsersTable, {
  type UserItem,
} from "@/features/admin/components/UsersTable";
import {
  ADMIN_COPY,
  ADMIN_USERS_PAGE_SIZE,
} from "@/features/admin/adminCopy.constant";
import {
  ADMIN_USER_KIND_FILTER_ALL,
  type AdminUserKindFilter,
} from "@/features/admin/utils/public-api/types";
import { filterAdminUsersByKind } from "@/features/admin/utils/public-api/presentation";
import { filterAdminUsersBySearch } from "@/features/admin/utils/public-api/presentation";
import { useAdminUserActions } from "@/features/admin/hooks/public-api/presentation";
import { PROJECT_V5_H1_CLASS } from "@/features/projects/projectPageV5ChromeClasses.constant";
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
  const { users, message, deleteUser } = useAdminUserActions(initialUsers);
  const [kindFilter, setKindFilter] = useState<AdminUserKindFilter>(
    ADMIN_USER_KIND_FILTER_ALL,
  );
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(ADMIN_USERS_PAGE_SIZE);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const pendingUser = users.find((user) => user.id === pendingUserId);
  const matches = useMemo(
    () =>
      filterAdminUsersBySearch(
        filterAdminUsersByKind(users, kindFilter),
        query,
      ),
    [users, kindFilter, query],
  );

  if (!isAdmin) {
    return <AdminNoAccess what={ADMIN_COPY.usersOnlyAdmins} />;
  }

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className={PROJECT_V5_H1_CLASS}>{ADMIN_COPY.title}</h1>
        <p className="text-sm text-awc-fg-muted">{ADMIN_COPY.description}</p>
      </header>
      <AppPanel padding="compact" aria-labelledby="us-h">
        <h2 id="us-h" className="text-lg font-semibold text-awc-fg">
          {ADMIN_COPY.usersTitle}
        </h2>
        <AdminUsersToolbar
          query={query}
          kindFilter={kindFilter}
          count={matches.length}
          onQueryChange={(value) => {
            setQuery(value);
            setShown(ADMIN_USERS_PAGE_SIZE);
          }}
          onKindChange={setKindFilter}
        />
        {matches.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-awc-border-strong bg-awc-surface-2 px-4 py-6 text-center">
            <h3 className="text-base font-semibold text-awc-fg">
              {ADMIN_COPY.noUsersTitle}
            </h3>
            <p className="text-sm text-awc-fg-muted">
              {ADMIN_COPY.noUsersBody}
            </p>
          </div>
        ) : (
          <UsersTable
            users={matches.slice(0, shown)}
            currentUserId={session?.user?.id}
            onRemoveRequest={setPendingUserId}
          />
        )}
        {matches.length > shown ? (
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setShown((n) => n + ADMIN_USERS_PAGE_SIZE);
              }}
            >
              {ADMIN_COPY.showMore}
            </Button>
          </div>
        ) : null}
      </AppPanel>

      <p role="status" className="text-sm text-awc-fg-muted empty:hidden">
        {message}
      </p>

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
            void deleteUser(pendingUserId);
          }
          setPendingUserId(null);
        }}
      />
    </div>
  );
}
