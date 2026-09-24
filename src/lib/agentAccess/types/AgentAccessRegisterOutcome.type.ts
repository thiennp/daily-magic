import type { AgentAccessRegisterBody } from "@/lib/agentAccess/parseAgentAccessRegisterBody";

export interface AgentAccessRegisterSuccess {
  readonly ok: true;
  readonly token: string;
  readonly tokenType: "Bearer";
  readonly account: {
    readonly id: string;
    readonly email: string;
    readonly displayName: string | null;
    readonly registrationMethod: AgentAccessRegisterBody["method"];
  };
  readonly registerUrl: string;
  readonly mcpUrl: string;
  readonly invokeUrl: string;
  readonly discoveryUrl: string;
  readonly prompt: string;
}

export interface AgentAccessRegisterFailure {
  readonly ok: false;
  readonly status: number;
  readonly error: string;
  readonly code: string;
}

export type AgentAccessRegisterOutcome =
  | {
      readonly ok: true;
      readonly status: 201;
      readonly body: AgentAccessRegisterSuccess;
    }
  | AgentAccessRegisterFailure;
