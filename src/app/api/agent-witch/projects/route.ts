import { getUserById } from "@/lib/auth/userRepository";
import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { ensureDefaultUserProject } from "@/lib/projects/ensureDefaultUserProject";
import { parseCreateUserProjectBody } from "@/lib/projects/parseUserProjectBody";
import { createUserProject } from "@/lib/projects/userProjectMutations";
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

export async function POST(request: Request): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const user = await getUserById(auth.device.userId);

  if (user === null || user.email.trim().length === 0) {
    return Response.json(
      { ok: false, errorMessage: "Device owner account not found." },
      { status: 500 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = parseCreateUserProjectBody(body, user.email);

  if (parsed === null) {
    return Response.json(
      { ok: false, errorMessage: "Invalid project payload." },
      { status: 400 },
    );
  }

  try {
    const project = await createUserProject(auth.device.userId, {
      name: parsed.name,
      folderPath: parsed.folderPath,
      deviceId: parsed.deviceId ?? auth.device.id,
    });

    if (project === null) {
      return Response.json(
        { ok: false, errorMessage: "Could not save project." },
        { status: 500 },
      );
    }

    return Response.json({
      ok: true,
      project: {
        id: project.id,
        name: project.name,
        folderPath: project.folderPath,
      },
    });
  } catch (caught) {
    const message =
      caught instanceof Error &&
      caught.message.includes("user_projects_owner_name_idx")
        ? "You already have a project with that name."
        : "Could not save project.";

    return Response.json({ ok: false, errorMessage: message }, { status: 409 });
  }
}
