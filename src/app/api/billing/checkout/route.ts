import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/** POST — Stripe checkout stub (Soft tip). */
export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  return Response.json(
    {
      ok: false,
      code: "checkout_stub",
      errorMessage: "Checkout is not connected yet. Billing will open here soon.",
    },
    { status: 501 },
  );
}
