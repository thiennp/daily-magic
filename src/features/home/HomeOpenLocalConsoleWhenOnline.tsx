"use client";

import HomeOpenLocalConsoleLink from "@/features/home/HomeOpenLocalConsoleLink";
import useThisMacHasConnectedLocalBridge from "@/features/home/hooks/useThisMacHasConnectedLocalBridge";

export default function HomeOpenLocalConsoleWhenOnline() {
  const showLocalConsole = useThisMacHasConnectedLocalBridge();

  if (!showLocalConsole) {
    return null;
  }

  return (
    <HomeOpenLocalConsoleLink
      className="mt-3 inline-flex"
      label="Open Mac console (127.0.0.1:43347)"
    />
  );
}
