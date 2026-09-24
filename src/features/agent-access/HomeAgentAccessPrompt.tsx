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
    name: `Let an AI use ${AGENT_WITCH_PRODUCT_NAME}`,
    description:
      "Copy a prompt so an AI can register without a human email, or with Agent Mail, then send Tasks to a paired Mac and read Runs.",
    step: [
      {
        "@type": "HowToStep",
        name: "Copy the prompt",
        text: "Paste the prompt into your AI.",
      },
      {
        "@type": "HowToStep",
        name: "The AI registers",
        text: 'The AI calls the register API with method "none" or "agentmail".',
      },
      {
        "@type": "HowToStep",
        name: "The AI sends a Task",
        text: "After a Mac is paired, the AI sends a Task and reads the Run.",
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
        Copy this prompt into ChatGPT, Claude, or Cursor. The AI registers
        itself with method none (no mailbox) or Agent Mail, then sends Tasks to
        a paired Mac and reads Runs. Discovery lives at{" "}
        <a className="underline" href={urls.discoveryUrl}>
          webmcp.json
        </a>
        .
      </p>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">
        Dán prompt này vào AI của bạn. AI tự tạo tài khoản không cần email, hoặc
        dùng Agent Mail, rồi dùng các tính năng Agent Witch.
      </p>
      <pre className="mt-5 max-h-80 overflow-auto rounded-xl bg-gray-950 p-4 text-left text-xs leading-relaxed text-gray-100">
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
