import { connection } from "next/server";
import { notFound } from "next/navigation";

import { getAuthActor } from "@/lib/auth/auth";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";
import type AuthActor from "@/lib/auth/types/AuthActor.type";

/**
 * True when the request may view staff-only surfaces (global admin session).
 * Calls {@link connection} so auth works on otherwise static App Router segments.
 */
export async function isStaffPageViewer(): Promise<boolean> {
  await connection();
  const actor = await getAuthActor();

  return actor !== null && isGlobalAdmin(actor);
}

/**
 * Staff-only pages (styleguide, internal labs). Anonymous and non-admin users get 404.
 */
export async function requireStaffPageAccess(): Promise<AuthActor> {
  await connection();
  const actor = await getAuthActor();

  if (!actor || !isGlobalAdmin(actor)) {
    notFound();
  }

  return actor;
}
