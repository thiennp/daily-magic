import { redirect } from "next/navigation";

import ProjectsPageLayout from "@/features/pages/layouts/ProjectsPageLayout";
import AppShell from "@/features/shell/AppShell";
import { APP_SHELL_NARROW_CONTENT_CLASS } from "@/features/shell/appShellContentWidth.constant";
import { getAuthActor } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const actor = await getAuthActor();

  if (!actor) {
    redirect("/login?callbackUrl=/projects");
  }

  return (
    <AppShell contentClassName={APP_SHELL_NARROW_CONTENT_CLASS}>
      <ProjectsPageLayout />
    </AppShell>
  );
}
