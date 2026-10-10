import { redirect } from "next/navigation";

import { AdminNoAccess } from "@/features/admin/components/public-api/presentation";
import { ADMIN_COPY } from "@/features/admin/public-api/types";
import { AdminCostControlPanel } from "@/features/billing/public-api/presentation";
import { getAuthActor } from "@/lib/auth/auth";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";

export default async function AdminCostControlPage() {
  const actor = await getAuthActor();

  if (!actor) {
    redirect("/login?callbackUrl=/admin/cost-control");
  }

  if (!isGlobalAdmin(actor)) {
    return <AdminNoAccess what={ADMIN_COPY.costOnlyAdmins} />;
  }

  return <AdminCostControlPanel />;
}
