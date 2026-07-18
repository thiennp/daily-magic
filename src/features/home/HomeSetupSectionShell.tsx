"use client";

import { useState, type ReactNode, type SyntheticEvent } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import { shouldLazyMountHomeSetupContent } from "@/features/home/utils/shouldLazyMountHomeSetupContent";

interface HomeSetupSectionShellProps {
  readonly children: ReactNode;
}

/**
 * Only mounts heavy setup children (harness socket, policy) after the user expands.
 */
export default function HomeSetupSectionShell({
  children,
}: HomeSetupSectionShellProps) {
  const [hasExpanded, setHasExpanded] = useState(false);

  const handleToggle = (event: SyntheticEvent<HTMLElement>): void => {
    const target = event.currentTarget;
    if ("open" in target && target.open === true) {
      setHasExpanded(true);
    }
  };

  return (
    <AppPanel as="details" id="your-setup" onToggle={handleToggle}>
      <summary className="cursor-pointer text-lg font-semibold text-gray-800 dark:text-white/90">
        Your setup (rules and sharing)
      </summary>
      {shouldLazyMountHomeSetupContent(hasExpanded) ? children : null}
    </AppPanel>
  );
}
