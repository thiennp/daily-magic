"use client";

import { useSession } from "next-auth/react";

/** True when the signed-in user owns the project (list Delete gate). */
export default function useCanDeleteOwnedProject(ownerUserId: string): boolean {
  const { data: session } = useSession();
  const sessionUserId =
    session?.user && "id" in session.user && typeof session.user.id === "string"
      ? session.user.id
      : null;

  return sessionUserId !== null && sessionUserId === ownerUserId;
}
