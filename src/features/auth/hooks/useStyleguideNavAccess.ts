"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import readDevSecretFromLocalStorage from "@/features/auth/utils/readDevSecretFromLocalStorage";
import { GlobalRole } from "@/lib/auth/roles";

const isAdminGlobalRole = (globalRole: string | undefined): boolean =>
  globalRole === GlobalRole.SUPER_ADMIN || globalRole === GlobalRole.ADMIN;

const useStyleguideNavAccess = (): boolean => {
  const { data: session } = useSession();
  const [hasDevSecret, setHasDevSecret] = useState(false);

  useEffect(() => {
    const syncDevSecret = (): void => {
      setHasDevSecret(readDevSecretFromLocalStorage() !== null);
    };

    syncDevSecret();
    window.addEventListener("storage", syncDevSecret);

    return () => {
      window.removeEventListener("storage", syncDevSecret);
    };
  }, []);

  return isAdminGlobalRole(session?.user?.globalRole) || hasDevSecret;
};

export default useStyleguideNavAccess;
