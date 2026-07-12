"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import { demoPreviewSnapshot } from "@/features/demo/demoPreviewSnapshot";
import type DemoPreviewSnapshot from "@/features/demo/types/DemoPreviewSnapshot.type";

export type { DemoPreviewSnapshot };

const DemoPreviewContext = createContext<DemoPreviewSnapshot | null>(null);

export function DemoPreviewProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const value = useMemo(() => demoPreviewSnapshot, []);

  return (
    <DemoPreviewContext.Provider value={value}>
      {children}
    </DemoPreviewContext.Provider>
  );
}

export function useDemoPreview(): DemoPreviewSnapshot | null {
  return useContext(DemoPreviewContext);
}

export function useAppPath(): (path: string) => string {
  const demoPreview = useDemoPreview();

  return (path: string) => {
    if (!demoPreview) {
      return path;
    }

    if (path === "/") {
      return "/demo/home";
    }

    if (path === "/admin/groups") {
      return "/demo/admin/groups";
    }

    return `/demo${path}`;
  };
}

export function normalizeAppPathname(pathname: string): string {
  if (!pathname.startsWith("/demo")) {
    return pathname;
  }

  if (pathname === "/demo" || pathname === "/demo/home") {
    return "/";
  }

  return pathname.slice("/demo".length);
}
