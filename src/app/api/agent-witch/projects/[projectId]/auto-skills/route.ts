import {
  getAutoSkillsDeviceView,
  recordAutoSkillsStatus,
  sanitizeScriptInfo,
  upsertAutoSkillSuggestion,
} from "@/features/project-auto-skills/public-api/infrastructure";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

const str = (v: unknown, max: number): string | null =>
  typeof v === "string" && v.trim().length > 0 ? v.slice(0, max) : null;

/** Device GET: owner toggles + which clusters are pending / saved / never. */
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const { projectId } = await context.params;
  const view = await getAutoSkillsDeviceView({
    projectId: projectId.trim(),
    actorUserId: auth.device.userId,
  });
  return Response.json(view);
}

/** Device POST: `{kind:"status"}` after each check, `{kind:"suggestion"}` to ask the owner. */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const { projectId: raw } = await context.params;
  const projectId = raw.trim();
  const view = await getAutoSkillsDeviceView({
    projectId,
    actorUserId: auth.device.userId,
  });
  if (!view.enabled) {
    return Response.json(
      { ok: false, errorMessage: "disabled" },
      { status: 403 },
    );
  }
  const body = (await request.json().catch(() => null)) as {
    kind?: string;
    status?: Record<string, unknown>;
    suggestion?: Record<string, unknown>;
  } | null;
  if (body?.kind === "status" && body.status !== undefined) {
    await recordAutoSkillsStatus(projectId, {
      judgeKind: str(body.status.judgeKind, 20),
      judgeLabel: str(body.status.judgeLabel, 120),
      pausedReason: str(body.status.pausedReason, 300),
      statusNote: str(body.status.note, 300),
    });
    return Response.json({ ok: true });
  }
  const s = body?.suggestion;
  const clusterId = str(s?.clusterId, 80);
  const draftBody = str(s?.draftBody, 500_000);
  const draftName = str(s?.draftName, 80);
  if (
    body?.kind !== "suggestion" ||
    !s ||
    !clusterId ||
    !draftBody ||
    !draftName
  ) {
    return Response.json(
      { ok: false, errorMessage: "invalid_arguments" },
      { status: 400 },
    );
  }
  const raised = await upsertAutoSkillSuggestion(projectId, {
    clusterId,
    title: str(s.title, 120) ?? draftName,
    prompt: str(s.prompt, 1_000) ?? "",
    occurrences: Math.max(2, Number(s.occurrences) || 2),
    moduleLabel: str(s.moduleLabel, 160),
    distinctPrompts: Number.isFinite(Number(s.distinctPrompts))
      ? Math.max(1, Number(s.distinctPrompts))
      : null,
    matches: Array.isArray(s.matches) ? s.matches.slice(0, 20) : [],
    draftName,
    draftBody,
    judgeLabel: str(s.judgeLabel, 120),
    kind: s.kind === "script_approval" ? "script_approval" : "skill",
    scriptInfo: sanitizeScriptInfo(s.scriptInfo),
  });
  return Response.json({ ok: true, raised });
}
