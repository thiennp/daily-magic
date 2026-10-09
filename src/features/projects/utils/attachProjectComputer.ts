const SAVE_ERROR = "Could not attach the computer.";

/** PATCH the project's computer; returns an error message or null on success. */
export const attachProjectComputer = async (
  projectId: string,
  deviceId: string,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId }),
      },
    );
    if (response.ok) {
      return null;
    }
    const body: unknown = await response.json().catch(() => null);
    const message = (body as { errorMessage?: unknown } | null)?.errorMessage;
    return typeof message === "string" ? message : SAVE_ERROR;
  } catch {
    return SAVE_ERROR;
  }
};
