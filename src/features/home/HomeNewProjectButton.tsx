"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { Modal } from "@/components/ui/modal";
import { pickDefaultMacDeviceId } from "@/features/agent-witch/online-wake/public-api/presentation";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import SendTaskComposerCreateProjectForm from "@/features/agent/SendTaskComposerCreateProjectForm";

const NEEDS_COMPUTER_HINT = "Connect this computer first.";

/** Design "New project": opens the create form; disabled until a computer exists. */
export default function HomeNewProjectButton() {
  const router = useRouter();
  const { devices } = useMyMacDevices();
  const [isOpen, setIsOpen] = useState(false);
  const deviceId = pickDefaultMacDeviceId(devices) ?? "";
  const canCreate = deviceId !== "";

  return (
    <>
      <button
        type="button"
        disabled={!canCreate}
        title={canCreate ? undefined : NEEDS_COMPUTER_HINT}
        onClick={() => {
          setIsOpen(true);
        }}
        className={`${APP_SURFACE_CTA_SECONDARY_SM_CLASS} disabled:cursor-not-allowed disabled:opacity-50`}
      >
        New project
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        className="max-w-lg p-6"
      >
        <h2 className="pr-10 text-lg font-semibold text-awc-fg dark:text-white/90">
          New project
        </h2>
        <div className="mt-4">
          <SendTaskComposerCreateProjectForm
            deviceId={deviceId}
            onProjectCreated={() => undefined}
            onSelect={(project) => {
              setIsOpen(false);
              router.push(`/projects/${project.id}`);
            }}
          />
        </div>
      </Modal>
    </>
  );
}
