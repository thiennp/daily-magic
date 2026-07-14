"use client";

import { useState } from "react";

import { updateMacDeviceLabel } from "@/features/agent-witch/macDevices/utils/macDevicesApi";

interface MacDeviceNameEditorProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isEditing: boolean;
  readonly onEditingChange: (isEditing: boolean) => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
}

export default function MacDeviceNameEditor({
  deviceId,
  displayName,
  isEditing,
  onEditingChange,
  onRenamed,
}: MacDeviceNameEditorProps) {
  const [draftName, setDraftName] = useState(displayName);
  const [isSaving, setIsSaving] = useState(false);

  const stopRowSelection = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };

  const cancelEditing = (event: { stopPropagation: () => void }) => {
    stopRowSelection(event);
    setDraftName(displayName);
    onEditingChange(false);
  };

  const saveName = (event: { stopPropagation: () => void }) => {
    stopRowSelection(event);
    const trimmedName = draftName.trim();
    if (trimmedName.length === 0 || isSaving) {
      return;
    }

    setIsSaving(true);
    void updateMacDeviceLabel(deviceId, trimmedName).then((didSave) => {
      setIsSaving(false);
      if (!didSave) {
        return;
      }

      onRenamed(deviceId, trimmedName);
      onEditingChange(false);
    });
  };

  if (isEditing) {
    return (
      <div
        className="flex w-full min-w-0 items-center gap-2"
        onClick={stopRowSelection}
      >
        <input
          type="text"
          value={draftName}
          onChange={(event) => {
            setDraftName(event.target.value);
          }}
          onClick={stopRowSelection}
          className="h-8 min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          maxLength={80}
          autoFocus
        />
        <button
          type="button"
          onClick={saveName}
          disabled={isSaving || draftName.trim().length === 0}
          className="text-xs font-medium text-brand-600 hover:underline disabled:opacity-50 dark:text-brand-400"
        >
          Save
        </button>
        <button
          type="button"
          onClick={cancelEditing}
          className="text-xs font-medium text-gray-500 hover:underline dark:text-gray-400"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <p className="w-full truncate text-left text-sm font-medium text-gray-800 dark:text-white/90">
      {displayName}
    </p>
  );
}
