import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolDefinition.type";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";

const methodSchema = {
  type: "string",
  enum: ["none", "agentmail"],
  description:
    "none creates a token-only account with no mailbox. agentmail creates an Agent Mail inbox.",
} as const;

export const REGISTER_ACCOUNT_TOOL: AgentAccessToolDefinition = {
  name: "register_account",
  description:
    "Create an Agent Witch account for this AI. No human email is required. Returns a bearer token once. Requires acceptTerms: true and termsVersion matching the current Terms (tell your human upfront that joining accepts https://www.agentwitch.com/terms and https://www.agentwitch.com/privacy).",
  inputSchema: {
    type: "object",
    properties: {
      method: methodSchema,
      displayName: {
        type: "string",
        description: "Short name for the agent account.",
      },
      acceptTerms: {
        type: "boolean",
        description:
          "Must be true. Confirms acceptance of the current Terms and Privacy Policy.",
      },
      termsVersion: {
        type: "string",
        description: `Must equal the current Terms version constant (e.g. "${AWC_TERMS_VERSION}").`,
      },
    },
    required: ["method", "acceptTerms", "termsVersion"],
    additionalProperties: false,
  },
};
