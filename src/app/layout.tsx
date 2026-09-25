import { Inter } from "next/font/google";
import "./globals.css";
import "flatpickr/dist/flatpickr.css";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import type { Metadata } from "next";

const inter = Inter({
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
      <body className={`${inter.className} dark:bg-gray-900`}>{children}</body>
    </html>
  );
}
