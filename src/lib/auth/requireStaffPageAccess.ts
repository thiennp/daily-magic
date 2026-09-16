import { notFound } from "next/navigation";

import { getAuthActor } from "@/lib/auth/auth";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";
import type AuthActor from "@/lib/auth/types/AuthActor.type";

/**
 * Staff-only pages (styleguide, internal labs). Anonymous and non-admin users get 404.
 */
export async function requireStaffPageAccess(): Promise<AuthActor> {
  const actor = await getAuthActor();

  if (!actor || !isGlobalAdmin(actor)) {
    notFound();
  }

  return actor;
}
