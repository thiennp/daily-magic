import {
  canManageAutoSkills,
  getAutoSkillsDeviceView,
} from "@/features/project-auto-skills/public-api/infrastructure";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { loadDueSkillChecks } from "@/lib/knowledge/skillUses/loadDueSkillChecks";
import { recordSkillCheckResult } from "@/lib/knowledge/skillUses/recordSkillCheckResult";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

const DUE_CHECKS_PER_REQUEST = 3;

/** Device may judge checks only when auto skills are on and its owner may manage them. */
const allowed = async (projectId: string, userId: string): Promise<boolean> =>
  (await canManageAutoSkills({ projectId, actorUserId: userId })) &&
  (await getAutoSkillsDeviceView({ projectId, actorUserId: userId })).enabled;

/** Device GET: skill checks waiting for a judge, with the skill text and the runs to review. */
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const projectId = (await context.params).projectId.trim();
  if (!(await allowed(projectId, auth.device.userId))) {
    return Response.json({ ok: true, checks: [] });
  }
  return Response.json({
    ok: true,
    checks: await loadDueSkillChecks(projectId, DUE_CHECKS_PER_REQUEST),
  });
}

/** Device POST: `{checkId, verdict: "fine" | "improve", note, proposedBody?}`. */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const projectId = (await context.params).projectId.trim();
  if (!(await allowed(projectId, auth.device.userId))) {
    return Response.json(
      { ok: false, errorMessage: "forbidden" },
      { status: 403 },
    );
  }
  const body = (await request.json().catch(() => null)) as {
    checkId?: unknown;
    verdict?: unknown;
    note?: unknown;
    proposedBody?: unknown;
  } | null;
  if (
    typeof body?.checkId !== "number" ||
    !Number.isInteger(body.checkId) ||
    (body.verdict !== "fine" && body.verdict !== "improve") ||
    typeof body.note !== "string"
  ) {
    return Response.json(
      { ok: false, errorMessage: "invalid_arguments" },
      { status: 400 },
    );
  }
  const recorded = await recordSkillCheckResult(projectId, {
    checkId: body.checkId,
    verdict: body.verdict,
    note: body.note,
    proposedBody:
      typeof body.proposedBody === "string" ? body.proposedBody : null,
  });
  return Response.json(
    recorded ? { ok: true } : { ok: false, errorMessage: "not_due" },
    { status: recorded ? 200 : 409 },
  );
}
