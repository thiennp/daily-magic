import { AWC_PROJECT_COMPUTER_MEMBER_COPY } from "@/features/projects/access/awcProjectComputerMemberCopy.constant";
import { isComputerAccessMember } from "@/features/projects/access/utils/isComputerAccessMember";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";

/** Access roster fields the folder-ref computer picker reads. */
export type FolderRefComputerMember = {
  readonly memberKind?: "human" | "bot" | "computer" | string;
  readonly deviceId?: string | null;
  readonly projectDisplayName: string | null;
  readonly isOnline?: boolean;
};

/** One `<option>`: value is the stable deviceId, label the device name. */
export type FolderRefComputerOption = {
  readonly deviceId: string;
  readonly deviceName: string;
  readonly label: string;
};

/** Project-bound owner device (user_projects.device_id) when no computer seat exists. */
export type FolderRefProjectDevice = {
  readonly deviceId: string;
  readonly deviceName: string;
};

const resolveDeviceName = (member: FolderRefComputerMember): string =>
  member.projectDisplayName?.trim() ||
  AWC_PROJECT_COMPUTER_MEMBER_COPY.fallbackName;

/** Computer seats with a deviceId → picker options (offline stays selectable). */
export const buildFolderRefComputerOptions = (
  members: readonly FolderRefComputerMember[],
  projectDevice?: FolderRefProjectDevice | null,
  ownerDevices: readonly FolderRefProjectDevice[] = [],
): readonly FolderRefComputerOption[] => {
  const fromSeats = members.flatMap((member) => {
    const deviceId = member.deviceId?.trim() ?? "";
    if (!isComputerAccessMember(member) || !deviceId) return [];
    const deviceName = resolveDeviceName(member);
    const suffix =
      member.isOnline === true ? "" : C.foldersMachineOfflineSuffix;
    return [{ deviceId, deviceName, label: `${deviceName}${suffix}` }];
  });
  const extras = [...(projectDevice ? [projectDevice] : []), ...ownerDevices];
  return extras.reduce<readonly FolderRefComputerOption[]>(
    (options, device) => {
      const deviceId = device.deviceId.trim();
      if (!deviceId || options.some((o) => o.deviceId === deviceId)) {
        return options;
      }
      const deviceName =
        device.deviceName.trim() ||
        AWC_PROJECT_COMPUTER_MEMBER_COPY.fallbackName;
      return [...options, { deviceId, deviceName, label: deviceName }];
    },
    fromSeats,
  );
};

/** `"{deviceName} · {path}"` — legacy free-text refs fall back to the raw value. */
export const formatFolderRefRow = (
  ref: {
    readonly machineOrDeviceRef: string;
    readonly folderPath: string;
    readonly deviceName?: string | null;
  },
  options: readonly FolderRefComputerOption[],
): string => {
  const match = options.find((o) => o.deviceId === ref.machineOrDeviceRef);
  return C.foldersRow(
    match?.deviceName ?? ref.deviceName ?? ref.machineOrDeviceRef,
    ref.folderPath,
  );
};

/** Client-side Add guard; null when the selection is a known computer. */
export const resolveFolderRefAddError = (
  machineRef: string,
  options: readonly FolderRefComputerOption[],
): string | null =>
  options.some((o) => o.deviceId === machineRef)
    ? null
    : C.foldersChooseComputerFirst;
