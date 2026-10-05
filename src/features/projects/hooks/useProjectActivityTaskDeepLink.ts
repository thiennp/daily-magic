"use client";

import { useEffect } from "react";

import {
  PROJECT_ACTIVITY_TASK_ANCHOR_ID,
  PROJECT_ACTIVITY_TASK_HASH,
} from "@/features/projects/utils/projectActivityTaskDeepLink.constant";

const hashWantsTaskMode = (hash: string): boolean => {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  return raw === PROJECT_ACTIVITY_TASK_HASH || raw.startsWith("activity?mode=task");
};

/** When `#activity?mode=task` is present, focus the task assign surface. */
export const useProjectActivityTaskDeepLink = (): void => {
  useEffect(() => {
    const focusTaskSurface = (): void => {
      if (!hashWantsTaskMode(window.location.hash)) {
        return;
      }
      const anchor = document.getElementById(PROJECT_ACTIVITY_TASK_ANCHOR_ID);
      if (anchor === null) {
        return;
      }
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      const focusable = anchor.querySelector<HTMLElement>(
        "select, textarea, input, button",
      );
      focusable?.focus();
    };

    focusTaskSurface();
    window.addEventListener("hashchange", focusTaskSurface);
    return () => {
      window.removeEventListener("hashchange", focusTaskSurface);
    };
  }, []);
};
