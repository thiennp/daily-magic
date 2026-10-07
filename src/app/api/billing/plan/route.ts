import { requireAuth } from "@/lib/auth/requireAuth";
import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import { loadEntitlementsForUser } from "@/lib/billing/loadEntitlementsForUser";

export const dynamic = "force-dynamic";

/** GET — Account → Billing summary. No infra euros. */
export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const [row, entitlements] = await Promise.all([
    loadBillingPlanForUser(actor.id),
    loadEntitlementsForUser(actor.id),
  ]);
  return Response.json({
    ...entitlements,
    trialStartedAt: row.trialStartedAt,
    cancelAnytime: true,
    hasStripeCustomer: row.stripeCustomerId != null,
  });
}
