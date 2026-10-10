"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacButton from "@/features/home/ConnectAnotherMacButton";
import HomeConnectedMacsDeviceList from "@/features/home/HomeConnectedMacsDeviceList";
import HomeConnectedMacsEmptyState from "@/features/home/HomeConnectedMacsEmptyState";
import {
  useHomeConnectedMacDeviceActions,
  useHomeConnectedMacs,
  useLocalMacBrowserContext,
  useShouldShowConnectThisMac,
} from "@/features/home/hooks/public-api/presentation";

interface HomeComputersCardProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

/** Design right-column "Your computers" card (same live device actions). */
export default function HomeComputersCard(props: HomeComputersCardProps) {
  const { onDelegateTask, onOpenShell, onDelete } =
    useHomeConnectedMacDeviceActions();
  const {
    devices,
    displayNameById,
    isLoading,
    serverInstallBundleVersion,
    renameDevice,
  } = useHomeConnectedMacs();
  const { localHostname, localTokenHash } = useLocalMacBrowserContext();
  const shouldShowConnectThisMac = useShouldShowConnectThisMac();

  return (
    <AppPanel as="section" aria-labelledby="home-computers-heading">
      <div className="flex items-center justify-between gap-3">
        <h2
          id="home-computers-heading"
          className={APP_SURFACE_SECTION_TITLE_CLASS}
        >
          Your computers
        </h2>
        {!isLoading && devices.length > 0 ? (
          <ConnectAnotherMacButton
            {...props}
            hasExistingDevices
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
          />
        ) : null}
      </div>
      {isLoading ? (
        <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Checking connected computers…
        </p>
      ) : devices.length === 0 ? (
        <HomeConnectedMacsEmptyState {...props} />
      ) : (
        <HomeConnectedMacsDeviceList
          {...props}
          devices={devices}
          displayNameById={displayNameById}
          serverInstallBundleVersion={serverInstallBundleVersion}
          localHostname={localHostname}
          localTokenHash={localTokenHash}
          shouldShowConnectThisMac={shouldShowConnectThisMac}
          onRenamed={renameDevice}
          onDelegateTask={onDelegateTask}
          onOpenShell={onOpenShell}
          onDelete={onDelete}
        />
      )}
    </AppPanel>
  );
}
