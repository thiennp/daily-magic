/**
 * E2E/local-only override so joins can auto-approve without owner UI.
 * Hard-ignored whenever NODE_ENV is production (Railway/Vercel deploys).
 */
export const isAwcTestAutoApproveJoinsEnabled = (): boolean => {
  if (process.env.NODE_ENV === "production") {
    return false;
  }
  return process.env.AWC_TEST_AUTO_APPROVE_JOINS === "1";
};
