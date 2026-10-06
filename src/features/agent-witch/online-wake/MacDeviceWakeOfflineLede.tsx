import Link from "next/link";

import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface MacDeviceWakeOfflineLedeProps {
  readonly displayName: string;
  readonly isThisMac: boolean;
}

export default function MacDeviceWakeOfflineLede({
  displayName,
  isThisMac,
}: MacDeviceWakeOfflineLedeProps) {
  if (isThisMac) {
    return (
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        {displayName} is offline. Wake HTTP and the computer client run in one
        process — when nothing is listening locally, run wake.sh in Terminal (or
        Restart below when the wake server responds).
      </p>
    );
  }

  return (
    <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
      {displayName} is offline. Power it on and wait for Agent Witch to
      reconnect at login. If the app is not installed yet, open{" "}
      <Link href="/download" className={APP_SURFACE_TEXT_LINK_CLASS}>
        Download
      </Link>{" "}
      on that Mac.
    </p>
  );
}
