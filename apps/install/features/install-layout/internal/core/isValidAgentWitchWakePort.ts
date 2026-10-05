/** True for an integer TCP port in 1..65535 (wake-port.json / env / plist contract). */
export const isValidAgentWitchWakePort = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value > 0 &&
  value <= 65535;
