"use client";

import MacDeviceRow from "@/features/agent-witch/macDevices/MacDeviceRow";
import { buildMacDeviceDetailText } from "@/features/agent-witch/macDevices/utils/buildMacDeviceDetailText";
import {
  canWakeMacDeviceFromBrowser,
  deviceLabelMatchesLocalHost,
} from "@/features/agent-witch/online-wake";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import useThisMacLocalInstallActions from "@/features/home/hooks/useThisMacLocalInstallActions";
import UpdateLocalMacModal from "@/features/home/UpdateLocalMacModal";

interface HomeConnectedMacDeviceRowProps {
  readonly device: MyMacDevice;
  readonly displayName: string;
  readonly serverInstallBundleVersion: string | null;
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onDelegateTask: (deviceId: string) => void;
  readonly onOpenShell: (deviceId: string) => void;
  readonly onDelete: (deviceId: string) => Promise<void>;
}

export default function HomeConnectedMacDeviceRow(
  props: HomeConnectedMacDeviceRowProps,
) {
  const {
    onUpdateLocal,
    onDeleteLocalScript,
    isUpdateLocalModalOpen,
    updateLocalCommand,
    closeUpdateLocalModal,
  } = useThisMacLocalInstallActions();
  const detail = buildMacDeviceDetailText({
    device: props.device,
    serverInstallBundleVersion: props.serverInstallBundleVersion,
  });
  const isThisMac =
    props.localHostname !== null &&
    deviceLabelMatchesLocalHost(props.device.deviceLabel, props.localHostname);

  return (
    <>
      <MacDeviceRow
        deviceId={props.device.id}
        displayName={props.displayName}
        isOnline={props.device.isOnline}
        isConnected={props.device.isConnected}
        detailText={detail?.text}
        detailWarning={detail?.isMismatch === true}
        isThisMac={isThisMac}
        isWakeServerReachable={canWakeMacDeviceFromBrowser({
          deviceLabel: props.device.deviceLabel,
          localHostname: props.localHostname,
          isWakeServerReachable: props.isWakeServerReachable,
        })}
        onRenamed={props.onRenamed}
        onUpdateLocal={isThisMac ? onUpdateLocal : undefined}
        onDeleteLocalScript={isThisMac ? onDeleteLocalScript : undefined}
        onDelegateTask={props.onDelegateTask}
        onOpenShell={props.onOpenShell}
        onDelete={props.onDelete}
      />
      <UpdateLocalMacModal
        isOpen={isUpdateLocalModalOpen}
        updateCommand={updateLocalCommand}
        onClose={closeUpdateLocalModal}
      />
    </>
  );
}
