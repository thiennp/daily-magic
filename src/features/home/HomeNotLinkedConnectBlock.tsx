"use client";

import Link from "next/link";
import { useCallback, useMemo, useState, useSyncExternalStore } from "react";

import {
  APP_SURFACE_CTA_PRIMARY_COMPACT_CLASS,
  APP_SURFACE_CTA_QUIET_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import ConnectThisMacModal from "@/features/home/ConnectThisMacModal";
import { HOME_NOT_LINKED_CONNECT_BLOCK_COPY as C } from "@/features/home/constants/public-api/types";
import HomeOpenLocalStatusButton from "@/features/home/HomeOpenLocalStatusButton";
import {
  useConnectThisMacModalNotice,
  useConnectThisMacRowFlow,
  useHomeConnectedMacs,
  useLocalMacBrowserContext,
  usePersonalizedAgentWitchInstallCommand,
  useShouldShowConnectThisMac,
  useThisMacHasConnectedLocalBridge,
} from "@/features/home/hooks/public-api/presentation";
import {
  detectBrowserOperatingSystem,
  resolveHomeNotLinkedConnectBlockState,
  resolveHomeThisMacDeviceIdentity,
} from "@/features/home/utils/public-api/presentation";
import useIsMobileClient from "@/hooks/useIsMobileClient";

interface HomeNotLinkedConnectBlockProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

const subscribeToOperatingSystem = () => () => undefined;
const getServerOperatingSystemSnapshot = () => "other" as const;

const ICON_PC = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </svg>
);

const ICON_OK = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const ICON_ERR = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5v.01" />
  </svg>
);

/**
 * HN-H2 Home connect block — one sand card, one Pine primary + quiet secondary.
 * States: not linked / connecting / connected / failed.
 */
