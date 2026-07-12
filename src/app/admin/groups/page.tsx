import { redirect } from "next/navigation";

import AdminGroupsPageLayout from "@/features/pages/layouts/AdminGroupsPageLayout";
import AppShell from "@/features/shell/AppShell";
import { getAuthActor } from "@/lib/auth/auth";
import {
  listGroups,
  listManageableGroupsForUser,
} from "@/lib/auth/groupQueries";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";

export default async function AdminGroupsPage() {
  const actor = await getAuthActor();

  if (!actor) {
    redirect("/login?callbackUrl=/admin/groups");
  }

  const groups = isGlobalAdmin(actor)
    ? await listGroups()
    : await listManageableGroupsForUser(actor.id);

  return (
    <AppShell>
      <AdminGroupsPageLayout initialGroups={groups} />
    </AppShell>
  );
}
