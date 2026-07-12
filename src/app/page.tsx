import { getAuthActor } from "@/lib/auth/auth";
import HomeMarketingLanding from "@/features/home/HomeMarketingLanding";
import HomePageLayout from "@/features/pages/layouts/HomePageLayout";
import AppShell from "@/features/shell/AppShell";
import { APP_SHELL_WIDE_CONTENT_CLASS } from "@/features/shell/appShellContentWidth.constant";

export const dynamic = "force-dynamic";

export default async function Home() {
  const actor = await getAuthActor();

  if (actor) {
    return (
      <AppShell contentClassName={APP_SHELL_WIDE_CONTENT_CLASS}>
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
