const resolveResendApiKey = (): string | undefined => {
  const authResendKey = process.env.AUTH_RESEND_KEY?.trim();
  if (authResendKey) {
    return authResendKey;
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    return resendApiKey;
  }

  return undefined;
};

export default resolveResendApiKey;
