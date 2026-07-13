"use client";

import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

const openYourSetupSection = (): void => {
  const setupSection = document.getElementById("your-setup");
  if (!(setupSection instanceof HTMLDetailsElement)) {
    return;
  }

  setupSection.open = true;
  setupSection.scrollIntoView({ behavior: "smooth", block: "start" });
};

interface ConnectAnotherMacLinkProps {
  readonly className?: string;
}

export default function ConnectAnotherMacLink({
  className,
}: ConnectAnotherMacLinkProps) {
  return (
    <button
      type="button"
      onClick={openYourSetupSection}
      className={className ?? APP_SURFACE_TEXT_LINK_CLASS}
    >
      Connect another Mac
    </button>
  );
}
