const EXAMPLE_ORIGIN = "https://example.local";

export interface BuildPostAuthReturnInput {
  readonly next?: string;
  readonly capabilityId?: string;
  readonly sendTask?: boolean;
}

/** App path (+ query) to land on after sign-in — preserves onboarding / preset intent. */
export const buildPostAuthReturn = (
  input: BuildPostAuthReturnInput = {},
): string => {
  const url = new URL(input.next ?? "/", EXAMPLE_ORIGIN);

  if (input.capabilityId !== undefined && input.capabilityId.length > 0) {
    url.searchParams.set("capabilityId", input.capabilityId);
  }

  if (input.sendTask === true) {
    url.searchParams.set("sendTask", "1");
  }

  return `${url.pathname}${url.search}`;
};
