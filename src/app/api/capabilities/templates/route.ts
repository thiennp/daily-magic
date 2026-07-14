import { listCapabilityTemplateSummaries } from "@/lib/capabilities/templates/listCapabilityTemplates";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return Response.json({
    ok: true,
    templates: listCapabilityTemplateSummaries(),
  });
}
