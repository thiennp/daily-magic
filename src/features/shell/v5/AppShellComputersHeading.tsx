import {
  APP_SHELL_V5_HEADING_CLASS,
  APP_SHELL_V5_LATEST_CHIP_CLASS,
  APP_SHELL_V5_META_CLASS,
} from "@/features/shell/v5/appShellV5Classes.constant";
import {
  APP_SHELL_COMPUTERS_COPY,
  formatComputersLatestLabel,
} from "@/features/shell/v5/appShellComputersCopy.constant";

interface AppShellComputersHeadingProps {
  readonly statusLine: string;
  readonly serverInstallBundleVersion: string | null;
}

/** "Computers · Latest v{n}" (I12 — no Bundle / AWL jargon) + presence line. */
export default function AppShellComputersHeading({
  statusLine,
  serverInstallBundleVersion,
}: AppShellComputersHeadingProps) {
  const latestLabel = formatComputersLatestLabel(serverInstallBundleVersion);

  return (
    <div>
      <div className="flex min-w-0 items-center justify-between gap-2">
        <h2 className={APP_SHELL_V5_HEADING_CLASS}>
          {APP_SHELL_COMPUTERS_COPY.heading}
        </h2>
        {latestLabel !== null ? (
          <span className={APP_SHELL_V5_LATEST_CHIP_CLASS}>{latestLabel}</span>
        ) : null}
      </div>
      <p className={`mt-1 ${APP_SHELL_V5_META_CLASS}`}>{statusLine}</p>
    </div>
  );
}
