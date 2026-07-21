"use client";

import MacDeviceRowMainContent from "@/features/agent-witch/macDevices/MacDeviceRowMainContent";
import MacDeviceRowMenu from "@/features/agent-witch/macDevices/MacDeviceRowMenu";
import MacDeviceRowSelectTarget from "@/features/agent-witch/macDevices/MacDeviceRowSelectTarget";
import confirmMacDeviceRevoke from "@/features/agent-witch/macDevices/utils/confirmMacDeviceRevoke";

interface MacDeviceRowInnerProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly detailText?: string;
  readonly detailWarning?: boolean;
  readonly isThisMac?: boolean;
  readonly isSelected: boolean;
  readonly isEditing: boolean;
  readonly onSelect?: () => void;
  readonly onEditingChange: (isEditing: boolean) => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
  readonly onDelegateTask?: (deviceId: string) => void;
  readonly onOpenShell?: () => void;
  readonly onDelete?: (deviceId: string) => void | Promise<void>;
}

export default function MacDeviceRowInner({
  deviceId,
  displayName,
  isOnline,
  detailText,
  detailWarning = false,
  isThisMac = false,
  isSelected,
  isEditing,
  onSelect,
  onEditingChange,
  onRenamed,
  onUpdateLocal,
  onDeleteLocalScript,
  onDelegateTask,
  onOpenShell,
  onDelete,
}: MacDeviceRowInnerProps) {
  const mainContent = (
    <MacDeviceRowMainContent
      deviceId={deviceId}
      displayName={displayName}
      isOnline={isOnline}
      detailText={detailText}
      detailWarning={detailWarning}
      isThisMac={isThisMac}
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
      <MacDeviceRowSelectTarget onSelect={onSelect}>
        {mainContent}
      </MacDeviceRowSelectTarget>
      {isEditing ? null : (
        <MacDeviceRowMenu
          onEdit={() => {
            onEditingChange(true);
          }}
          onUpdateLocal={onUpdateLocal}
          onDeleteLocalScript={onDeleteLocalScript}
          onOpenShell={
            onOpenShell
              ? () => {
                  onOpenShell();
                }
              : undefined
          }
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
