import { canManageAllUsers } from "@/lib/auth/globalRolePermissions";
import { requireAuth } from "@/lib/auth/requireAuth";
import { isBillingPlan } from "@/lib/billing/isBillingPlan";
import { setPlanForUser } from "@/lib/billing/setPlanForUser";
import type { BillingPlan } from "@/lib/billing/types/BillingPlan.type";

export const dynamic = "force-dynamic";

/** POST { userId, plan, seatCount?, expiresAt? } — admin-only plan override (no Stripe).
 * expiresAt accepted as optional (null/omitted) but not persisted without mig (no plan_override_expires_at).
 */
export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  if (!canManageAllUsers(actor)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const body: unknown = await request.json().catch(() => null);
  const userId =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { userId?: unknown }).userId === "string"
      ? (body as { userId: string }).userId.trim()
      : "";
  const planRaw =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { plan?: unknown }).plan === "string"
      ? (body as { plan: string }).plan.trim()
      : "";
  if (!userId || !planRaw) {
    return Response.json(
      { error: "userId and plan are required." },
      { status: 400 },
    );
  }
  if (!isBillingPlan(planRaw)) {
    return Response.json(
      { error: "plan must be trial, pro, team, or admin_free." },
      { status: 400 },
    );
  }
  const plan: BillingPlan = planRaw;
  let seatCount: number | undefined;
  if (
    body !== null &&
    typeof body === "object" &&
    "seatCount" in body &&
    (body as { seatCount?: unknown }).seatCount !== undefined &&
    (body as { seatCount?: unknown }).seatCount !== null
  ) {
    const raw = (body as { seatCount: unknown }).seatCount;
    if (typeof raw !== "number" || !Number.isInteger(raw) || raw < 1) {
      return Response.json(
        { error: "seatCount must be an integer >= 1." },
        { status: 400 },
      );
    }
    seatCount = raw;
  }
  // Optional expiresAt: accepted, not persisted (no mig for plan_override_expires_at).
  const result = await setPlanForUser({ userId, plan, seatCount });
  if (!result.ok) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }
  const adminFree = plan === "admin_free";
  return Response.json({
    ok: true,
    userId,
    plan,
    adminFree,
    seatCount: result.seatCount,
    expiresAt: null,
  });
}
