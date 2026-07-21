"use client";

import { APP_SURFACE_CTA_SECONDARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface SendTaskComposerCursorCloudPickerRowProps {
  readonly onSelect: () => void;
}

export default function SendTaskComposerCursorCloudPickerRow({
  onSelect,
}: SendTaskComposerCursorCloudPickerRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left ${APP_SURFACE_CTA_SECONDARY_CLASS}`}
    >
      <span className="block font-medium text-gray-900 dark:text-white/90">
        Cursor Cloud
      </span>
      <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
        Run in Cursor&apos;s cloud VM (no Mac required)
      </span>
    </button>
  );
}
