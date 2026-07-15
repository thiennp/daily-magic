import { Outfit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import "flatpickr/dist/flatpickr.css";
import AppGoogleAnalytics from "@/components/analytics/AppGoogleAnalytics";
import GoogleAnalyticsPageView from "@/components/analytics/GoogleAnalyticsPageView";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import AuthSessionProvider from "@/features/auth/AuthSessionProvider";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type { Metadata } from "next";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: AGENT_WITCH_PRODUCT_NAME,
  description:
    "Send AI tasks to your team's Macs with approval rules and job history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <AuthSessionProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </AuthSessionProvider>
        </ThemeProvider>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
      </body>
      <AppGoogleAnalytics />
    </html>
  );
}
