"use client";

import { useState } from "react";

import AwcProjectAttachComputerDialog from "@/features/projects/AwcProjectAttachComputerDialog";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

interface AwcProjectDetailBannersProps {
  readonly project: Pick<UserProjectRecord, "id" | "name" | "deviceId">;
  readonly pageActorRole: ProjectPageActorRole;
}

const BANNER =
  "flex flex-wrap items-start gap-3 rounded-awc-lg px-4 py-3 text-[length:var(--awc-fs-body)]";

/** Page-level notices under the header (design: viewer + no-computer banners). */
export default function AwcProjectDetailBanners({
  project,
  pageActorRole,
}: AwcProjectDetailBannersProps) {
  const [attachOpen, setAttachOpen] = useState(false);
  const hasComputer = Boolean(project.deviceId);
  const viewer = pageActorRole === "viewer";
  if (!viewer && hasComputer) {
    return null;
  }
  return (
    <div className="flex flex-col gap-3">
      {viewer ? (
        <p role="status" className={`${BANNER} bg-awc-tile text-awc-fg`}>
          <span>
            <b className="font-semibold">You can view this project.</b> Ask an
            owner for member access to change things.
          </span>
        </p>
      ) : null}
      {hasComputer ? null : (
        <div role="status" className={`${BANNER} bg-awc-warn-soft text-awc-fg`}>
          <span className="min-w-0 flex-1">
            <b className="font-semibold">{project.name} has no computer yet.</b>{" "}
            Attach one so assistants have somewhere to work.
          </span>
          {pageActorRole === "owner" ? (
            <button
              type="button"
              className="awc-focus-ring rounded-awc-control bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-awc-blue-700"
              onClick={() => setAttachOpen(true)}
            >
              Attach a computer
            </button>
          ) : null}
        </div>
      )}
      {attachOpen ? (
        <AwcProjectAttachComputerDialog
          projectId={project.id}
          projectName={project.name}
          onClose={() => setAttachOpen(false)}
        />
      ) : null}
    </div>
  );
}
