"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import { GuestSessionStateProvider } from "@/features/empty-states/GuestSessionStateProvider";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";
import { AWC_STORYBOOK_USER } from "@/utils/storybook/awcStorybookFixtures";

const buildSession = (): Session => ({
  user: {
    id: "user-storybook",
    email: AWC_STORYBOOK_USER.email,
    name: AWC_STORYBOOK_USER.name,
    globalRole: AWC_STORYBOOK_USER.globalRole,
  },
  expires: "2099-01-01T00:00:00.000Z",
});

export default function AwcStorybookSessionProvider({
  status,
  children,
}: {
  readonly status: StorybookPageStatus;
  readonly children: React.ReactNode;
}) {
  const isGuest = status === "guest";
  const session = isGuest ? null : buildSession();
  const serverSessionHint = isGuest ? "signed_out" : "signed_in";

  return (
    <SessionProvider session={session}>
      <GuestSessionStateProvider serverSessionHint={serverSessionHint}>
        {children}
      </GuestSessionStateProvider>
    </SessionProvider>
  );
}
