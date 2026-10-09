import { getUserById } from "@/lib/auth/userRepository";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import AwcProjectDetailPanel from "@/features/projects/AwcProjectDetailPanel";
import buildProjectDetailPageMetadata from "@/features/projects/buildProjectDetailPageMetadata";
import AppShell from "@/features/shell/AppShell";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";
import { getAuthActor } from "@/lib/auth/auth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { buildLoginCallbackPath } from "@/lib/shell/buildLoginCallbackPath";

export const dynamic = "force-dynamic";

interface ProjectsDetailPageProps {
  readonly params: Promise<{ projectId: string }>;
  readonly searchParams: Promise<{ rename?: string; chat?: string }>;
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
  const { projectId } = await params;
  const query = await searchParams;
  const actor = await getAuthActor();

  if (!actor) {
    const trimmedId = projectId.trim();
    const path =
      trimmedId.length > 0
        ? `/projects/${encodeURIComponent(trimmedId)}`
        : "/projects";
    redirect(buildLoginCallbackPath(path, query));
  }

  const startRename = query.rename === "1" || query.rename === "true";
  const startChatOpen = query.chat === "1" || query.chat === "true";
  const access = await authorizeProjectPageActor({
    projectId: projectId.trim(),
    actorUserId: actor.id,
  });

  if (!access.ok) {
    notFound();
  }

  // A member sees the real owner, not themselves, in the people list.
  const ownerUser =
    access.role === "owner"
      ? null
      : await getUserById(access.project.ownerUserId);
  const owner =
    access.role === "owner"
      ? { email: actor.email, name: actor.name }
      : { email: ownerUser?.email ?? null, name: ownerUser?.name ?? null };

  return (
    <AppShell>
      <div className={APP_PAGE_STACK_CLASS}>
        <AwcProjectDetailPanel
          // The owner's absolute path stays with the owner.
          project={
            access.role === "owner"
              ? access.project
              : { ...access.project, folderPath: "" }
          }
          startRename={startRename && access.role === "owner"}
          startChatOpen={startChatOpen}
          pageActorRole={access.role}
          ownerEmail={owner.email}
          ownerDisplayName={owner.name}
          actorUserId={actor.id}
        />
      </div>
    </AppShell>
  );
}
