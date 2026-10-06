"use client";

import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

import { APP_SURFACE_BASH_TERMINAL_PRE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { AWL_REPAIR_MANUALLY_COPY } from "@/features/agent-witch/macDevices/repairManually/awlRepairManuallyCopy.constant";

interface AwlRepairManuallyCommandBlockProps {
  readonly command: string;
}

const COPY_BUTTON_CLASS =
  "m-2 self-start rounded-md border border-white/20 px-2 py-1 text-xs font-medium text-white hover:bg-white/10";

/** Terminal block with a text "Copy" → "Copied" button. */
export default function AwlRepairManuallyCommandBlock({
  command,
}: AwlRepairManuallyCommandBlockProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }, [command]);

  return (
    <div
      className={twMerge(
        APP_SURFACE_BASH_TERMINAL_PRE_CLASS,
        "mt-2 grid grid-cols-[minmax(0,1fr)_auto] overflow-hidden p-0",
      )}
    >
      <pre className="min-w-0 overflow-x-auto p-3 font-mono text-xs text-white">
        <code>{command}</code>
      </pre>
      <button type="button" onClick={handleCopy} className={COPY_BUTTON_CLASS}>
        {copied
          ? AWL_REPAIR_MANUALLY_COPY.copied
          : AWL_REPAIR_MANUALLY_COPY.copy}
      </button>
    </div>
  );
}
