"use client";

import { useEffect, useState } from "react";

import buildProjectPitfallsPath from "@/lib/projects/pitfalls/buildProjectPitfallsPath";
import parseProjectPitfallList from "@/lib/projects/pitfalls/parseProjectPitfallList";
import type { ProjectPitfallView } from "@/lib/projects/pitfalls/ProjectPitfall.type";

export type AwcProjectPitfallsState =
  | { readonly status: "loading" }
  | { readonly status: "hidden" }
  | {
      readonly status: "ready";
      readonly items: readonly ProjectPitfallView[];
      readonly syncedAt: string | null;
    };

/**
 * Loads active pitfalls from Cloud (session auth). Any failure (no access,
 * route error, bad shape) resolves to "hidden" so the section disappears
 * instead of showing a broken state.
 */
const useAwcProjectPitfalls = (projectId: string): AwcProjectPitfallsState => {
  const [state, setState] = useState<AwcProjectPitfallsState>({
    status: "loading",
  });

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      setState({ status: "loading" });
      try {
        const response = await fetch(buildProjectPitfallsPath(projectId), {
          signal: controller.signal,
        });
        if (!response.ok) {
          setState({ status: "hidden" });
          return;
        }
        const parsed = parseProjectPitfallList(await response.json());
        setState(
          parsed === null
            ? { status: "hidden" }
            : {
                status: "ready",
                items: parsed.items,
                syncedAt: parsed.syncedAt,
              },
        );
      } catch {
        if (!controller.signal.aborted) {
          setState({ status: "hidden" });
        }
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, [projectId]);

  return state;
};

export default useAwcProjectPitfalls;
