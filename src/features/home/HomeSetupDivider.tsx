"use client";

import { twMerge } from "tailwind-merge";

import { useHomeSetupEmbedded } from "@/features/home/HomeSetupEmbeddedContext";

const HOME_SETUP_DIVIDER_CLASS =
  "border-0 border-t border-gray-200 dark:border-gray-800";

interface HomeSetupDividerProps {
  readonly className?: string;
}

export default function HomeSetupDivider({ className }: HomeSetupDividerProps) {
  const embedded = useHomeSetupEmbedded();

  if (!embedded) {
    return null;
  }

  return (
    <hr
      aria-hidden="true"
      className={twMerge(HOME_SETUP_DIVIDER_CLASS, "my-6", className)}
    />
  );
}
