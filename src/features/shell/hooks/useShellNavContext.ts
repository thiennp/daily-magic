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
  const [context, setContext] = useState<ShellNavFilterContext>(() =>
    resolveFallbackContext(session?.user?.globalRole),
  );
  const [isLoading, setIsLoading] = useState(status === "loading");

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    if (status !== "authenticated" || session?.user == null) {
      setContext(resolveFallbackContext(undefined));
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    const globalRole = session.user.globalRole;
    setIsLoading(true);
    void loadShellNavContext(globalRole).then((next) => {
      if (cancelled) {
        return;
      }
      setContext(next);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [session?.user, session?.user?.globalRole, status]);

  return { ...context, isLoading };
};

export default useShellNavContext;
