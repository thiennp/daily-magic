/** `/login?notice=` key for "Sign in to become this assistant's owner." (allowlisted on /login). */
export const ASSISTANT_OWNER_LOGIN_NOTICE = "assistant-owner" as const;

/** /login URL that returns to `callback` and shows the assistant-owner notice. */
export const buildAssistantOwnerLoginPath = (callback: string): string =>
  `/login?callbackUrl=${encodeURIComponent(callback)}&notice=${ASSISTANT_OWNER_LOGIN_NOTICE}`;
