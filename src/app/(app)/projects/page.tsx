import { redirect } from "next/navigation";

import ProjectsPageLayout from "@/features/pages/layouts/ProjectsPageLayout";
import AppShell from "@/features/shell/AppShell";
import { APP_SHELL_NARROW_CONTENT_CLASS } from "@/features/shell/appShellContentWidth.constant";
import { getAuthActor } from "@/lib/auth/auth";
import { buildLoginCallbackPath } from "@/lib/shell/buildLoginCallbackPath";

export const dynamic = "force-dynamic";

interface ProjectsPageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const actor = await getAuthActor();

  if (!actor) {
    // Keep ?intent=library|reports (from old links) through sign-in.
    redirect(buildLoginCallbackPath("/projects", await searchParams));
  }

  return (
    <AppShell contentClassName={APP_SHELL_NARROW_CONTENT_CLASS}>
      <ProjectsPageLayout />
    </AppShell>
  );
}
