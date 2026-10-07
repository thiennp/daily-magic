import { redirect } from "next/navigation";

import AdminCostControlPanel from "@/features/billing/components/AdminCostControlPanel";
import { getAuthActor } from "@/lib/auth/auth";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";

export default async function AdminCostControlPage() {
  const actor = await getAuthActor();

  if (!actor) {
    redirect("/login?callbackUrl=/admin/cost-control");
  }

  if (!isGlobalAdmin(actor)) {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Only global admins can view cost control.
      </p>
    );
  }

  return <AdminCostControlPanel />;
}
