"use client";

import { useState } from "react";

import useAwcProjectHashDeepLink from "@/features/projects/hooks/useAwcProjectHashDeepLink";
import AwcProjectLibraryAddFrom from "@/features/projects/library/AwcProjectLibraryAddFrom";
import AwcProjectLibraryDetail from "@/features/projects/library/AwcProjectLibraryDetail";
import AwcProjectLibraryHeader from "@/features/projects/library/AwcProjectLibraryHeader";
import AwcProjectLibraryList from "@/features/projects/library/AwcProjectLibraryList";
import AwcProjectLibrarySkillForm from "@/features/projects/library/AwcProjectLibrarySkillForm";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import useAwcProjectLibrary from "@/features/projects/library/useAwcProjectLibrary";
import { PANEL_STATUS_CLASS } from "@/features/projects/projectPagePanelChrome.constant";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

type LibraryMode = "list" | "new-skill" | "new-playbook" | "add-from";

interface AwcProjectLibraryPanelProps {
  readonly project: UserProjectRecord;
  readonly canEdit: boolean;
}

/**
 * Library tab: project-scoped playbooks/workflows/skills.
 * HN-H3: empty card owns New + Add from; toolbar CTAs only when items exist.
 */
export default function AwcProjectLibraryPanel({
  project,
  canEdit,
}: AwcProjectLibraryPanelProps) {
  const library = useAwcProjectLibrary(project.id);
  const [itemId, setItemId] = useAwcProjectHashDeepLink("library", "item");
  const [mode, setMode] = useState<LibraryMode>("list");
  const [toast, setToast] = useState<string | null>(null);
  const done = (message: string | null): void => {
    setMode("list");
    if (message !== null) setToast(message);
  };
  const startNewSkill = (): void => {
    setItemId(null);
    setMode("new-skill");
  };
  const startNewPlaybook = (): void => {
    setItemId(null);
    setMode("new-playbook");
  };
  const startAddFrom = (): void => {
    setItemId(null);
    setMode("add-from");
  };
  const showHeaderActions =
    mode === "list" && itemId === null && library.items.length > 0;

  return (
    <section
      aria-label={C["library.aria"]}
      className="flex min-w-0 flex-col gap-3"
    >
      <AwcProjectLibraryHeader
        canEdit={canEdit}
        canCreateSkill={canEdit && !library.skills.forbidden}
        showActions={showHeaderActions}
        onNewSkill={startNewSkill}
        onNewPlaybook={startNewPlaybook}
        onAddFrom={startAddFrom}
      />
      {toast !== null ? (
        <p role="status" className={PANEL_STATUS_CLASS}>
          {toast}
        </p>
      ) : null}
      {(mode === "new-skill" || mode === "new-playbook") && canEdit ? (
        <AwcProjectLibrarySkillForm
          key={mode}
          skills={library.skills}
          kind={mode === "new-playbook" ? "playbook" : "skill"}
          onDone={done}
        />
      ) : mode === "add-from" && canEdit ? (
        <AwcProjectLibraryAddFrom
          project={project}
          onAdded={() => library.reload()}
          onDone={done}
        />
      ) : itemId !== null ? (
        <AwcProjectLibraryDetail
          itemId={itemId}
          library={library}
          canEdit={canEdit}
          onToast={setToast}
          onBack={() => {
            setItemId(null);
          }}
        />
      ) : (
        <AwcProjectLibraryList
          library={library}
          canEdit={canEdit}
          onOpen={setItemId}
          onNew={startNewSkill}
          onAddFrom={startAddFrom}
        />
      )}
    </section>
  );
}
