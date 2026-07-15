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

    const [pathname, ...queryParts] = path.split("?");
    const query = queryParts.length > 0 ? `?${queryParts.join("?")}` : "";

    const demoPath =
      pathname === "/"
        ? "/demo/home"
        : pathname === "/admin/groups"
          ? "/demo/admin/groups"
          : `/demo${pathname}`;

    return `${demoPath}${query}`;
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
