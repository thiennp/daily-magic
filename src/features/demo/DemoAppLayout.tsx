"use client";

import DemoPreviewBanner from "@/features/demo/DemoPreviewBanner";
import { DemoPreviewProvider } from "@/features/demo/DemoPreviewContext";
import AppShell from "@/features/shell/AppShell";

interface DemoAppLayoutProps {
  readonly children: React.ReactNode;
}

export default function DemoAppLayout({ children }: DemoAppLayoutProps) {
  return (
    <DemoPreviewProvider>
      <DemoPreviewBanner />
      <AppShell>{children}</AppShell>
    </DemoPreviewProvider>
  );
}
