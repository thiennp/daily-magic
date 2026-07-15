import {
  handleAgentWitchInstructionsGet,
  resolveAgentWitchInstructionsAppOrigin,
} from "@/lib/agentWitch/instructions/handleAgentWitchInstructionsGet";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const requestHeaders = await headers();
  const appOrigin = resolveAgentWitchInstructionsAppOrigin(requestHeaders);

  return handleAgentWitchInstructionsGet(request, appOrigin);
}
