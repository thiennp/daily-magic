import MacDeviceIcon from "@/features/agent-witch/macDevices/MacDeviceIcon";
import MacDeviceThisMacBadge from "@/features/agent-witch/macDevices/MacDeviceThisMacBadge";
import { resolveMacDeviceIconClassName } from "@/features/agent-witch/macDevices/utils/resolveMacDeviceIconClassName";
import MacDeviceNameEditor from "@/features/agent-witch/macDevices/MacDeviceNameEditor";

interface MacDeviceRowMainContentProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly detailText?: string;
  readonly detailWarning?: boolean;
  readonly isThisMac?: boolean;
  readonly isEditing: boolean;
  readonly onEditingChange: (isEditing: boolean) => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
}

export default function MacDeviceRowMainContent({
  deviceId,
  displayName,
  isOnline,
  detailText,
  detailWarning = false,
  isThisMac = false,
  isEditing,
  onEditingChange,
  onRenamed,
}: MacDeviceRowMainContentProps) {
  const iconClassName = resolveMacDeviceIconClassName(isOnline);
  const detailClassName = `text-left text-xs ${
    detailWarning
      ? "text-amber-700 dark:text-amber-300"
      : "text-gray-500 dark:text-gray-400"
  }`;

  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
      <div className="flex min-w-0 items-start gap-2">
        <MacDeviceIcon className={`${iconClassName} mt-0.5`} />
        <div className="min-w-0 flex-1">
          <MacDeviceNameEditor
            key={isEditing ? `${deviceId}:edit` : `${deviceId}:view`}
            deviceId={deviceId}
            displayName={displayName}
            isEditing={isEditing}
            onEditingChange={onEditingChange}
            onRenamed={onRenamed}
          />
          {isThisMac ? (
            <div className="mt-1 flex min-w-0 flex-wrap items-center gap-1.5">
              <MacDeviceThisMacBadge />
              {detailText ? (
                <span className={detailClassName}>{detailText}</span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      {detailText && !isThisMac ? (
        <p className={detailClassName}>{detailText}</p>
      ) : null}
    </div>
  );
}
