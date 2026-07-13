import { createLinkAccountToken } from "@/lib/agentWitch/linkAccountToken";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const linkToken = createLinkAccountToken(actor.id, actor.email);
  if (linkToken === null) {
    return Response.json(
      { error: "Account linking is not configured on this server." },
      { status: 503 },
    );
  }

  return Response.json({
    ok: true,
    linkToken,
    email: actor.email.trim().toLowerCase(),
  });
}
