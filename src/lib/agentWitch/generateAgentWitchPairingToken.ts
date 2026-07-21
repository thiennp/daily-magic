import { randomBytes } from "node:crypto";

const PAIRING_TOKEN_PATTERN = /^[a-f0-9]{64}$/i;

export const generateAgentWitchPairingToken = (): string =>
  randomBytes(32).toString("hex");

export const isValidAgentWitchPairingToken = (value: string): boolean =>
  PAIRING_TOKEN_PATTERN.test(value.trim());
