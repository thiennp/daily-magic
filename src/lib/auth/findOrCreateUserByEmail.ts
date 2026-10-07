import type { AdapterUser } from "next-auth/adapters";

import { createNeonAuthAdapter } from "@/lib/auth/neonAdapter";
import isTestAgentWitchEmail from "@/lib/auth/isTestAgentWitchEmail";
import { BillingGateError } from "@/lib/billing/billingGateError";
import { isTrialEntitlementGranted } from "@/lib/billing/isTrialEntitlementGranted";
import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import { appendE2eCleanupLogForTestEmail } from "@/lib/e2e/appendE2eCleanupLog";

const assertUsableTrialSession = async (userId: string): Promise<void> => {
  const row = await loadBillingPlanForUser(userId);
  if (isTrialEntitlementGranted(row)) return;
  throw new BillingGateError({
    ok: false,
    code: "trial_closed",
    errorMessage: "Trial capacity is full. Choose Pro or Team to continue.",
  });
};

const findOrCreateUserByEmail = async (
  email: string,
): Promise<AdapterUser | null> => {
  const adapter = createNeonAuthAdapter();
  const existingUser = await adapter.getUserByEmail?.(email);

  if (existingUser) {
    if (existingUser.id) {
      await assertUsableTrialSession(existingUser.id);
    }
    return existingUser;
  }

  const newUser = {
    email,
    emailVerified: new Date(),
    name: email.split("@")[0] ?? email,
  };

  const created = (await adapter.createUser?.(newUser as AdapterUser)) ?? null;

  if (created?.id && isTestAgentWitchEmail(email)) {
    appendE2eCleanupLogForTestEmail({
      email,
      kind: "user.created",
      entityType: "users",
      entityId: created.id,
    });
  }

  if (created?.id) {
    await assertUsableTrialSession(created.id);
  }

  return created;
};

export default findOrCreateUserByEmail;
