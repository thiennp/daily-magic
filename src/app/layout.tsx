import { Outfit } from "next/font/google";
import "./globals.css";
import "flatpickr/dist/flatpickr.css";
import AuthSessionProvider from "@/features/auth/AuthSessionProvider";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type { Metadata } from "next";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily Magic",
  description: "Next.js app with Neon and TailAdmin styleguide",
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
      </body>
    </html>
  );
}
