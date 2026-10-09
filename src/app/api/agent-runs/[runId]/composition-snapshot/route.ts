import listRunScopedEntriesFromAgentRun from "@/lib/projects/composition/listRunScopedEntriesFromAgentRun";
import { getSql, asRowArray } from "@/lib/db";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ readonly runId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { runId } = await context.params;
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT requester_user_id, executor_user_id, project_id
      FROM agent_runs
      WHERE id = ${runId.trim()}
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return Response.json(
      { ok: false, errorMessage: "Run not found." },
      { status: 404 },
    );
  }

  const requesterUserId = String(rows[0].requester_user_id);
  const executorUserId = String(rows[0].executor_user_id);

  if (actor.id !== requesterUserId && actor.id !== executorUserId) {
    return Response.json(
      { ok: false, errorMessage: "Run not found." },
      { status: 404 },
    );
  }

  const runScopedEntries = await listRunScopedEntriesFromAgentRun(runId.trim());

  // Keeping components on the project is an owner action (keep-scoped-components).
  const projectId = rows[0].project_id ? String(rows[0].project_id) : null;
  const project =
    projectId === null ? null : await getUserProjectById(projectId);

  return Response.json({
    ok: true,
    runScopedCount: runScopedEntries.length,
    canKeep: project !== null && project.ownerUserId === actor.id,
  });
}