export default function HomeNotLinkedConnectBlock({
  installCommand,
  isWebSocketSupported,
  host,
}: HomeNotLinkedConnectBlockProps) {
  const isMobileClient = useIsMobileClient();
  const shouldShowConnectThisMac = useShouldShowConnectThisMac();
  const hasLocalBridge = useThisMacHasConnectedLocalBridge();
  const { devices, displayNameById } = useHomeConnectedMacs();
  const { localTokenHash, isWakeServerReachable, isCheckingLocalHostname } =
    useLocalMacBrowserContext();
  const [installEngaged, setInstallEngaged] = useState(false);
  const [failedOverride, setFailedOverride] = useState(false);

  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const {
    handleCloseModal,
    handleClosePasteModal,
    handleInstallEngaged: openPasteAfterEngage,
    handleOpenModal,
    isModalOpen,
    isPasteModalOpen,
  } = useConnectThisMacRowFlow({ operatingSystem });
  const { notice, isRetrying, retry } = useConnectThisMacModalNotice({
    isModalOpen,
  });
  const {
    installCommand: personalizedInstallCommand,
    isLoading: isInstallCommandLoading,
    error: installCommandError,
  } = usePersonalizedAgentWitchInstallCommand({
    enabled: isModalOpen,
    fallbackInstallCommand: installCommand,
    commitIdentityWhenDisabled: true,
  });

  const identity = resolveHomeThisMacDeviceIdentity({
    localTokenHash,
    devices,
  });
  const thisMacDevice =
    devices.find((device) => device.id === identity.thisMacDeviceId) ?? null;
  const thisMacName =
    thisMacDevice !== null
      ? (displayNameById.get(thisMacDevice.id) ??
        thisMacDevice.displayName ??
        thisMacDevice.deviceLabel ??
        "This computer")
      : "This computer";

  const isFailedSignal =
    failedOverride ||
    notice?.kind === "not_running" ||
    (shouldShowConnectThisMac &&
      thisMacDevice !== null &&
      !identity.isReachable &&
      !isWakeServerReachable);

  const state = resolveHomeNotLinkedConnectBlockState({
    shouldShowConnectThisMac,
    isConnecting: installEngaged && !hasLocalBridge,
    isFailed: isFailedSignal,
    hasConnectedThisComputer: hasLocalBridge || identity.isReachable,
  });

  const handleConnect = useCallback(() => {
    setFailedOverride(false);
    setInstallEngaged(true);
    handleOpenModal();
  }, [handleOpenModal]);

  const handleCancelConnecting = useCallback(() => {
    setInstallEngaged(false);
    handleCloseModal();
    handleClosePasteModal();
  }, [handleCloseModal, handleClosePasteModal]);

  const handleTryAgain = useCallback(() => {
    setFailedOverride(false);
    setInstallEngaged(true);
    retry();
    handleOpenModal();
  }, [handleOpenModal, retry]);

  const handleInstallEngaged = useCallback(() => {
    setInstallEngaged(true);
    openPasteAfterEngage();
  }, [openPasteAfterEngage]);

  const handleModalClose = useCallback(() => {
    handleCloseModal();
    if (notice?.kind === "not_running") {
      setFailedOverride(true);
      setInstallEngaged(false);
    }
  }, [handleCloseModal, notice?.kind]);

  const connectedDetail = useMemo(() => {
    const parts: string[] = [C.connectedDetailOnline];
    const version = thisMacDevice?.installBundleVersion?.trim();
    if (version) {
      parts.push(`Version ${version.replace(/^v/i, "")}`);
    }
    return parts.join(" · ");
  }, [thisMacDevice?.installBundleVersion]);

  if (isMobileClient || isCheckingLocalHostname) {
    return null;
  }

  const cardTone =
    state === "connected"
      ? "border-awc-border bg-awc-tile"
      : state === "failed"
        ? "border-[#d9b3ad] bg-awc-tile"
        : "border-awc-border bg-awc-tile";

  const iconTone =
    state === "connected"
      ? "bg-[#e1ebe2] text-[#2e6b3f]"
      : state === "failed"
        ? "bg-[#f3e2df] text-[#a3302a]"
        : "bg-awc-accent-soft text-brand-600";

  const live =
    state === "connecting" || state === "failed"
      ? ({ role: "status", "aria-live": "polite" } as const)
      : {};

  return (
    <>
      <div
        className={`flex flex-col gap-3 rounded-xl border px-4 py-4 sm:flex-row sm:items-center sm:gap-3.5 ${cardTone} dark:border-gray-700 dark:bg-white/[0.03]`}
        {...live}
      >
        <span
          className={`grid size-[38px] shrink-0 place-items-center rounded-[10px] ${iconTone}`}
        >
          {state === "connecting" ? (
            <span
              className="size-[18px] animate-spin rounded-full border-2 border-awc-accent-soft border-t-brand-600 motion-reduce:animate-none"
              aria-hidden="true"
            />
          ) : state === "connected" ? (
            ICON_OK
          ) : state === "failed" ? (
            ICON_ERR
          ) : (
            ICON_PC
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-awc-fg dark:text-white">
            {state === "not_linked"
              ? C.notLinkedTitle
              : state === "connecting"
                ? C.connectingTitle
                : state === "failed"
                  ? C.failedTitle
                  : thisMacName}
          </p>
          <p className="text-sm text-awc-fg-muted dark:text-gray-400">
            {state === "connected" ? (
              <>
                <span
                  className="mr-1.5 inline-block size-2 rounded-full bg-[#2e6b3f] align-middle"
                  aria-hidden="true"
                />
                {connectedDetail}
              </>
            ) : state === "connecting" ? (
              C.connectingDetail
            ) : state === "failed" ? (
              C.failedDetail
            ) : (
              C.notLinkedDetail
            )}
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-1.5 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          {state === "not_linked" ? (
            <>
              <button
                type="button"
                className={APP_SURFACE_CTA_PRIMARY_COMPACT_CLASS}
                aria-haspopup="dialog"
                onClick={handleConnect}
              >
                {C.connectPrimary}
              </button>
              <Link
                href={C.howItWorksHref}
                className={`${APP_SURFACE_CTA_QUIET_CLASS} justify-center`}
              >
                {C.howItWorks}
              </Link>
            </>
          ) : null}
          {state === "connecting" ? (
            <>
              <button
                type="button"
                className={APP_SURFACE_CTA_PRIMARY_COMPACT_CLASS}
                disabled
              >
                {C.connectingPrimary}
              </button>
              <button
                type="button"
                className={`${APP_SURFACE_CTA_QUIET_CLASS} justify-center`}
                onClick={handleCancelConnecting}
              >
                {C.cancel}
              </button>
            </>
          ) : null}
          {state === "connected" ? (
            <HomeOpenLocalStatusButton className={APP_SURFACE_CTA_QUIET_CLASS}>
              {C.computerSettings}
            </HomeOpenLocalStatusButton>
          ) : null}
          {state === "failed" ? (
            <>
              <button
                type="button"
                className={APP_SURFACE_CTA_PRIMARY_COMPACT_CLASS}
                disabled={isRetrying}
                aria-haspopup="dialog"
                onClick={handleTryAgain}
              >
                {C.tryAgain}
              </button>
              <Link
                href={C.downloadHref}
                className={`${APP_SURFACE_CTA_QUIET_CLASS} justify-center`}
              >
                {C.downloadLocal}
              </Link>
            </>
          ) : null}
        </div>
      </div>
      {installCommandError !== null ? (
        <p className="text-xs text-red-600 dark:text-red-400">
          {installCommandError}
        </p>
      ) : null}
      <ConnectThisMacModal
        isOpen={isModalOpen}
        operatingSystem={operatingSystem}
        installCommand={personalizedInstallCommand}
        isInstallCommandLoading={isInstallCommandLoading}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
        onClose={handleModalClose}
        onInstallEngaged={handleInstallEngaged}
        notice={notice}
        isRetrying={isRetrying}
        onRetry={retry}
      />
      <ConnectInstallPasteModal
        isOpen={isPasteModalOpen}
        onClose={handleClosePasteModal}
      />
    </>
  );
}
