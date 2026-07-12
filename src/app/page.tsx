import { getAuthActor } from "@/lib/auth/auth";
import HomeMarketingLanding from "@/features/home/HomeMarketingLanding";
import HomePageLayout from "@/features/pages/layouts/HomePageLayout";
import AppShell from "@/features/shell/AppShell";

export const dynamic = "force-dynamic";

export default async function Home() {
  const actor = await getAuthActor();

  if (actor) {
    return (
      <AppShell>
        <HomePageLayout
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
