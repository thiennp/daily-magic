import Link from "next/link";
import type { ReactElement } from "react";

import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export default function HomePromptSdlcSection(): ReactElement {
  return (
    <section
      id="prompt-sdlc"
      aria-labelledby="prompt-sdlc-heading"
      className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.02] sm:p-8"
    >
      <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
        Prompt optimizer
      </p>
      <h2
        id="prompt-sdlc-heading"
        className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        The prompt optimizer runs inside the project on your Mac.
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
        Other prompt optimizers score a prompt somewhere else. They never see
        the Playbook or the code on this Mac, so the score is not about this
        project. {AGENT_WITCH_PRODUCT_NAME} runs the judge and the improver in
        the folder you choose. They can read the harness and the code there, so
        the score belongs to that context. Open Prompt optimizer in the console.
        That page tells you to run it in Agent Witch Live.
      </p>
      <p className="mt-4 flex flex-wrap gap-4">
        <Link
          href="/prompt-sdlc"
          className="text-sm font-medium text-gray-900 underline dark:text-white"
        >
          Open the prompt optimizer
        </Link>
        <Link
          href="/showcases/prompt-optimizer-in-the-project"
          className="text-sm font-medium text-gray-900 underline dark:text-white"
        >
          Why this score is reliable
        </Link>
      </p>
    </section>
  );
}
