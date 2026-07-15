import PairedDeviceOnlineBadge from "@/features/harness/components/PairedDeviceOnlineBadge";
import MacDeviceIcon from "@/features/agent-witch/macDevices/MacDeviceIcon";
import MacDeviceNameEditor from "@/features/agent-witch/macDevices/MacDeviceNameEditor";

interface MacDeviceRowMainContentProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly isConnected?: boolean;
  readonly detailText?: string;
  readonly isEditing: boolean;
  readonly isSelected?: boolean;
  readonly onEditingChange: (isEditing: boolean) => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
}

const buildMacDeviceIconShellClassName = (isSelected: boolean): string => {
  const baseClassName =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300";

  if (isSelected) {
    return `${baseClassName} bg-transparent`;
  }

  return `${baseClassName} bg-gray-100 group-hover:bg-transparent group-focus-within:bg-transparent dark:bg-gray-800 dark:group-hover:bg-transparent`;
};

export default function MacDeviceRowMainContent({
  deviceId,
  displayName,
  isOnline,
  isConnected,
  detailText,
  isEditing,
  isSelected = false,
  onEditingChange,
  onRenamed,
}: MacDeviceRowMainContentProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 text-left">
      <div className={buildMacDeviceIconShellClassName(isSelected)}>
        <MacDeviceIcon className="h-5 w-5" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
        <MacDeviceNameEditor
          key={isEditing ? `${deviceId}:edit` : `${deviceId}:view`}
          deviceId={deviceId}
          displayName={displayName}
          isEditing={isEditing}
          onEditingChange={onEditingChange}
          onRenamed={onRenamed}
        />
        <PairedDeviceOnlineBadge
          isOnline={isOnline}
          isConnected={isConnected}
        />
        {detailText ? (
          <p className="text-left text-xs text-gray-500 dark:text-gray-400">
            {detailText}
          </p>
        ) : null}
      </div>
    </div>
  );
}
