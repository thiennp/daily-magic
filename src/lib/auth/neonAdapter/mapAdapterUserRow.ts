import type { AdapterUser } from "next-auth/adapters";

import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";
import { GlobalRole } from "@/lib/auth/roles";

export function mapAdapterUserRow(row: Record<string, unknown>): AdapterUser {
  return {
    id: String(row.id),
    email: String(row.email),
    emailVerified: row.email_verified
      ? new Date(String(row.email_verified))
      : null,
    name: row.name ? String(row.name) : null,
    image: row.image ? String(row.image) : null,
  };
}

export function resolveGlobalRole(email: string): string {
  if (email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
    return GlobalRole.SUPER_ADMIN;
  }

  return GlobalRole.USER;
}
