import { getUserById } from "@/lib/auth/userRepository";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { ensureDefaultUserProject } from "@/lib/projects/ensureDefaultUserProject";
import { listUserProjectsForOwner } from "@/lib/projects/userProjectQueries";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const user = await getUserById(auth.device.userId);

  if (user === null || user.email.trim().length === 0) {
    return Response.json(
      { ok: false, error: "Device owner account not found." },
      { status: 500 },
    );
  }

  await ensureDefaultUserProject(
    auth.device.userId,
    user.email,
    auth.device.id,
  );

  const projects = await listUserProjectsForOwner(
    auth.device.userId,
    auth.device.id,
  );

  return Response.json({
    ok: true,
    projects: projects.map((project) => ({
      id: project.id,
      name: project.name,
      folderPath: project.folderPath,
    })),
  });
}
