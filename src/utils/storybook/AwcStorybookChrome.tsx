"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SendTaskModalProvider } from "@/features/agent/SendTaskModalProvider";
import { AgentWitchDashboardProvider } from "@/features/agent-witch/dashboard/public-api/presentation";
import AdminShell from "@/features/admin/AdminShell";
import { AuthSessionProvider } from "@/features/auth/public-api/presentation";
import AppShell from "@/features/shell/AppShell";
import { APP_SHELL_NARROW_CONTENT_CLASS } from "@/features/shell/appShellContentWidth.constant";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";
import AwcStorybookSessionProvider from "@/utils/storybook/AwcStorybookSessionProvider";
import AwcStorybookStatusBanner from "@/utils/storybook/AwcStorybookStatusBanner";

export type AwcStorybookShellVariant =
  "none" | "app" | "app-narrow" | "marketing" | "admin";

export default function AwcStorybookChrome({
  status,
  shell,
  renderPrimaryNav = true,
  children,
}: {
  readonly status: StorybookPageStatus;
  readonly shell: AwcStorybookShellVariant;
  readonly renderPrimaryNav?: boolean;
  readonly children: React.ReactNode;
}) {
  const inner = (() => {
    switch (shell) {
      case "none":
        return children;
      case "marketing":
        return children;
      case "admin":
        return <AdminShell>{children}</AdminShell>;
      case "app-narrow":
        return (
          <AppShell
            contentClassName={APP_SHELL_NARROW_CONTENT_CLASS}
            renderPrimaryNav={renderPrimaryNav}
          >
            {children}
          </AppShell>
        );
      case "app":
        return (
          <AppShell renderPrimaryNav={renderPrimaryNav}>{children}</AppShell>
        );
    }
  })();

  return (
    <ThemeProvider>
      <AuthSessionProvider>
        <AwcStorybookSessionProvider status={status}>
          <AwcStorybookStatusBanner status={status} />
          <SidebarProvider>
            <AgentWitchDashboardProvider>
              <SendTaskModalProvider>{inner}</SendTaskModalProvider>
            </AgentWitchDashboardProvider>
          </SidebarProvider>
        </AwcStorybookSessionProvider>
      </AuthSessionProvider>
    </ThemeProvider>
  );
}
