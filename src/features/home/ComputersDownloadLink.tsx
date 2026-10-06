"use client";

import Link from "next/link";

import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/appShellComputersCopy.constant";

interface ComputersDownloadLinkProps {
  readonly className?: string;
}

/**
 * Download AWL entry for Computers / Connect surfaces.
 * Always render when the parent mounts this — never gate on connected devices
 * (Thien HARD: Download stays visible even when a computer is already connected).
 * Label from design Computers/Connect HTML (Download AgentWitch).
 */
export default function ComputersDownloadLink({
  className,
}: ComputersDownloadLinkProps) {
  return (
    <Link
      href="/download"
      className={className ?? APP_SURFACE_TEXT_LINK_CLASS}
    >
      {APP_SHELL_COMPUTERS_COPY.download}
    </Link>
  );
}
