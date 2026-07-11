import type { Adapter, AdapterAccount } from "next-auth/adapters";

import { createNeonAccountAdapterMethods } from "@/lib/auth/neonAdapter/createNeonAccountAdapterMethods";
import { createNeonSessionAdapterMethods } from "@/lib/auth/neonAdapter/createNeonSessionAdapterMethods";
import { createNeonUserAdapterMethods } from "@/lib/auth/neonAdapter/createNeonUserAdapterMethods";
import { createNeonVerificationTokenAdapterMethods } from "@/lib/auth/neonAdapter/createNeonVerificationTokenAdapterMethods";

export { ensureSuperAdminGlobalRole } from "@/lib/auth/neonAdapter/ensureSuperAdminGlobalRole";
export type { AdapterUser } from "next-auth/adapters";

export function createNeonAuthAdapter(): Adapter {
  return {
    ...createNeonUserAdapterMethods(),
    ...createNeonAccountAdapterMethods(),
    ...createNeonSessionAdapterMethods(),
    ...createNeonVerificationTokenAdapterMethods(),
  };
}

export type { AdapterAccount };
