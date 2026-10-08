"use client";

import { useCallback, useEffect, useState } from "react";

import { PROJECT_CONNECTION_PROVIDER_LABEL as LABEL } from "@/features/projects/settings/connections/projectConnectionProviders.constant";
import {
  formatProjectConnectionsCopy as fmt,
  PROJECT_CONNECTIONS_COPY as C,
} from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import { useProjectConnectionConnectFlow } from "@/features/projects/settings/connections/useProjectConnectionConnectFlow";
import { useProjectConnectionDisconnect } from "@/features/projects/settings/connections/useProjectConnectionDisconnect";

export type ConnectionsNotice = {
  readonly text: string;
  readonly error: boolean;
} | null;

/** Connect + Disconnect flows and the 4s success / error notice. */
export const useProjectConnectionsActions = (input: {
  readonly projectId: string;
  readonly reload: () => void;
}) => {
  const { projectId, reload } = input;
  const [notice, setNotice] = useState<ConnectionsNotice>(null);
  useEffect(() => {
    if (notice === null) return;
    const id = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(id);
  }, [notice]);
  const connectFlow = useProjectConnectionConnectFlow({
    projectId,
    onConnected: useCallback(
      (provider) => {
        reload();
        setNotice({
          text: fmt(C.toastConnected, { service: LABEL[provider] }),
          error: false,
        });
      },
      [reload],
    ),
  });
  const disconnect = useProjectConnectionDisconnect({
    projectId,
    onDone: useCallback(
      (provider, ok) => {
        if (ok) reload();
        setNotice({
          text: fmt(ok ? C.toastDisconnected : C.disconnectFailed, {
            service: LABEL[provider],
          }),
          error: !ok,
        });
      },
      [reload],
    ),
  });
  return { notice, connectFlow, disconnect };
};
