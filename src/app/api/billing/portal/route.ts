import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/** POST — Stripe customer portal stub (Soft tip). */
export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  return Response.json(
    {
      ok: false,
      code: "portal_stub",
      errorMessage:
        "The billing portal is not connected yet. Try again after checkout is live.",
    },
    { status: 501 },
  );
}
