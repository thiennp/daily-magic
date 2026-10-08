"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ProjectConnectionProvider } from "@/features/projects/settings/connections/projectConnection.types";
import { requestStartProjectConnection } from "@/features/projects/settings/connections/requestProjectConnectionMutations";
import { requestProjectConnections } from "@/features/projects/settings/connections/requestProjectConnections";

const POLL_MS = 2000;
const GIVE_UP_MS = 5 * 60 * 1000;

export type ConnectFlowState = {
  readonly provider: ProjectConnectionProvider;
  readonly reconnect: boolean;
  readonly phase: "waiting" | "failed";
} | null;

/**
 * Connect / Reconnect: start OAuth, open the sign-in window, then poll the
 * list until the provider flips to connected (design: handshake dialog).
 */
export const useProjectConnectionConnectFlow = (input: {
  readonly projectId: string;
  readonly onConnected: (provider: ProjectConnectionProvider) => void;
}) => {
  const { projectId, onConnected } = input;
  const [state, setState] = useState<ConnectFlowState>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const popup = useRef<Window | null>(null);
  const closedPolls = useRef(0);

  const stop = useCallback((): void => {
    if (timer.current !== null) clearInterval(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => stop, [stop]);

  const begin = useCallback(
    async (provider: ProjectConnectionProvider, reconnect: boolean) => {
      stop();
      setState({ provider, reconnect, phase: "waiting" });
      const before = await requestProjectConnections({ projectId });
      const baseline = before.ok
        ? (before.items.find((i) => i.provider === provider)?.connectedAt ??
          null)
        : null;
      const started = await requestStartProjectConnection({
        projectId,
        provider,
      });
      if (!started.ok) {
        setState({ provider, reconnect, phase: "failed" });
        return;
      }
      popup.current = window.open(
        started.url,
        "awc-connect",
        "popup,width=520,height=720",
      );
      if (popup.current === null) {
        window.location.assign(started.url);
        return;
      }
      const startedAt = Date.now();
      closedPolls.current = 0;
      timer.current = setInterval(() => {
        void requestProjectConnections({ projectId }).then((result) => {
          const row = result.ok
            ? result.items.find((i) => i.provider === provider)
            : undefined;
          if (row?.status === "connected" && row.connectedAt !== baseline) {
            stop();
            popup.current?.close();
            setState(null);
            onConnected(provider);
            return;
          }
          closedPolls.current = popup.current?.closed
            ? closedPolls.current + 1
            : 0;
          if (closedPolls.current >= 2 || Date.now() - startedAt > GIVE_UP_MS) {
            stop();
            setState({ provider, reconnect, phase: "failed" });
          }
        });
      }, POLL_MS);
    },
    [projectId, onConnected, stop],
  );

  const cancel = useCallback((): void => {
    stop();
    popup.current?.close();
    setState(null);
  }, [stop]);

  return { state, begin, cancel };
};
