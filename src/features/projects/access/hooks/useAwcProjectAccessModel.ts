"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import type {
  AwcProjectAccessFolderRef,
  AwcProjectAccessInvite,
  AwcProjectAccessMember,
  AwcProjectAccessPending,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";

/** State + refs owned by the Project Access panel (setters/refs are stable). */
export const useAwcProjectAccessModel = () => {
  const [members, setMembers] = useState<readonly AwcProjectAccessMember[]>([]);
  const [pending, setPending] = useState<readonly AwcProjectAccessPending[]>(
    [],
  );
  const [folderRefs, setFolderRefs] = useState<
    readonly AwcProjectAccessFolderRef[]
  >([]);
  const [invites, setInvites] = useState<readonly AwcProjectAccessInvite[]>([]);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoApprovedBanner, setAutoApprovedBanner] = useState<string | null>(
    null,
  );
  const [recentlyAutoApprovedIds, setRecentlyAutoApprovedIds] = useState<
    readonly string[]
  >([]);
  const knownMemberIdsRef = useRef<ReadonlySet<string> | null>(null);
  const skipAutoApproveDetectRef = useRef(false);
  const markSkipAutoApproveDetect = useCallback(() => {
    skipAutoApproveDetectRef.current = true;
  }, []);
  const bannerTimerRef = useRef<number | null>(null);

  const snapshotSetters = useMemo(
    () => ({
      setMembers,
      setPending,
      setFolderRefs,
      setInvites,
      setProjectName,
      setLoadError,
      setAutoApprovedBanner,
      setRecentlyAutoApprovedIds,
    }),
    [],
  );

  return {
    members,
    pending,
    folderRefs,
    invites,
    projectName,
    message,
    loadError,
    isLoading,
    autoApprovedBanner,
    recentlyAutoApprovedIds,
    setFolderRefs,
    setMessage,
    setIsLoading,
    snapshotSetters,
    knownMemberIdsRef,
    skipAutoApproveDetectRef,
    markSkipAutoApproveDetect,
    bannerTimerRef,
  };
};
