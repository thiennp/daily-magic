const TEST_AGENT_WITCH_EMAIL_PATTERN = /^test[^@]*@agentwitch\.com$/i;

const isTestAgentWitchEmail = (email: string): boolean =>
  TEST_AGENT_WITCH_EMAIL_PATTERN.test(email.trim());

export default isTestAgentWitchEmail;
