import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const parseTemplateId = (body: unknown): string | undefined => {
  if (typeof body !== "object" || body === null) {
    return undefined;
  }

  const templateId = (body as { templateId?: unknown }).templateId;

  return typeof templateId === "string" && templateId.trim().length > 0
    ? templateId.trim()
    : undefined;
};

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const templateId = parseTemplateId(await request.json());

  if (templateId === undefined) {
    return Response.json({ error: "templateId is required." }, { status: 400 });
  }

  const result = await createCapabilityFromTemplate(actor.id, templateId);

  if (result === null) {
    return Response.json({ error: "Template not found." }, { status: 404 });
  }

  return Response.json({
    ok: true,
    capability: result.capability,
    harness: result.harness,
    harnessInstalled: result.harnessInstalled,
    harnessInstallMessage: result.harnessInstallMessage,
  });
}
