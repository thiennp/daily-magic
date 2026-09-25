import { notFound, redirect } from "next/navigation";

import AwcProjectDetailPanel from "@/features/projects/AwcProjectDetailPanel";
import AppShell from "@/features/shell/AppShell";
import AppPageHeader from "@/components/surfaces/AppPageHeader";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";
import { APP_SHELL_NARROW_CONTENT_CLASS } from "@/features/shell/appShellContentWidth.constant";
import { getAuthActor } from "@/lib/auth/auth";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export const dynamic = "force-dynamic";

interface ProjectsDetailPageProps {
  readonly params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectsDetailPageProps) {
  const actor = await getAuthActor();

  if (!actor) {
    redirect("/login?callbackUrl=/projects");
  }

  const { projectId } = await params;
  const project = await getUserProjectById(projectId.trim());

  if (project === null || project.ownerUserId !== actor.id) {
    notFound();
  }

  return (
    <AppShell contentClassName={APP_SHELL_NARROW_CONTENT_CLASS}>
      <div className={APP_PAGE_STACK_CLASS}>
        <AppPageHeader title="Project details" />
        <AwcProjectDetailPanel project={project} />
      </div>
    </AppShell>
  );
}
