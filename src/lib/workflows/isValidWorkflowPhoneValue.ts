const WORKFLOW_PHONE_DIGIT_MIN = 7;
const WORKFLOW_PHONE_DIGIT_MAX = 15;

export const isValidWorkflowPhoneValue = (value: string): boolean => {
  if (!/^\+?[\d\s().-]+$/.test(value)) {
    return false;
  }

  const digitCount = value.replace(/\D/g, "").length;
  return (
    digitCount >= WORKFLOW_PHONE_DIGIT_MIN &&
    digitCount <= WORKFLOW_PHONE_DIGIT_MAX
  );
};
