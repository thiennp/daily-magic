import { Suspense } from "react";

import AppGoogleAnalytics from "@/components/analytics/AppGoogleAnalytics";
import GoogleAnalyticsPageView from "@/components/analytics/GoogleAnalyticsPageView";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SendTaskModalProvider } from "@/features/agent/SendTaskModalProvider";
import AgentAccessWebMcpBridge from "@/features/agent-access/AgentAccessWebMcpBridge";
import { AgentWitchDashboardProvider } from "@/features/agent-witch/dashboard/AgentWitchDashboardProvider";
import AuthSessionProvider from "@/features/auth/AuthSessionProvider";

export default function AppChromeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AgentAccessWebMcpBridge />
      <ThemeProvider>
        <AuthSessionProvider>
          <SidebarProvider>
            <AgentWitchDashboardProvider>
              <SendTaskModalProvider>{children}</SendTaskModalProvider>
            </AgentWitchDashboardProvider>
          </SidebarProvider>
        </AuthSessionProvider>
      </ThemeProvider>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView />
      </Suspense>
      <AppGoogleAnalytics />
    </>
  );
}
