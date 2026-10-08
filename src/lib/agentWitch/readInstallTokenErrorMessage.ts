export const GENERIC_INSTALL_TOKEN_ERROR =
  "Could not create a computer install link.";

/** Plan/limit denials (403) carry a readable reason; show it instead of a generic line. */
export const readInstallTokenErrorMessage = async (
  response: Response,
): Promise<string> => {
  if (response.status !== 403) {
    return GENERIC_INSTALL_TOKEN_ERROR;
  }
  try {
    const body: unknown = await response.json();
    const reason =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof (body as { error: unknown }).error === "string"
        ? (body as { error: string }).error.trim()
        : "";
    return reason.length > 0 ? reason : GENERIC_INSTALL_TOKEN_ERROR;
  } catch {
    return GENERIC_INSTALL_TOKEN_ERROR;
  }
};
