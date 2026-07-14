import PairedDeviceOnlineBadge from "@/features/harness/components/PairedDeviceOnlineBadge";
import MacDeviceIcon from "@/features/agent-witch/macDevices/MacDeviceIcon";
import MacDeviceNameEditor from "@/features/agent-witch/macDevices/MacDeviceNameEditor";

interface MacDeviceRowMainContentProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly detailText?: string;
  readonly isEditing: boolean;
  readonly onEditingChange: (isEditing: boolean) => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
}

export default function MacDeviceRowMainContent({
  deviceId,
  displayName,
  isOnline,
  detailText,
  isEditing,
  onEditingChange,
  onRenamed,
}: MacDeviceRowMainContentProps) {
  return (
    <div className="flex min-w-0 flex-1 items-start gap-3 text-left">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
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
        <PairedDeviceOnlineBadge isOnline={isOnline} />
        {detailText ? (
          <p className="text-left text-xs text-gray-500 dark:text-gray-400">
            {detailText}
          </p>
        ) : null}
      </div>
    </div>
  );
}
