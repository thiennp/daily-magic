import { getAuthActor } from "@/lib/auth/auth";
import HomeAuthenticatedView from "@/features/home/HomeAuthenticatedView";
import HomeMarketingLanding from "@/features/home/HomeMarketingLanding";
import AppShell from "@/features/shell/AppShell";

export const dynamic = "force-dynamic";

export default async function Home() {
  const actor = await getAuthActor();

  if (actor) {
    return (
      <AppShell contentClassName="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <HomeAuthenticatedView
          user={{
            email: actor.email,
            name: actor.name,
            globalRole: actor.globalRole,
          }}
        />
      </AppShell>
    );
  }

  return <HomeMarketingLanding />;
}
