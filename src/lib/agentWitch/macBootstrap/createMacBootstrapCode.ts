import { randomBytes } from "node:crypto";

import { MAC_BOOTSTRAP_CODE_BYTES } from "@/lib/agentWitch/macBootstrap/macBootstrap.constants";

/** Opaque one-time code for the custom-scheme redirect (never logged). */
export const createMacBootstrapCode = (): string =>
  randomBytes(MAC_BOOTSTRAP_CODE_BYTES).toString("base64url");
