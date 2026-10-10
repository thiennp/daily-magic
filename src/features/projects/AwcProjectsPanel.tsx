"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import { pickDefaultMacDeviceId } from "@/features/agent-witch/online-wake";
import { AwcMyProjectInvitations } from "@/features/projects/invitations/public-api/presentation";
import AwcProjectsListBody from "@/features/projects/AwcProjectsListBody";
import AwcProjectsManageControls from "@/features/projects/AwcProjectsManageControls";
import MyBotsPanel from "@/features/my-bots/MyBotsPanel";
import AwcProjectsIntentNotice from "@/features/projects/navConsolidation/AwcProjectsIntentNotice";
import { parseProjectsNavIntent } from "@/features/projects/navConsolidation/parseProjectsNavIntent";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import { filterAwcProjectsByQuery } from "@/features/projects/utils/filterAwcProjectsByQuery";
import AppPanel from "@/components/surfaces/AppPanel";
import {
  PROJECTS_V5_INSET_CLASS,
  PROJECTS_V5_PANEL_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { NAV_CONSOLIDATION_INTENT_QUERY_PARAM } from "@/lib/shell/navConsolidationIntent.constant";

interface AwcProjectsPanelProps {
  /** Optional content rendered at the top of the panel (e.g. a section title). */
  readonly header?: ReactNode;
  /** Optional pure selector applied to the (search-filtered) list, e.g. top N. */
  readonly selectProjects?: (
    projects: readonly UserProjectRecord[],
  ) => readonly UserProjectRecord[];
  /** When false, hide the search toolbar and the New project form. Default true. */
  readonly showManageControls?: boolean;
}

export default function AwcProjectsPanel({
  header,
  selectProjects,
  showManageControls = true,
}: AwcProjectsPanelProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intent = parseProjectsNavIntent(
    searchParams.get(NAV_CONSOLIDATION_INTENT_QUERY_PARAM),
  );
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const defaultDeviceId = pickDefaultMacDeviceId(devices) ?? "";
  const {
    projects,
    compositionCountsByProjectId,
    isLoading,
    loadFailed,
    addProject,
    refreshProjects,
    removeProject,
  } = useUserProjects("");
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [createdName, setCreatedName] = useState<string | null>(null);
  const visibleProjects = useMemo(() => {
    const filtered = filterAwcProjectsByQuery(projects, searchQuery);

    return selectProjects ? selectProjects(filtered) : filtered;
  }, [projects, searchQuery, selectProjects]);

  return (
    <AppPanel embedded className={PROJECTS_V5_PANEL_CLASS}>
      {header}
      <AwcMyProjectInvitations />
      {intent !== null ? (
        <AwcProjectsIntentNotice
          intent={intent}
          projectCount={projects.length}
          isLoading={isLoading}
          onDismiss={() => router.replace("/projects")}
          onNewProject={() => setFormOpen(true)}
        />
      ) : null}
      {intent === "bots" ? (
        <div className={`mb-6 ${PROJECTS_V5_INSET_CLASS}`}>
          <MyBotsPanel />
        </div>
      ) : null}
      {showManageControls && !isLoading ? (
        <AwcProjectsManageControls
          deviceId={defaultDeviceId}
          formOpen={formOpen}
          onFormOpenChange={setFormOpen}
          createdName={createdName}
          onCreated={(project) => {
            addProject(project);
            setCreatedName(project.name);
            void refreshProjects();
          }}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          projectCount={projects.length}
          visibleCount={visibleProjects.length}
        />
      ) : null}
      <AwcProjectsListBody
        isLoading={isLoading}
        loadFailed={loadFailed}
        onRetryLoad={() => {
          void refreshProjects({ showLoading: true });
        }}
        onClearSearch={() => setSearchQuery("")}
        searchQuery={searchQuery}
        projects={projects}
        visibleProjects={visibleProjects}
        compositionCountsByProjectId={compositionCountsByProjectId}
        devices={devices}
        displayNameById={displayNameById}
        localTokenHash={localTokenHash}
        intent={intent}
        onProjectDeleted={(projectId) => {
          removeProject(projectId);
          void refreshProjects();
        }}
      />
    </AppPanel>
  );
}
