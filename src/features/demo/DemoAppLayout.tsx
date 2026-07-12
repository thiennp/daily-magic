"use client";

import DemoPreviewBanner from "@/features/demo/DemoPreviewBanner";
import { DemoPreviewProvider } from "@/features/demo/DemoPreviewContext";
import AppShell from "@/features/shell/AppShell";
import { APP_SHELL_WIDE_CONTENT_CLASS } from "@/features/shell/appShellContentWidth.constant";

interface DemoAppLayoutProps {
  readonly children: React.ReactNode;
}

export default function DemoAppLayout({ children }: DemoAppLayoutProps) {
  return (
    <DemoPreviewProvider>
      <DemoPreviewBanner />
      <AppShell contentClassName={APP_SHELL_WIDE_CONTENT_CLASS}>
        {children}
      </AppShell>
    </DemoPreviewProvider>
  );
}
