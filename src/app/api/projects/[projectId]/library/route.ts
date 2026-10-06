import { filterProjectLibraryCapabilitiesForRole } from "@/lib/capabilities/filterProjectLibraryCapabilitiesForRole";
import { listPublishedCapabilitiesForProject } from "@/lib/capabilities/listPublishedCapabilitiesForProject";
import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

export const dynamic = "force-dynamic";

/**
 * GET: project Library playbooks/workflows for a page actor.
 * Owner sees drafts + published; member/viewer published only; else 404.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId } = await context.params;
  const access = await authorizeProjectPageActor({
    projectId: projectId.trim(),
    actorUserId: actor.id,
  });
  if (!access.ok) {
    return Response.json({ error: "Project not found." }, { status: 404 });
  }
  const all = await listPublishedCapabilitiesForProject(access.project.id);
  const capabilities = filterProjectLibraryCapabilitiesForRole(
    all,
    access.role,
  );
  return Response.json({
    ok: true,
    projectId: access.project.id,
    role: access.role,
    capabilities,
  });
}
