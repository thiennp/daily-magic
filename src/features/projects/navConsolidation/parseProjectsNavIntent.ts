"use client";

import {
  isNavConsolidationIntent,
  type NavConsolidationIntent,
} from "@/lib/shell/navConsolidationIntent.constant";

export const parseProjectsNavIntent = (
  raw: string | null | undefined,
): NavConsolidationIntent | null => {
  if (typeof raw !== "string") {
    return null;
  }
  const trimmed = raw.trim();
  return isNavConsolidationIntent(trimmed) ? trimmed : null;
};
