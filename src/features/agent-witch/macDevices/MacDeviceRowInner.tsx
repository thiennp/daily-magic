"use client";

import MacDeviceRowMainContent from "@/features/agent-witch/macDevices/MacDeviceRowMainContent";
import MacDeviceRowMenu from "@/features/agent-witch/macDevices/MacDeviceRowMenu";
import MacDeviceRowSelectTarget from "@/features/agent-witch/macDevices/MacDeviceRowSelectTarget";
import type { MacDeviceRowInnerProps } from "@/features/agent-witch/macDevices/MacDeviceRowInnerProps";
import confirmMacDeviceRevoke from "@/features/agent-witch/macDevices/utils/confirmMacDeviceRevoke";

export default function MacDeviceRowInner({
  deviceId,
  displayName,
  isConnected,
  detailText,
  detailWarning = false,
  isThisMac = false,
  showAnotherComputerBadge = false,
  isSelected,
  isEditing,
  onSelect,
  onEditingChange,
  onRenamed,
  onUpdateLocal,
  onDeleteLocalScript,
  onSeeLocalLog,
  onDelegateTask,
  onOpenShell,
  onDelete,
}: MacDeviceRowInnerProps) {
  const mainContent = (
    <MacDeviceRowMainContent
      deviceId={deviceId}
      displayName={displayName}
      isConnected={isConnected}
      detailText={detailText}
      detailWarning={detailWarning}
      isThisMac={isThisMac}
      showAnotherComputerBadge={showAnotherComputerBadge}
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
          showThisMacSubmenu={isThisMac && isConnected}
          onUpdateLocal={onUpdateLocal}
          onDeleteLocalScript={onDeleteLocalScript}
          onSeeLocalLog={onSeeLocalLog}
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
