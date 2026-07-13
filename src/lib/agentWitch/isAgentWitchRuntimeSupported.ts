export const isAgentWitchRuntimeSupported = (): boolean => {
  if (process.env.VERCEL === "1") {
    return false;
  }

  return true;
};
