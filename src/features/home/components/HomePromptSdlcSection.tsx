import Link from "next/link";
import type { ReactElement } from "react";

import HomePromptOptimizerComposeCard from "@/features/home/components/HomePromptOptimizerComposeCard";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

interface HomePromptSdlcSectionProps {
  readonly showComposeForm?: boolean;
  readonly storybookPreview?: boolean;
}

export default function HomePromptSdlcSection({
  showComposeForm = false,
  storybookPreview = false,
}: HomePromptSdlcSectionProps = {}): ReactElement {
  return (
    <section
      id="prompt-optimizer"
      aria-labelledby="prompt-sdlc-heading"
      className="scroll-mt-24 rounded-2xl border border-awc-border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.02] sm:p-8"
    >
      <p className="text-sm font-medium uppercase tracking-wider text-awc-fg-muted">
        Prompt optimizer
      </p>
      <h2
        id="prompt-sdlc-heading"
        className="mt-2 text-2xl font-semibold text-awc-fg dark:text-white"
      >
        The prompt optimizer runs inside the project on your computer.
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-awc-fg-muted dark:text-gray-300">
        Other prompt optimizers score a prompt somewhere else. They never see
        the Playbook or the code on this computer, so the score is not about
        this project. {AGENT_WITCH_PRODUCT_NAME} runs the judge and the improver
        in the folder you choose. They can read the harness and the code there,
        so the score belongs to that context. Open the prompt optimizer in the
        console. That page tells you to run it in AgentWitch Local.
      </p>
      <p className="mt-4 flex flex-wrap gap-4">
        <Link
          href="/prompt-optimizer"
          className="text-sm font-medium text-awc-fg underline dark:text-white"
        >
          Open the prompt optimizer
        </Link>
        <Link
          href="/showcases/prompt-optimizer-in-the-project"
          className="text-sm font-medium text-awc-fg underline dark:text-white"
        >
          Why this score is reliable
        </Link>
        <Link
          href="/download"
          className="text-sm font-medium text-awc-fg underline dark:text-white"
        >
          Download AgentWitch Local
        </Link>
      </p>
      {showComposeForm ? (
        <HomePromptOptimizerComposeCard storybookPreview={storybookPreview} />
      ) : null}
    </section>
  );
}
