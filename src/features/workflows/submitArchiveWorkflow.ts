export async function submitArchiveWorkflow(
  capabilityId: string,
): Promise<
  { readonly ok: true } | { readonly ok: false; readonly errorMessage: string }
> {
  const response = await fetch(`/api/capabilities/${capabilityId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data: unknown = await response.json().catch(() => null);
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : "Could not delete workflow.";
    return { ok: false, errorMessage: message };
  }

  return { ok: true };
}
