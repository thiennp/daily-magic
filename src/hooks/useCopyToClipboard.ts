"use client";

import { useCallback, useState } from "react";

export function useCopyToClipboard(resetMs = 2000): {
  readonly copied: boolean;
  readonly copy: (text: string) => Promise<void>;
} {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, resetMs);
    },
    [resetMs],
  );

  return { copied, copy };
}
