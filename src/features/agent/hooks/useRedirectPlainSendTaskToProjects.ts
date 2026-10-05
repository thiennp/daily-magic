"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { resolvePlainSendTaskRedirectPath } from "@/lib/shell/resolvePlainSendTaskRedirectPath";

/** Client replace for retired `?sendTask=1` New task bookmarks → projects intent. */
export const useRedirectPlainSendTaskToProjects = (): void => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const destination = resolvePlainSendTaskRedirectPath(
      new URLSearchParams(searchParams.toString()),
    );
    if (destination === null) {
      return;
    }
    router.replace(destination);
  }, [router, searchParams]);
};
