interface SecretLoginParams {
  readonly email: string;
  readonly secret: string;
}

interface SecretLoginResult {
  readonly ok: boolean;
  readonly error?: string;
}

const readSecretLoginError = async (
  response: Response,
): Promise<string | undefined> => {
  try {
    const body = (await response.json()) as { error?: unknown };

    if (typeof body.error === "string" && body.error.trim().length > 0) {
      return body.error;
    }
  } catch {
    return undefined;
  }

  return undefined;
};

const secretLogin = async ({
  email,
  secret,
}: SecretLoginParams): Promise<SecretLoginResult> => {
  const response = await fetch("/api/auth/secret-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, secret }),
  });

  if (response.ok) {
    return { ok: true };
  }

  const error = await readSecretLoginError(response);

  return { ok: false, error };
};

export default secretLogin;
