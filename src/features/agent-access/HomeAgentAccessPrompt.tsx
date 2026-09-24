import type { ReactElement } from "react";

import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { buildAgentAccessPrompt } from "@/lib/agentAccess/buildAgentAccessPrompt";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";

export default function HomeAgentAccessPrompt(): ReactElement {
  const origin = resolveAppBaseUrl();
  const prompt = buildAgentAccessPrompt(origin);
  const urls = buildAgentAccessUrls(origin);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Give an AI an ${AGENT_WITCH_PRODUCT_NAME} account`,
    description:
      "Copy a short prompt. The AI opens the agent guideline, registers with no human email, and follows the steps on that page.",
    step: [
      {
        "@type": "HowToStep",
        name: "Copy the prompt",
        text: "Paste the short prompt into your AI.",
      },
      {
        "@type": "HowToStep",
        name: "Open the guideline",
        text: `The AI opens ${urls.guidelineUrl} and follows every step.`,
      },
    ],
  };

  return (
    <section
      id="for-your-ai"
      aria-labelledby="for-your-ai-heading"
      className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.02] sm:p-8"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
        For your AI
      </p>
      <h2
        id="for-your-ai-heading"
        className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        Give your AI an account. No email required.
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
        {AGENT_WITCH_PRODUCT_NAME} lets an AI register itself, pair a Mac,
        create a workflow, and write the Playbook. Copy the short prompt. The
        agent opens the{" "}
        <a className="underline" href={urls.guidelineUrl}>
          agent guideline
        </a>{" "}
        and follows it. Plain text for Grokbot is at{" "}
        <a className="underline" href={`${urls.origin}/llms.txt`}>
          llms.txt
        </a>
        .
      </p>
      <pre className="mt-5 overflow-auto rounded-xl bg-gray-950 p-4 text-left text-sm leading-relaxed text-gray-100">
        {prompt}
      </pre>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{
          __html:
            "<button type=\"button\" class=\"rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900\" onclick=\"var button=this;var prompt=button.closest('section').querySelector('pre').innerText;navigator.clipboard.writeText(prompt).then(function(){button.textContent='Copied'}).catch(function(){button.textContent='Select the prompt above'})\">Copy prompt</button>",
        }}
      />
    </section>
  );
}
