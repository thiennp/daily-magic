"use client";

import type { ReactNode } from "react";

import MacDeviceRow from "@/features/agent-witch/macDevices/MacDeviceRow";
import { buildMacDeviceDetailText } from "@/features/agent-witch/macDevices/utils/buildMacDeviceDetailText";
import {
  canWakeMacDeviceFromBrowser,
  isMacPresenceTierHardOffline,
  resolveMacPresenceTier,
} from "@/features/agent-witch/online-wake";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import HomeConnectedMacDeviceRowModals from "@/features/home/HomeConnectedMacDeviceRowModals";
import useMacDeviceSeeLocalLog from "@/features/home/hooks/useMacDeviceSeeLocalLog";
import useThisMacLocalInstallActions from "@/features/home/hooks/useThisMacLocalInstallActions";
import DeviceUpdateButton from "@/features/shell/v5/DeviceUpdateButton";
import { resolveDeviceUpdateAction } from "@/features/shell/v5/resolveDeviceUpdateAction";

interface HomeConnectedMacDeviceRowProps {
  readonly device: MyMacDevice;
  readonly displayName: string;
  readonly serverInstallBundleVersion: string | null;
  readonly localHostname: string | null;
  /** Resolved once per list (single This computer row — see resolveHomeThisMacDeviceIdentity). */
  readonly isThisMac: boolean;
  readonly isWakeServerReachable: boolean;
  readonly footer?: ReactNode;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onDelegateTask: (deviceId: string) => void;
  readonly onOpenShell: (deviceId: string) => void;
  readonly onDelete: (deviceId: string) => Promise<void>;
}

export default function HomeConnectedMacDeviceRow(
  props: HomeConnectedMacDeviceRowProps,
) {
  const { device, displayName, isThisMac } = props;
  const localActions = useThisMacLocalInstallActions({
    wakePort: device.wakePort,
  });
  const detail = buildMacDeviceDetailText({
    device,
    serverInstallBundleVersion: props.serverInstallBundleVersion,
  });
  const updateAction = resolveDeviceUpdateAction({
    needsUpdate: detail?.isMismatch === true,
    isOffline: isMacPresenceTierHardOffline(resolveMacPresenceTier(device)),
    canUpdateHere: isThisMac,
    latestVersion: props.serverInstallBundleVersion,
  });
  const onSeeLocalLog = useMacDeviceSeeLocalLog({
    wakePort: device.wakePort,
    displayName,
  });

  return (
    <>
      <MacDeviceRow
        deviceId={device.id}
        displayName={displayName}
        isOnline={device.isOnline}
        isConnected={device.isConnected}
        presenceTier={device.presenceTier}
        detailText={detail?.text}
        detailWarning={detail?.isMismatch === true}
        isThisMac={isThisMac}
        isWakeServerReachable={canWakeMacDeviceFromBrowser({
          deviceLabel: device.deviceLabel,
          localHostname: props.localHostname,
          isWakeServerReachable: props.isWakeServerReachable,
        })}
        onRenamed={props.onRenamed}
        onSeeLocalLog={
          isThisMac && device.wakePort !== null ? onSeeLocalLog : undefined
        }
        onUpdateLocal={isThisMac ? localActions.onUpdateLocal : undefined}
        onDeleteLocalScript={
          isThisMac ? localActions.onDeleteLocalScript : undefined
        }
        onDelegateTask={props.onDelegateTask}
        onOpenShell={props.onOpenShell}
        onDelete={props.onDelete}
        footer={
          <>
            {props.footer}
            <DeviceUpdateButton
              action={updateAction}
              onUpdate={localActions.onUpdateLocal}
            />
          </>
        }
      />
      <HomeConnectedMacDeviceRowModals actions={localActions} />
    </>
  );
}
