import MacDeviceIcon from "@/features/agent-witch/macDevices/MacDeviceIcon";
import { resolveMacDeviceIconClassName } from "@/features/agent-witch/macDevices/utils/resolveMacDeviceIconClassName";
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
  const iconClassName = resolveMacDeviceIconClassName(isOnline);

  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
      <div className="flex min-w-0 items-center gap-2">
        <MacDeviceIcon className={iconClassName} />
        <div className="min-w-0 flex-1">
          <MacDeviceNameEditor
            key={isEditing ? `${deviceId}:edit` : `${deviceId}:view`}
            deviceId={deviceId}
            displayName={displayName}
            isEditing={isEditing}
            onEditingChange={onEditingChange}
            onRenamed={onRenamed}
          />
        </div>
      </div>
      {detailText ? (
        <p className="text-left text-xs text-gray-500 dark:text-gray-400">
          {detailText}
        </p>
      ) : null}
    </div>
  );
}
