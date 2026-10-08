import {
  AGENT_WITCH_DEVICE_NOT_LINKED_ERROR_CODE,
  AGENT_WITCH_UNKNOWN_IDENTITY_ERROR_CODE,
} from "@agent-witch/shared/protocol";

export type AgentRegisterIdentityRejection =
  | {
      readonly errorCode: typeof AGENT_WITCH_UNKNOWN_IDENTITY_ERROR_CODE;
      readonly errorMessage: string;
    }
  | {
      readonly errorCode: typeof AGENT_WITCH_DEVICE_NOT_LINKED_ERROR_CODE;
      readonly errorMessage: string;
    };

/** `null` device means the token hash is absent for every user. */
export const resolveAgentRegisterIdentityRejection = (input: {
  readonly device: { readonly revokedAt: string | null } | null;
  readonly userId: string | undefined;
}): AgentRegisterIdentityRejection | null => {
  if (input.device === null) {
    return {
      errorCode: AGENT_WITCH_UNKNOWN_IDENTITY_ERROR_CODE,
      errorMessage: "AgentWitch does not know this computer identity.",
    };
  }

  if (input.device.revokedAt !== null || input.userId === undefined) {
    return {
      errorCode: AGENT_WITCH_DEVICE_NOT_LINKED_ERROR_CODE,
      errorMessage:
        "This computer identity is not linked. Run the install command from Home while signed in.",
    };
  }

  return null;
};
