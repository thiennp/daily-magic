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

const useShellNavContext = (): ShellNavFilterContext & {
  readonly isLoading: boolean;
} => {
  const { data: session } = useSession();
  const [context, setContext] = useState<ShellNavFilterContext>(() =>
    resolveFallbackContext(session?.user?.globalRole),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        const response = await fetch(SHELL_CONTEXT_API_PATH);
        if (!response.ok) {
          setContext(resolveFallbackContext(session?.user?.globalRole));
          return;
        }

        const data: unknown = await response.json();
        if (typeof data !== "object" || data === null) {
          setContext(resolveFallbackContext(session?.user?.globalRole));
          return;
        }

        const record = data as Record<string, unknown>;
        setContext({
          teamNavEnabled: record.teamNavEnabled === true,
          showAdminNav: record.showAdminNav === true,
        });
      } catch {
        setContext(resolveFallbackContext(session?.user?.globalRole));
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [session?.user?.globalRole]);

  return { ...context, isLoading };
};

export default useShellNavContext;
