export const CapabilityType = {
  AGENT: "agent",
  WORKFLOW: "workflow",
} as const;

export type CapabilityTypeValue =
  (typeof CapabilityType)[keyof typeof CapabilityType];

export const isCapabilityType = (value: string): value is CapabilityTypeValue =>
  value === CapabilityType.AGENT || value === CapabilityType.WORKFLOW;
