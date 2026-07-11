import { redirect } from "next/navigation";

import UserManagementPanel from "@/features/admin/UserManagementPanel";
import { getAuthActor } from "@/lib/auth/auth";
import { isGlobalAdmin } from "@/lib/auth/permissions";
import { listUsers } from "@/lib/auth/userRepository";

export default async function AdminUsersPage() {
  const actor = await getAuthActor();

  if (!actor) {
    redirect("/login?callbackUrl=/admin/users");
  }

  const users = isGlobalAdmin(actor) ? await listUsers() : [];

  return <UserManagementPanel initialUsers={users} />;
}
