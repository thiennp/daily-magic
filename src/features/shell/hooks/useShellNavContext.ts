"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import type { ShellNavFilterContext } from "@/lib/shell/filterAppNavForShellContext";
import { isGlobalRole, isPrivilegedGlobalRole } from "@/lib/auth/roles";

const SHELL_CONTEXT_API_PATH = "/api/me/shell-context";

const resolveFallbackContext = (
  globalRole: string | undefined,
): ShellNavFilterContext => ({
  teamNavEnabled: false,
  showAdminNav:
    globalRole !== undefined &&
    isGlobalRole(globalRole) &&
    isPrivilegedGlobalRole(globalRole),
});

/** Shared in-flight fetch so desktop nav + mobile menu do not double-hit the API. */
let shellContextInflight: Promise<ShellNavFilterContext> | null = null;

const loadShellNavContext = (
  globalRole: string | undefined,
): Promise<ShellNavFilterContext> => {
  if (shellContextInflight !== null) {
    return shellContextInflight;
  }

  shellContextInflight = (async (): Promise<ShellNavFilterContext> => {
    try {
      const response = await fetch(SHELL_CONTEXT_API_PATH);
      if (!response.ok) {
        return resolveFallbackContext(globalRole);
      }

      const data: unknown = await response.json();
      if (typeof data !== "object" || data === null) {
        return resolveFallbackContext(globalRole);
      }

      const record = data as Record<string, unknown>;
      return {
        teamNavEnabled: record.teamNavEnabled === true,
        showAdminNav: record.showAdminNav === true,
      };
    } catch {
      return resolveFallbackContext(globalRole);
    } finally {
      shellContextInflight = null;
    }
  })();

  return shellContextInflight;
};

const useShellNavContext = (): ShellNavFilterContext & {
  readonly isLoading: boolean;
} => {
  const { data: session, status } = useSession();
  const hasUser = session?.user != null;
  const globalRole = session?.user?.globalRole;
  const isAuthenticated = status === "authenticated" && hasUser;
  const authKey = isAuthenticated ? `authed:${globalRole ?? ""}` : status;

  const [context, setContext] = useState<ShellNavFilterContext>(() =>
    resolveFallbackContext(globalRole),
  );
  /** Set only in the async completion of the authenticated fetch. */
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated" || !hasUser) {
      return;
    }

    let cancelled = false;
    void loadShellNavContext(globalRole).then((next) => {
      if (cancelled) {
        return;
      }
      setContext(next);
      setLoadedKey(authKey);
    });

    return () => {
      cancelled = true;
    };
  }, [authKey, globalRole, hasUser, status]);

  const resolvedContext = isAuthenticated
    ? context
    : resolveFallbackContext(undefined);
  const isLoading =
    status === "loading" || (isAuthenticated && loadedKey !== authKey);

  return { ...resolvedContext, isLoading };
};

export default useShellNavContext;
