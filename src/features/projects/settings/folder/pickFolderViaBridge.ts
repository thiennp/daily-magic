export type PickFolderResult =
  | { readonly kind: "picked"; readonly folderPath: string }
  | { readonly kind: "cancelled" }
  | { readonly kind: "unavailable" };

/**
 * POST /projects/pick-folder: native folder dialog on the computer, path only
 * (nothing is linked). "unavailable" = not reachable from this browser, or an
 * older install without the route; callers fall back to typing.
 */
export const pickFolderViaBridge = async (
  wakePort: number,
): Promise<PickFolderResult> => {
  try {
    const response = await fetch(
      `http://127.0.0.1:${wakePort}/projects/pick-folder`,
      {
        method: "POST",
      },
    );
    const raw: unknown = await response.json().catch(() => null);
    const body =
      typeof raw === "object" && raw !== null
        ? (raw as Record<string, unknown>)
        : null;
    if (body?.ok === true && typeof body.folderPath === "string") {
      return { kind: "picked", folderPath: body.folderPath };
    }
    return body?.cancelled === true
      ? { kind: "cancelled" }
      : { kind: "unavailable" };
  } catch {
    return { kind: "unavailable" };
  }
};
