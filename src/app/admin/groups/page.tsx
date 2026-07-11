import { redirect } from "next/navigation";

import GroupManagementPanel from "@/features/admin/GroupManagementPanel";
import { getAuthActor } from "@/lib/auth/auth";
import {
  listGroups,
  listManageableGroupsForUser,
} from "@/lib/auth/groupRepository";
import { isGlobalAdmin } from "@/lib/auth/permissions";

export default async function AdminGroupsPage() {
  const actor = await getAuthActor();

  if (!actor) {
    redirect("/login?callbackUrl=/admin/groups");
  }

  const groups = isGlobalAdmin(actor)
    ? await listGroups()
    : await listManageableGroupsForUser(actor.id);

  return <GroupManagementPanel initialGroups={groups} />;
}
