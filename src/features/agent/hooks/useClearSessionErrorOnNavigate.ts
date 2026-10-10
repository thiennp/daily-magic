"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { SEND_TASK_MODAL_QUERY_PARAM } from "@/features/agent/constants/public-api/types";
import { resolveSessionErrorNavigationKey } from "@/features/agent/utils/resolveSessionErrorNavigationKey";

/**
 * d7110873: a failed send's red line belongs to that moment. Moving to
 * another page or opening a New task dialog again clears it, so it never
 * follows the floater around or tops the next dialog.
 */
export const useClearSessionErrorOnNavigate = (input: {
  readonly isError: boolean;
  readonly clearLastResponse: () => void;
}): void => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigationKey = resolveSessionErrorNavigationKey({
    pathname,
    isSendTaskOpen: searchParams.get(SEND_TASK_MODAL_QUERY_PARAM) === "1",
  });
  const previousKey = useRef(navigationKey);
  const { isError, clearLastResponse } = input;

  useEffect(() => {
    if (previousKey.current === navigationKey) {
      return;
    }
    previousKey.current = navigationKey;
    if (isError) {
      clearLastResponse();
    }
  }, [clearLastResponse, isError, navigationKey]);
};
