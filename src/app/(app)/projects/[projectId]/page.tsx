import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import AwcProjectDetailPanel from "@/features/projects/AwcProjectDetailPanel";
import buildProjectDetailPageMetadata from "@/features/projects/buildProjectDetailPageMetadata";
import AppShell from "@/features/shell/AppShell";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";
import { getAuthActor } from "@/lib/auth/auth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

export const dynamic = "force-dynamic";

interface ProjectsDetailPageProps {
  readonly params: Promise<{ projectId: string }>;
  readonly searchParams: Promise<{ rename?: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsDetailPageProps): Promise<Metadata> {
  const actor = await getAuthActor();
  if (!actor) {
    return buildProjectDetailPageMetadata("Project");
  }
  const { projectId } = await params;
  const access = await authorizeProjectPageActor({
    projectId: projectId.trim(),
    actorUserId: actor.id,
  });
  if (!access.ok) {
    return buildProjectDetailPageMetadata("Project");
  }
  return buildProjectDetailPageMetadata(access.project.name);
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: ProjectsDetailPageProps) {
  const actor = await getAuthActor();

  if (!actor) {
    redirect("/login?callbackUrl=/projects");
  }

  const { projectId } = await params;
  const query = await searchParams;
  const startRename = query.rename === "1" || query.rename === "true";
  const access = await authorizeProjectPageActor({
    projectId: projectId.trim(),
    actorUserId: actor.id,
  });

  if (!access.ok) {
    notFound();
  }

  return (
    <AppShell>
      <div className={APP_PAGE_STACK_CLASS}>
        <AwcProjectDetailPanel
          project={access.project}
          startRename={startRename && access.role === "owner"}
          pageActorRole={access.role}
          actorEmail={actor.email}
          actorDisplayName={actor.name}
        />
      </div>
    </AppShell>
  );
}
