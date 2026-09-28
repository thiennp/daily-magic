import { buildAgentWitchHealthPayload } from "@/lib/release/buildAgentWitchHealthPayload";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return Response.json(await buildAgentWitchHealthPayload());
}
