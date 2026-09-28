import type { Metadata } from "next";

import ShowcasesIndexPageLayout from "@/features/showcases/ShowcasesIndexPageLayout";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const metadata: Metadata = {
  title: `Real examples | ${AGENT_WITCH_PRODUCT_NAME}`,
  description:
    "See how teams go from ChatGPT tabs to saved playbooks, Mac agents, and job history. Plain-language guides with honest setup notes.",
  openGraph: {
    title: `Real examples | ${AGENT_WITCH_PRODUCT_NAME}`,
    description:
      "Short stories for people who love AI but are not sure where to start with agents.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Real examples | ${AGENT_WITCH_PRODUCT_NAME}`,
    description:
      "Short stories for people who love AI but are not sure where to start with agents.",
  },
};

export default function ShowcasesPage() {
  return <ShowcasesIndexPageLayout />;
}
