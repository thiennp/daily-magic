import { NextResponse } from "next/server";

import { getAgentWitchServerPublicKeyRaw } from "@/lib/agentWitch/deviceAuth/agentWitchServerSigningKey";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return NextResponse.json({
    ok: true,
    publicKey: getAgentWitchServerPublicKeyRaw(),
    algorithm: "Ed25519",
  });
}
