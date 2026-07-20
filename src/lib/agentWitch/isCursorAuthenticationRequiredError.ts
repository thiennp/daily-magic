import { CURSOR_AUTHENTICATION_REQUIRED_ERROR_SNIPPET } from "@/lib/agentWitch/cursorAuthenticationRequiredErrorSnippet.constant";

export const isCursorAuthenticationRequiredError = (
  output: string,
): boolean => output.includes(CURSOR_AUTHENTICATION_REQUIRED_ERROR_SNIPPET);
