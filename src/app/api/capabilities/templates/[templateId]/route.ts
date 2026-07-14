import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { toCapabilityTemplateDetail } from "@/lib/capabilities/templates/listCapabilityTemplates";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ templateId: string }> },
): Promise<Response> {
  const { templateId } = await context.params;
  const template = findCapabilityTemplateById(templateId);

  if (template === undefined) {
    return Response.json({ error: "Template not found." }, { status: 404 });
  }

  return Response.json({
    ok: true,
    template: toCapabilityTemplateDetail(template),
  });
}
