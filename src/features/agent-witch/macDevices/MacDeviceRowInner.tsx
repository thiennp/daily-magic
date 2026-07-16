"use client";

import MacDeviceRowMainContent from "@/features/agent-witch/macDevices/MacDeviceRowMainContent";
import MacDeviceRowMenu from "@/features/agent-witch/macDevices/MacDeviceRowMenu";
import confirmMacDeviceRevoke from "@/features/agent-witch/macDevices/utils/confirmMacDeviceRevoke";

interface MacDeviceRowInnerProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly detailText?: string;
  readonly isSelected: boolean;
  readonly isEditing: boolean;
  readonly onSelect?: () => void;
  readonly onEditingChange: (isEditing: boolean) => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onDelegateTask?: (deviceId: string) => void;
  readonly onDelete?: (deviceId: string) => void | Promise<void>;
}

export default function MacDeviceRowInner({
  deviceId,
  displayName,
  isOnline,
  detailText,
  isSelected,
  isEditing,
  onSelect,
  onEditingChange,
  onRenamed,
  onDelegateTask,
  onDelete,
}: MacDeviceRowInnerProps) {
  const mainContent = (
    <MacDeviceRowMainContent
      deviceId={deviceId}
      displayName={displayName}
      isOnline={isOnline}
      detailText={detailText}
      isEditing={isEditing}
      onEditingChange={onEditingChange}
      onRenamed={onRenamed}
    />
  );

  const rowSurfaceClassName =
    onSelect !== undefined && isSelected
      ? "bg-brand-50/60 dark:bg-brand-950/20"
      : "hover:bg-gray-50 dark:hover:bg-white/[0.03]";

  return (
    <div
      className={`group flex w-full items-center gap-3 rounded-lg py-1 ${rowSurfaceClassName}`}
    >
      {onSelect !== undefined ? (
        <div
          role="button"
          tabIndex={0}
          className="min-w-0 flex-1 text-left"
          onClick={onSelect}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelect();
            }
          }}
        >
          {mainContent}
        </div>
      ) : (
        mainContent
      )}
      {isEditing ? null : (
        <MacDeviceRowMenu
          onEdit={() => {
            onEditingChange(true);
          }}
          onDelegateTask={
            onDelegateTask
              ? () => {
                  onDelegateTask(deviceId);
                }
              : undefined
          }
          onDelete={
            onDelete
              ? () => {
                  confirmMacDeviceRevoke(displayName, deviceId, onDelete);
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
