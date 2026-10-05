import { redirect } from "next/navigation";

import MyBotsPageLayout from "@/features/pages/layouts/MyBotsPageLayout";
import AppShell from "@/features/shell/AppShell";
import { APP_SHELL_NARROW_CONTENT_CLASS } from "@/features/shell/appShellContentWidth.constant";
import { getAuthActor } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export default async function MyBotsPage() {
  const actor = await getAuthActor();
  if (!actor) {
    redirect("/login?callbackUrl=/my-bots");
  }
  return (
    <AppShell contentClassName={APP_SHELL_NARROW_CONTENT_CLASS}>
      <MyBotsPageLayout />
    </AppShell>
  );
}
