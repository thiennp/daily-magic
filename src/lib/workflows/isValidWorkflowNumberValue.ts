export const isValidWorkflowNumberValue = (value: string): boolean =>
  /^-?\d+(\.\d+)?$/.test(value) && Number.isFinite(Number(value));
