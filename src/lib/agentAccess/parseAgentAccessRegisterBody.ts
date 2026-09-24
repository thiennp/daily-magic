import { isNonEmptyString, isType, isUndefinedOr } from "guardz";

import {
  AGENT_ACCESS_DISPLAY_NAME_MAX_LENGTH,
  AGENT_ACCESS_REGISTRATION_METHODS,
  type AgentAccessRegistrationMethod,
} from "@/lib/agentAccess/agentAccess.constant";

export interface AgentAccessRegisterBody {
  readonly method: AgentAccessRegistrationMethod;
  readonly displayName: string | null;
}

const isRegisterShape = isType<{
  readonly method: string;
  readonly displayName?: string;
}>({
  method: isNonEmptyString,
  displayName: isUndefinedOr(isNonEmptyString),
});

const isRegistrationMethod = (
  value: string,
): value is AgentAccessRegistrationMethod =>
  AGENT_ACCESS_REGISTRATION_METHODS.some((method) => method === value);

export const parseAgentAccessRegisterBody = (
  value: unknown,
): AgentAccessRegisterBody | null => {
  if (!isRegisterShape(value) || !isRegistrationMethod(value.method)) {
    return null;
  }

  const displayName = value.displayName?.trim() ?? "";

  if (displayName.length > AGENT_ACCESS_DISPLAY_NAME_MAX_LENGTH) {
    return null;
  }

  return {
    method: value.method,
    displayName: displayName.length > 0 ? displayName : null,
  };
};
