import Link from "next/link";
import type { ReactElement } from "react";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { AGENT_WITCH_LIVE_APP_ORIGIN } from "@agent-witch/shared/network";

const liveHref = `${AGENT_WITCH_LIVE_APP_ORIGIN}/prompt-sdlc`;

export default function PromptSdlcPage(): ReactElement {
  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Prompt SDLC"
        description="Prompt SDLC runs in Agent Witch Live on this Mac. You choose the folder, the pass score, and who scores and rewrites the prompt. The judge and the improver run inside that folder, so they can read the Playbook and the code. A score from a tool that never sees that folder is not about this project."
      />
      <p>
        <Link href={liveHref} className={APP_SURFACE_TEXT_LINK_CLASS}>
          Open Prompt SDLC in Agent Witch Live
        </Link>
      </p>
      <p>
        <Link
          href={`${liveHref}/guide`}
          className={APP_SURFACE_TEXT_LINK_CLASS}
        >
          Instructions in Agent Witch Live
        </Link>
      </p>
    </div>
  );
}
