import { useState } from "react";

export interface LoginTermsGate {
  readonly agreed: boolean;
  readonly onMissing: () => void;
}

/** Own consent state for sign-up unless the parent passes its own gate. */
export default function useLoginTermsGate(
  isSignUp: boolean,
  parentGate?: LoginTermsGate,
) {
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const gate =
    parentGate ??
    (isSignUp
      ? { agreed: termsChecked, onMissing: () => setTermsError(true) }
      : undefined);
  const guard = (action: () => void): void => {
    if (gate && !gate.agreed) {
      gate.onMissing();
      return;
    }
    action();
  };
  const setChecked = (next: boolean): void => {
    setTermsChecked(next);
    setTermsError(false);
  };
  return { termsChecked, termsError, guard, setChecked };
}
