import { redirect } from "next/navigation";

import UserManagementPanel from "@/features/admin/UserManagementPanel";
import { getAuthActor } from "@/lib/auth/auth";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";
import listAdminUsers from "@/lib/auth/listAdminUsers";

export default async function AdminUsersPage() {
  const actor = await getAuthActor();

  if (!actor) {
    redirect("/login?callbackUrl=/admin/users");
  }

  const users = isGlobalAdmin(actor) ? await listAdminUsers() : [];

  return <UserManagementPanel initialUsers={users} />;
}
