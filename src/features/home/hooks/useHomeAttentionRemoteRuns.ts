"use client";

import { useEffect } from "react";

import { loadHomeAttentionRemoteRuns } from "@/features/home/utils/loadHomeAttentionRemoteRuns";
import { POLL_INTERVAL_MS } from "@/features/reports/public-api/types";

const HOME_ATTENTION_REMOTE_REFRESH_MS = POLL_INTERVAL_MS * 12;

/** e48cd107: keep the attention list in sync with the server while on Home. */
export default function useHomeAttentionRemoteRuns(): void {
  useEffect(() => {
    void loadHomeAttentionRemoteRuns();
    const timer = window.setInterval(() => {
      void loadHomeAttentionRemoteRuns();
    }, HOME_ATTENTION_REMOTE_REFRESH_MS);
    return () => {
      window.clearInterval(timer);
    };
  }, []);
}
