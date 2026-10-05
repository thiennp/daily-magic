import type DeleteProjectDbOnlyResult from "@/lib/projects/delete/types/DeleteProjectDbOnlyResult.type";

/** HTTP shape: 200 deleted, 404 unknown or not owner, 400 Default project. */
const mapDeleteProjectDbOnlyResultToResponse = (
  result: DeleteProjectDbOnlyResult,
): Response => {
  if (result.ok) {
    return Response.json({ ok: true, projectId: result.projectId });
  }
  if (result.code === "default_project") {
    return Response.json(
      { ok: false, errorMessage: "The Default project cannot be deleted." },
      { status: 400 },
    );
  }

  return Response.json(
    { ok: false, errorMessage: "Project not found." },
    { status: 404 },
  );
};

export default mapDeleteProjectDbOnlyResultToResponse;
