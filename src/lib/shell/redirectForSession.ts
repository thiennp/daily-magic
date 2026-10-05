import { permanentRedirect, redirect } from "next/navigation";

/**
 * Session-aware Next redirect: signed-out → 307, signed-in → 308.
 * Use 307 whenever the hop depends on session (e.g. login callback back to
 * the same URL) so browsers do not permanently cache it and loop after sign-in.
 */
export const redirectForSession = (
  destination: string,
  actorUserId: string | null,
): never => {
  if (actorUserId === null) {
    redirect(destination);
  } else {
    permanentRedirect(destination);
  }
};
