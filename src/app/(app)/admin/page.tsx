import { redirect } from "next/navigation";

import { AdminDashboard } from "@/features/admin/components/public-api/presentation";
import { getAuthActor } from "@/lib/auth/auth";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";

export default async function AdminPage() {
  const actor = await getAuthActor();

  if (!actor) {
    redirect("/login?callbackUrl=/admin");
  }

  if (!isGlobalAdmin(actor)) {
    redirect("/admin/groups");
  }

  return <AdminDashboard />;
}
