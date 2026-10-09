"use client";

import { useState } from "react";

import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import { resolveHomeThisMacDeviceIdentity } from "@/features/home/utils/resolveHomeThisMacDeviceIdentity";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import { addProjectFolderRef } from "@/features/projects/access/utils/mutateProjectFolderRefs";
import { OVERVIEW_CTA_PRIMARY_SM_CLASS } from "@/features/projects/overview/overviewChrome.constant";
import { OVERVIEW_FOLDER_PROMPT_COPY as C } from "@/features/projects/overview/overviewFolderPromptCopy.constant";
import { resolveOverviewFolderPrompt } from "@/features/projects/overview/resolveOverviewFolderPrompt";
import type { ProjectPageNavTarget } from "@/features/projects/projectPageTabs.constant";

/**
 * Owner-only Overview prompt: no folder saved for the project, or none for the
 * computer running this browser. Adds the folder right here (no hunting in Resources).
 */
export default function AwcProjectOverviewFolderPrompt({
  projectId,
  onGoto,
}: {
  readonly projectId: string;
  readonly onGoto: (tab: ProjectPageNavTarget) => void;
}) {
  const access = useAwcProjectAccess(projectId);
  const { devices } = useHomeConnectedMacs();
  const { localTokenHash } = useLocalMacBrowserContext();
  const [path, setPath] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const thisDeviceId = resolveHomeThisMacDeviceIdentity({
    localTokenHash,
    devices,
  }).thisMacDeviceId;
  const kind = resolveOverviewFolderPrompt({
    folderRefs: access.folderRefs,
    thisDeviceId,
  });
  if (access.isLoading || access.loadError || kind === "none") return null;

  const add = async (): Promise<void> => {
    if (thisDeviceId === null || path.trim().length === 0) return;
    setPending(true);
    setError(false);
    const result = await addProjectFolderRef({
      projectId,
      deviceId: thisDeviceId,
      folderPath: path.trim(),
    });
    setPending(false);
    if (result.ok) {
      setPath("");
      await access.reload();
    } else {
      setError(true);
    }
  };

  const hint =
    thisDeviceId === null
      ? C.hintNoComputer
      : kind === "first"
        ? C.hintFirst
        : C.hintThisComputer;
  return (
    <section
      className="flex flex-col gap-2 rounded-awc-card bg-awc-attention-bg px-4 py-3.5 text-awc-warn shadow-[0_0_0_1px_rgba(184,106,0,.18)]"
      aria-label={C.titleFirst}
    >
      <h3 className="m-0 text-[length:var(--awc-fs-sm)] font-semibold">
        {kind === "first" ? C.titleFirst : C.titleThisComputer}
      </h3>
      <p className="m-0 text-[13px]">{hint}</p>
      {thisDeviceId === null ? (
        <button
          type="button"
          className={`${OVERVIEW_CTA_PRIMARY_SM_CLASS} self-start`}
          onClick={() => onGoto("resources")}
        >
          {C.openResources}
        </button>
      ) : (
        <form
          className="flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void add();
          }}
        >
          <input
            className="min-w-[14rem] flex-1 rounded-lg border border-awc-control-border bg-awc-surface px-2.5 py-1.5 text-sm text-awc-fg"
            aria-label={C.pathLabel}
            placeholder={C.pathPlaceholder}
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          <button
            type="submit"
            className={OVERVIEW_CTA_PRIMARY_SM_CLASS}
            disabled={pending || path.trim().length === 0}
          >
            {pending ? C.adding : C.add}
          </button>
        </form>
      )}
      {error ? (
        <p role="alert" className="m-0 text-[13px]">
          {C.failed}
        </p>
      ) : null}
    </section>
  );
}
