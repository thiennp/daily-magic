import isNonEmptyString from "./isNonEmptyString";

const isAgentPairPayload = (
  payload: Readonly<Record<string, unknown>> | undefined,
): payload is { readonly pairingToken: string } =>
  payload !== undefined && isNonEmptyString(payload.pairingToken);

export default isAgentPairPayload;
