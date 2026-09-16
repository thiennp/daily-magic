export const CREATE_FREE_ACCOUNT_HREF = "/#get-started";

export const buildSignInHref = (callbackPath: string): string =>
  `/login?callbackUrl=${encodeURIComponent(callbackPath)}`;

export const FIRST_TASK_SHOWCASE_HREF =
  "/showcases/first-agent-task-in-5-minutes";

export const MARKETPLACE_FREE_STARTERS_SECTION_ID = "free-starters";

export const marketplaceFreeStartersSectionHref = (): string =>
  `#${MARKETPLACE_FREE_STARTERS_SECTION_ID}`;
