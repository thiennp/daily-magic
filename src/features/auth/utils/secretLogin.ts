interface SecretLoginParams {
  readonly email: string;
  readonly secret: string;
}

interface SecretLoginResult {
  readonly ok: boolean;
}

const secretLogin = async ({
  email,
  secret,
}: SecretLoginParams): Promise<SecretLoginResult> => {
  const response = await fetch("/api/auth/secret-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, secret }),
  });

  return { ok: response.ok };
};

export default secretLogin;
