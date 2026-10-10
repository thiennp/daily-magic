"use client";

import { useEffect, useState } from "react";

import { fetchAgentRunDetail } from "@/features/reports/public-api/presentation";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export type AwcProjectReportDetailState =
  | { readonly status: "loading" }
  | { readonly status: "ok"; readonly run: EnrichedAgentRunRecord }
  | { readonly status: "missing" }
  | { readonly status: "error" };

/**
 * One report for `#reports?report=<id>`: list hit first, else
 * `/api/agent-runs/<id>`. A run from another project reads as missing.
 */
const useAwcProjectReportDetail = (input: {
  readonly projectId: string;
  readonly runId: string;
  readonly listRun: EnrichedAgentRunRecord | null;
}): AwcProjectReportDetailState => {
  const { projectId, runId, listRun } = input;
  const [fetched, setFetched] = useState<{
    readonly runId: string;
    readonly state: AwcProjectReportDetailState;
  } | null>(null);

  useEffect(() => {
    if (listRun !== null) {
      return undefined;
    }
    const controller = new AbortController();
    void fetchAgentRunDetail(runId)
      .then((outcome): AwcProjectReportDetailState => {
        if (outcome.status === "ok") {
          return outcome.run.projectId === projectId
            ? { status: "ok", run: outcome.run }
            : { status: "missing" };
        }
        return { status: outcome.status === "not_found" ? "missing" : "error" };
      })
      .catch((): AwcProjectReportDetailState => ({ status: "error" }))
      .then((state) => {
        if (!controller.signal.aborted) {
          setFetched({ runId, state });
        }
      });
    return () => {
      controller.abort();
    };
  }, [listRun, projectId, runId]);

  if (listRun !== null) {
    return { status: "ok", run: listRun };
  }
  return fetched !== null && fetched.runId === runId
    ? fetched.state
    : { status: "loading" };
};

export default useAwcProjectReportDetail;
