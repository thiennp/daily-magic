"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { isAutoSkillScanProgressNote } from "@/features/project-auto-skills/internal/core/isAutoSkillScanProgressNote";
import { postAutoSkillScan } from "@/features/project-auto-skills/internal/presentation/autoSkillsApi";

const SCAN_POLL_MS = 4_000;
const SCAN_MAX_WAIT_MS = 180_000;

export interface AutoSkillScan {
  /** True from pressing "Scan past tasks" until the computer reports back. */
  readonly scanning: boolean;
  /** True while the running scan is the project-docs one. */
  readonly scanningDocs: boolean;
  readonly scanError: string | null;
  readonly scan: () => Promise<void>;
  readonly scanDocs: () => Promise<void>;
  /** Scan again, reading this many main-branch commits (git folders). */
  readonly scanCommits: (commits: number) => Promise<void>;
}

/**
 * Manual scan: asks the owner's computers to run past tasks through auto
 * skills, then polls `reload` until a fresh "last checked" arrives.
 */
export const useAutoSkillScan = (input: {
  readonly projectId: string;
  readonly lastCheckedAt: string | null;
  /** The computer's last status line; a progress line means the scan is still going. */
  readonly statusNote?: string | null;
  readonly reload: () => void;
}): AutoSkillScan => {
  const { projectId, lastCheckedAt, reload, statusNote = null } = input;
  const [scanning, setScanning] = useState(false);
  const [scanningDocs, setScanningDocs] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const startedAtMs = useRef(0);
  const checkedBefore = useRef<string | null>(null);

  useEffect(() => {
    if (!scanning) {
      return;
    }
    const progressing = isAutoSkillScanProgressNote(statusNote);
    if (progressing) {
      startedAtMs.current = Date.now(); // alive: each new line restarts the wait
    }
    const finished = lastCheckedAt !== checkedBefore.current && !progressing;
    if (finished || Date.now() - startedAtMs.current > SCAN_MAX_WAIT_MS) {
      setScanning(false);
      setScanningDocs(false);
      return;
    }
    const timer = setTimeout(reload, SCAN_POLL_MS);
    return () => clearTimeout(timer);
  }, [scanning, lastCheckedAt, statusNote, reload]);

  const run = useCallback(
    async (docs: boolean, commits?: number): Promise<void> => {
      setScanError(null);
      startedAtMs.current = Date.now();
      checkedBefore.current = lastCheckedAt;
      setScanningDocs(docs);
      setScanning(true);
      const result = await postAutoSkillScan(projectId, {
        docs,
        ...(commits !== undefined ? { commits } : {}),
      });
      if (!result.ok) {
        setScanning(false);
        setScanningDocs(false);
        setScanError(result.errorMessage ?? "Could not start the scan.");
      }
    },
    [projectId, lastCheckedAt],
  );
  const scan = useCallback((): Promise<void> => run(false), [run]);
  const scanDocs = useCallback((): Promise<void> => run(true), [run]);

  const scanCommits = useCallback(
    (commits: number): Promise<void> => run(false, commits),
    [run],
  );

  return { scanning, scanningDocs, scanError, scan, scanDocs, scanCommits };
};
