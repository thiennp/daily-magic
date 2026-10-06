import Link from "next/link";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import RepairThisComputerCommandBlock from "@/features/setup/repairThisComputer/RepairThisComputerCommandBlock";
import { REPAIR_THIS_COMPUTER_PAGE_COPY } from "@/features/setup/repairThisComputer/repairThisComputerPageCopy.constant";
import { resolveRepairThisComputerCommands } from "@/features/setup/repairThisComputer/resolveRepairThisComputerCommands";
import { AGENT_WITCH_LOCAL_DOWNLOAD_URL } from "@/lib/agentWitch/agentWitchLocalTooOld.constant";

export default function RepairThisComputerPageBody() {
  const copy = REPAIR_THIS_COMPUTER_PAGE_COPY;
  const commands = resolveRepairThisComputerCommands();

  return (
    <article className="mx-auto max-w-2xl space-y-8 py-2 sm:py-4">
      <header className="space-y-2">
        <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>{copy.eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {copy.title}
        </h1>
        <p className={`text-base ${APP_SURFACE_BODY_TEXT_CLASS}`}>{copy.intro}</p>
      </header>

      <section className="space-y-3" aria-labelledby="repair-update">
        <h2
          id="repair-update"
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          {copy.updateHeading}
        </h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>{copy.updateIntro}</p>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          <Link
            href={AGENT_WITCH_LOCAL_DOWNLOAD_URL}
            className="font-medium underline underline-offset-2"
          >
            {copy.updateDownloadLinkLabel}
          </Link>
        </p>
        <RepairThisComputerCommandBlock
          label={copy.updateUnixLabel}
          command={commands.updateUnix}
        />
        <RepairThisComputerCommandBlock
          label={copy.updateWindowsLabel}
          command={commands.updateWindows}
        />
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>{copy.updateKeepsLink}</p>
      </section>

      <section className="space-y-3" aria-labelledby="repair-restart">
        <h2
          id="repair-restart"
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          {copy.restartHeading}
        </h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>{copy.restartIntro}</p>
        <RepairThisComputerCommandBlock
          label="macOS"
          command={commands.restartMacos}
        />
        <RepairThisComputerCommandBlock
          label="Linux or WSL"
          command={commands.restartLinux}
        />
      </section>

      <section className="space-y-3" aria-labelledby="repair-reconnect">
        <h2
          id="repair-reconnect"
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          {copy.reconnectHeading}
        </h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>{copy.reconnectBody}</p>
      </section>

      <section className="space-y-3" aria-labelledby="repair-check">
        <h2
          id="repair-check"
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          {copy.checkHeading}
        </h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>{copy.checkIntro}</p>
        <RepairThisComputerCommandBlock
          label="Health check"
          command={commands.healthCheck}
        />
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>{copy.checkOkHint}</p>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>{copy.checkAfter}</p>
      </section>
    </article>
  );
}
