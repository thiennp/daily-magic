export type GuestSessionState = "loading" | "guest" | "signed_in";

export const GUEST_SESSION_LOADING_TIMEOUT_MS = 2500;

export function resolveGuestSessionState(input: {
  readonly status: "loading" | "authenticated" | "unauthenticated";
  readonly hasUser: boolean;
  readonly loadingTimedOut: boolean;
}): GuestSessionState {
  if (input.status === "loading" && !input.loadingTimedOut) {
    return "loading";
  }

  if (input.status === "authenticated" && input.hasUser) {
    return "signed_in";
  }

  return "guest";
}
