export type PatchUserProjectNameResult =
  | { readonly kind: "ok"; readonly name: string }
  | { readonly kind: "error"; readonly message: string };

const patchUserProjectName = async (
  projectId: string,
  name: string,
): Promise<PatchUserProjectNameResult> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      },
    );
    const body: unknown = await response.json().catch(() => null);
    const message =
      typeof body === "object" &&
      body !== null &&
      typeof (body as { errorMessage?: unknown }).errorMessage === "string"
        ? (body as { errorMessage: string }).errorMessage
        : "Could not save the name.";

    if (!response.ok) {
      return { kind: "error", message };
    }

    const savedName =
      typeof body === "object" &&
      body !== null &&
      typeof (body as { project?: { name?: unknown } }).project?.name ===
        "string"
        ? (body as { project: { name: string } }).project.name
        : name;

    return { kind: "ok", name: savedName };
  } catch {
    return { kind: "error", message: "Could not save the name." };
  }
};

export default patchUserProjectName;
