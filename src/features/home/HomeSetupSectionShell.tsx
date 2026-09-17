"use client";

import {
  useEffect,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import AppIcon from "@/components/ui/icon/AppIcon";
import {
  HOME_SETUP_CHEVRON_CLASS,
  HOME_SETUP_DETAILS_CLASS,
  HOME_SETUP_EXPANDED_CONTENT_CLASS,
  HOME_SETUP_SUMMARY_CLASS,
} from "@/features/home/constants/homeSetupSectionShellClasses.constant";
import { openHomeSetupFromLocationHash } from "@/features/home/utils/openHomeSetupFromLocationHash";
import { shouldLazyMountHomeSetupContent } from "@/features/home/utils/shouldLazyMountHomeSetupContent";
import { ChevronDownIcon } from "@/icons";
import { twMerge } from "tailwind-merge";

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!openHomeSetupFromLocationHash()) {
      return;
    }
    // Deep-link bootstrap: sync React chevron/lazy-mount with native <details open>.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- HOME-039 hash navigation
    setHasExpanded(true);
     
    setIsOpen(true);
  }, []);

  const handleToggle = (event: SyntheticEvent<HTMLElement>): void => {
    const target = event.currentTarget;
    if ("open" in target && typeof target.open === "boolean") {
      setIsOpen(target.open);
      if (target.open) {
        setHasExpanded(true);
      }
    }
  };

  return (
    <AppPanel
      as="details"
      id="your-setup"
      className={HOME_SETUP_DETAILS_CLASS}
      onToggle={handleToggle}
    >
      <summary className={HOME_SETUP_SUMMARY_CLASS}>
        <AppIcon
          icon={ChevronDownIcon}
          size="sm"
          className={twMerge(
            HOME_SETUP_CHEVRON_CLASS,
            isOpen ? "rotate-180" : undefined,
          )}
        />
        <span>Your setup (rules and sharing)</span>
      </summary>
      {shouldLazyMountHomeSetupContent(hasExpanded) ? (
        <div className={HOME_SETUP_EXPANDED_CONTENT_CLASS}>{children}</div>
      ) : null}
    </AppPanel>
  );
}
