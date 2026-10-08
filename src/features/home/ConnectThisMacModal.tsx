"use client";

import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import ConnectThisMacAppFirst from "@/features/home/ConnectThisMacAppFirst";
import ConnectThisComputerInstallBody from "@/features/home/ConnectThisComputerInstallBody";
import ConnectThisLinuxDownloadArea from "@/features/home/ConnectThisLinuxDownloadArea";
import ConnectThisMacModalNotice from "@/features/home/ConnectThisMacModalNotice";
import type { ConnectThisMacModalNotice as ConnectThisMacModalNoticeValue } from "@/features/home/utils/ConnectThisMacModalNotice.type";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";
import DownloadNonMacNote from "@/features/download/DownloadNonMacNote";
import { buildAgentWitchLocalMacAppDownloadUrl } from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

interface ConnectThisMacModalProps {
  readonly isOpen: boolean;
  readonly operatingSystem: BrowserOperatingSystem;
  readonly installCommand: string;
  readonly isInstallCommandLoading: boolean;
  readonly installCommandError?: string | null;
  /** Mac: the command sits in a collapsed section; told when it opens or closes. */
  readonly onTerminalSectionToggle?: (open: boolean) => void;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly onClose: () => void;
  readonly onInstallEngaged: () => void;
  /** version-too-old / not running / retry; null → download + install only. */
  readonly notice?: ConnectThisMacModalNoticeValue | null;
  readonly isRetrying?: boolean;
  readonly onRetry?: () => void;
}

const CONNECT_MODAL_COPY: Partial<Record<BrowserOperatingSystem, string>> = {
  mac: `${MAC_WORKER_BENEFIT_COPY.connectThisMacModalIntro} You can close this page after copying—the command adds your account on this computer when you run it in Terminal, without replacing another account’s profile.`,
  linux:
    "On this Linux computer, open a terminal, paste this command, and press Enter. It installs the agent host for the account you are signed in with.",
  windows:
    "On this Windows computer, install WSL if needed (wsl --install), open the Ubuntu tab, paste this command there, and press Enter. The host runs inside WSL and shows up as a Linux device.",
};

export default function ConnectThisMacModal({
  isOpen,
  operatingSystem,
  installCommand,
  isInstallCommandLoading,
  installCommandError = null,
  onTerminalSectionToggle,
  isWebSocketSupported,
  host,
  onClose,
  onInstallEngaged,
  notice = null,
  isRetrying = false,
  onRetry = () => undefined,
}: ConnectThisMacModalProps) {
  const installDescription = CONNECT_MODAL_COPY[operatingSystem];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-awc-fg dark:text-white/90">
        Connect this computer
      </h2>

      {notice !== null ? (
        <ConnectThisMacModalNotice
          notice={notice}
          isRetrying={isRetrying}
          onRetry={onRetry}
        />
      ) : null}

      {!isWebSocketSupported ? (
        <div className="mt-4">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : operatingSystem === "mac" ? (
        <ConnectThisMacAppFirst
          downloadUrl={buildAgentWitchLocalMacAppDownloadUrl()}
          onTerminalSectionToggle={onTerminalSectionToggle}
          terminalBody={
            <ConnectThisComputerInstallBody
              description={installDescription ?? ""}
              installCommand={installCommand}
              isInstallCommandLoading={isInstallCommandLoading}
              installCommandError={installCommandError}
              onInstallEngaged={onInstallEngaged}
            />
          }
        />
      ) : installDescription !== undefined ? (
        <>
          <ConnectThisComputerInstallBody
            description={installDescription}
            installCommand={installCommand}
            isInstallCommandLoading={isInstallCommandLoading}
            installCommandError={installCommandError}
            onInstallEngaged={onInstallEngaged}
          />
          <ConnectThisLinuxDownloadArea operatingSystem={operatingSystem} />
          <DownloadNonMacNote />
        </>
      ) : (
        <div className={`mt-3 space-y-4 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          <p>{MAC_WORKER_BENEFIT_COPY.connectThisMacMobileModalIntro}</p>
          <ol className="list-decimal space-y-2 pl-5 text-sm">
            {MAC_WORKER_BENEFIT_COPY.connectThisMacMobileSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <DownloadNonMacNote />
        </div>
      )}
    </Modal>
  );
}
