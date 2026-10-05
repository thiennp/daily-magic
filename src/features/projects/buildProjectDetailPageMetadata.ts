import type { Metadata } from "next";

import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

/** Browser tab title for /projects/<id> (owner-scoped name only). */
const buildProjectDetailPageMetadata = (projectName: string): Metadata => {
  const name = projectName.trim() || "Project";
  return {
    title: `${name} · Projects · ${AGENT_WITCH_PRODUCT_NAME}`,
  };
};

export default buildProjectDetailPageMetadata;
