const SESSION_KEY = "agent_witch_wake_identity_probe_suppressed";

export const isAgentWitchWakeIdentityProbeSuppressed = (): boolean => {
  if (typeof sessionStorage === "undefined") {
    return false;
  }

  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
};

export const suppressAgentWitchWakeIdentityProbe = (): void => {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Ignore private mode / blocked storage.
  }
};

export const clearAgentWitchWakeIdentityProbeSuppression = (): void => {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore private mode / blocked storage.
  }
};
