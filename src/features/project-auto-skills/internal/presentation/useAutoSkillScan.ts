"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { postAutoSkillScan } from "@/features/project-auto-skills/internal/presentation/autoSkillsApi";

const SCAN_POLL_MS = 4_000;
const SCAN_MAX_WAIT_MS = 180_000;

export interface AutoSkillScan {
  /** True from pressing "Scan past tasks" until the computer reports back. */
  readonly scanning: boolean;
  readonly scanError: string | null;
  readonly scan: () => Promise<void>;
}

/**
 * Manual scan: asks the owner's computers to run past tasks through auto
 * skills, then polls `reload` until a fresh "last checked" arrives.
 */
export const useAutoSkillScan = (input: {
  readonly projectId: string;
  readonly lastCheckedAt: string | null;
  readonly reload: () => void;
}): AutoSkillScan => {
  const { projectId, lastCheckedAt, reload } = input;
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const startedAtMs = useRef(0);
  const checkedBefore = useRef<string | null>(null);

  useEffect(() => {
    if (!scanning) {
      return;
    }
    const finished = lastCheckedAt !== checkedBefore.current;
    if (finished || Date.now() - startedAtMs.current > SCAN_MAX_WAIT_MS) {
      setScanning(false);
      return;
    }
    const timer = setTimeout(reload, SCAN_POLL_MS);
    return () => clearTimeout(timer);
  }, [scanning, lastCheckedAt, reload]);

  const scan = useCallback(async (): Promise<void> => {
    setScanError(null);
    startedAtMs.current = Date.now();
    checkedBefore.current = lastCheckedAt;
    setScanning(true);
    const result = await postAutoSkillScan(projectId);
    if (!result.ok) {
      setScanning(false);
      setScanError(result.errorMessage ?? "Could not start the scan.");
    }
  }, [projectId, lastCheckedAt]);

  return { scanning, scanError, scan };
};
