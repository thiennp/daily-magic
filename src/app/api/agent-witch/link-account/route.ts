import { clearPendingAccountLinkForEmail } from "@/lib/agentWitch/pendingAccountLinkRegistry";
import {
  getAgentWitchHub,
  getAgentWitchPairingStore,
} from "@/lib/agentWitch/getAgentWitchHub";
import { verifyLinkAccountToken } from "@/lib/agentWitch/linkAccountToken";
import { parseLinkAccountBody } from "@/lib/agentWitch/parseLinkAccountBody";
import { asRowArray, getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const parsed = parseLinkAccountBody(await request.json());

  if (parsed === null) {
    return Response.json(
      { error: "pairingToken and linkToken are required." },
      { status: 400 },
    );
  }

  const verifiedLink = verifyLinkAccountToken(parsed.linkToken);
  if (verifiedLink === null) {
    return Response.json(
      { error: "Link token is invalid or expired." },
      { status: 403 },
    );
  }

  const sql = getSql();
  const userRows = asRowArray(
    await sql`
      SELECT id, email
      FROM users
      WHERE id = ${verifiedLink.userId}
      LIMIT 1
    `,
  );
  const userRow = userRows[0] as { id: string; email: string } | undefined;

  if (
    userRow === undefined ||
    userRow.email.trim().toLowerCase() !== verifiedLink.email
  ) {
    return Response.json(
      { error: "Link token is not valid." },
      { status: 403 },
    );
  }

  const claimResult = await getAgentWitchPairingStore().claimPairing(
    parsed.pairingToken,
    userRow.id,
    userRow.email,
    parsed.deviceLabel ?? "Mac",
  );

  if (!claimResult.success) {
    return Response.json(
      { error: claimResult.errorMessage ?? "Could not link this Mac." },
      { status: 409 },
    );
  }

  clearPendingAccountLinkForEmail(userRow.email);
  getAgentWitchHub().bindAgentClientsToPairing(parsed.pairingToken);

  return Response.json({
    ok: true,
    email: userRow.email.trim().toLowerCase(),
    userId: userRow.id,
  });
}
