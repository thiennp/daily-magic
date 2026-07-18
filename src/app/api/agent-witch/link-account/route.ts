import {
  getAgentWitchHub,
  getAgentWitchPairingStore,
} from "@/lib/agentWitch/getAgentWitchHub";
import { verifyLinkAccountToken } from "@/lib/agentWitch/linkAccountToken";
import { asRowArray, getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

interface LinkAccountBody {
  readonly pairingToken: string;
  readonly linkToken: string;
  readonly deviceLabel: string | null;
}

const parseLinkAccountBody = (body: unknown): LinkAccountBody | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const pairingToken =
    typeof record.pairingToken === "string" ? record.pairingToken.trim() : "";
  const linkToken =
    typeof record.linkToken === "string" ? record.linkToken.trim() : "";
  const deviceLabel =
    typeof record.deviceLabel === "string" &&
    record.deviceLabel.trim().length > 0
      ? record.deviceLabel.trim()
      : null;

  if (pairingToken.length === 0 || linkToken.length === 0) {
    return null;
  }

  return { pairingToken, linkToken, deviceLabel };
};

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json();
  const parsed = parseLinkAccountBody(body);

  if (parsed === null) {
    return Response.json(
      { error: "pairingToken and linkToken are required." },
      { status: 400 },
    );
  }

  const { pairingToken, linkToken, deviceLabel } = parsed;
  const verifiedLink = verifyLinkAccountToken(linkToken);
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

  const pairingStore = getAgentWitchPairingStore();
  const claimResult = await pairingStore.claimPairing(
    pairingToken,
    userRow.id,
    userRow.email,
    deviceLabel ?? "Mac",
  );

  if (!claimResult.success) {
    return Response.json(
      { error: claimResult.errorMessage ?? "Could not link this Mac." },
      { status: 409 },
    );
  }

  getAgentWitchHub().bindAgentClientsToPairing(pairingToken);

  return Response.json({
    ok: true,
    email: userRow.email.trim().toLowerCase(),
    userId: userRow.id,
  });
}
