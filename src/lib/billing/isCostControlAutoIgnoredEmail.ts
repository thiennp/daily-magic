import { AGENT_ACCESS_EMAIL_DOMAIN } from "@/lib/agentAccess/agentAccess.constant";

const TEST_EMAIL_PATTERN = /^test[^@]*@agentwitch\.com$/i;

/** Bot and test accounts are always left out of cost control (mirrors the snapshot SQL). */
export const isCostControlAutoIgnoredEmail = (email: string): boolean =>
  email.toLowerCase().endsWith(`@${AGENT_ACCESS_EMAIL_DOMAIN}`) ||
  TEST_EMAIL_PATTERN.test(email);
